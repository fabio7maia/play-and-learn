import {
  ClockIcon,
  GiftIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { storage } from "../lib/storage";

type GameState = {
  questionIndex: number;
  points: number;
  timer: number;
  status:
    | "none"
    | "loading"
    | "readyToStart"
    | "inProgress"
    | "ended"
    | "error";
  questions: { question: string; answer: string; choices: string[] }[];
};

export const GameBlock: React.FC = () => {
  const { settings } = storage.get();
  const intervalId = React.useRef<number>();
  const gameState = React.useRef<GameState>({
    questionIndex: 0,
    points: 0,
    timer: 10,
    status: "loading",
    questions: [],
  });
  const [_, setTick] = React.useState(0);

  const initializeGame = () => {
    const body = new FormData();
    body.append("age", settings.age);
    body.append("level", settings.level);
    body.append("theme", settings.theme);

    gameState.current.points = 0;
    gameState.current.questionIndex = 0;
    gameState.current.questions = [];
    gameState.current.status = "loading";
    gameState.current.timer = 10;
    update();

    fetch("/api/questions", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        gameState.current.questions = [
          {
            answer: "1",
            choices: ["1", "2", "3", "4"],
            question: "Qual?",
          },
        ];
        gameState.current.status = "readyToStart";

        update();
      })
      .catch((err) => {
        gameState.current.status = "error";

        update();
      });
  };

  React.useEffect(() => {
    initializeGame();

    intervalId.current && clearInterval(intervalId.current);

    setInterval(treatTimer, 1000);

    return () => {
      intervalId.current && clearInterval(intervalId.current);
    };
  }, []);

  const update = () => {
    setTick((v) => v + 1);
  };

  const treatTimer = () => {
    if (gameState.current.status !== "inProgress") {
      return;
    }

    if (gameState.current.timer > 0) {
      gameState.current.timer--;
      update();
    }
  };

  const resetTimer = () => {
    gameState.current.timer = 10;
  };

  const onClickChoice = (choice: string) => {
    if (gameState.current.timer === 0) {
      return;
    }

    const question =
      gameState.current.questions?.[gameState.current.questionIndex];

    if (
      gameState.current.questionIndex <
      gameState.current.questions.length - 1
    ) {
      gameState.current.questionIndex++;
    } else {
      gameState.current.status = "ended";
    }

    if (choice === question.answer) {
      gameState.current.points += gameState.current.timer;
    }

    resetTimer();

    update();
  };

  const onClickNext = () => {
    if (
      gameState.current.questionIndex <
      gameState.current.questions.length - 1
    ) {
      gameState.current.questionIndex++;
      resetTimer();
    } else {
      gameState.current.status = "ended";
    }

    update();
  };

  const onClickRetry = () => {
    initializeGame();
  };

  const startGame = () => {
    gameState.current.status = "inProgress";

    update();
  };

  const { points, questionIndex, questions, status, timer } = gameState.current;

  let messageForQuestionBlock = (
    <>
      Quando estiver pronto para começar clique em qualquer um dos botões abaixo
      👇
    </>
  );

  let messageForChoiceButton = <>Iniciar jogo</>;

  let handlerForChoiceButtonClick = startGame;

  if (status === "ended") {
    messageForQuestionBlock = (
      <>
        O jogo anterior terminou 😁 <br />
        Se quiser começar um novo jogo clique em qualquer um dos botões abaixo
        👇
      </>
    );

    messageForChoiceButton = <>Começar um novo jogo</>;

    handlerForChoiceButtonClick = initializeGame;
  }

  const question = questions?.[questionIndex];

  console.log("GameBlock", { gameState });

  return (
    <>
      {status === "error" ? (
        <button className="btn btn-warning btn-lg" onClick={onClickRetry}>
          <span className="text-lg">
            Não foi possível iniciar o jogo!
            <br /> Tente novamente
          </span>
        </button>
      ) : (
        <div className="flex-col">
          <div className="card w-auto bg-neutral-content p-4 text-white flex flex-row justify-between items-center">
            <div className="flex items-center">
              <GiftIcon height={32} className="mr-4" />

              <span className="font-bold text-4xl">{points}</span>
            </div>

            <div className="flex items-center">
              <span className="font-bold text-4xl mr-4">{timer}</span>

              <ClockIcon height={32} />
            </div>
          </div>

          <div className="mb-8" />

          <div className="card min-w-150 w-auto bg-info p-8 text-white">
            <QuestionMarkCircleIcon height={32} />

            {status === "loading" ? (
              <div className="skeleton mt-8 bg-gray-300 w-84 h-24"></div>
            ) : ["readyToStart", "ended"].includes(status) ? (
              <span className="mt-4 font-bold text-4xl">
                {messageForQuestionBlock}
              </span>
            ) : (
              <span className="mt-4 font-bold text-4xl">
                {question?.question}
              </span>
            )}
          </div>

          <div className="mb-8" />

          <div className="card min-w-100 w-auto bg-neutral-content p-8 text-white">
            <div
              className={`grid grid-rows-2 grid-flow-col gap-4 z-10 ${
                timer === 0 ? "opacity-50" : undefined
              }`}
            >
              {status === "loading" ? (
                [0, 1, 2, 3].map((x) => (
                  <div key={x} className="skeleton bg-gray-300 w-48 h-24"></div>
                ))
              ) : ["readyToStart", "ended"].includes(status) ? (
                [0, 1, 2, 3].map((x) => (
                  <div key={x}>
                    <button
                      className="btn btn-accent w-48 h-24"
                      onClick={handlerForChoiceButtonClick}
                    >
                      {messageForChoiceButton}
                    </button>
                  </div>
                ))
              ) : (
                <>
                  {question?.choices.map((choice) => (
                    <div key={choice}>
                      <button
                        className="btn btn-accent w-48 h-24"
                        onClick={() => onClickChoice(choice)}
                        disabled={timer === 0}
                      >
                        {choice}
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {timer === 0 && (
              <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="btn btn-primary w-48 h-24"
                  onClick={onClickNext}
                >
                  Avançar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
