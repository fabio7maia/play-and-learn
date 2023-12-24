import {
  ClockIcon,
  GiftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { storage, type TAgeValues } from "../lib/storage";

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
  numberOfCorrect: number;
  numberOfIncorrect: number;
  lastAnswerStatus: "none" | "correct" | "incorrect";
};

const TIMER_VALUES: Record<TAgeValues, number> = {
  "< 6": 60,
  "6 a 9": 45,
  "10 a 13": 30,
  "15 a 20": 20,
  "> 20": 15,
};

export const GameBlock: React.FC = () => {
  const { settings } = storage.get();
  const intervalId = React.useRef<number>();
  const timerValue = TIMER_VALUES[settings.age];
  const gameState = React.useRef<GameState>({
    questionIndex: 0,
    points: 0,
    timer: timerValue,
    status: "loading",
    questions: [],
    numberOfCorrect: 0,
    numberOfIncorrect: 0,
    lastAnswerStatus: "none",
  });
  const [_, setTick] = React.useState(0);

  const initializeGame = () => {
    const body = new FormData();
    body.append("age", settings.age);
    body.append("level", settings.level);
    body.append("language", settings.language);

    gameState.current.points = 0;
    gameState.current.questionIndex = 0;
    gameState.current.questions = [];
    gameState.current.status = "loading";
    gameState.current.timer = timerValue;
    gameState.current.lastAnswerStatus = "none";
    gameState.current.numberOfCorrect = 0;
    gameState.current.numberOfIncorrect = 0;
    update();

    fetch("/api/questions", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          // gameState.current.questions = [
          //   {
          //     answer: "1",
          //     choices: ["1", "2", "3", "4"],
          //     question: "Qual?",
          //   },
          // ];
          gameState.current.questions = res.data.questions;
          gameState.current.status = "readyToStart";
        } else {
          gameState.current.status = "error";
        }

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
    gameState.current.timer = timerValue;
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
      gameState.current.numberOfCorrect++;
      gameState.current.lastAnswerStatus = "correct";
    } else {
      gameState.current.numberOfIncorrect++;
      gameState.current.lastAnswerStatus = "incorrect";
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

    gameState.current.numberOfIncorrect++;
    gameState.current.lastAnswerStatus = "incorrect";
    update();
  };

  const onClickRetry = () => {
    initializeGame();
  };

  const startGame = () => {
    gameState.current.status = "inProgress";

    update();
  };

  const {
    points,
    questionIndex,
    questions,
    status,
    timer,
    numberOfCorrect,
    numberOfIncorrect,
  } = gameState.current;

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

  const lastAnswerStatus = gameState.current.lastAnswerStatus;

  React.useEffect(() => {
    setTimeout(() => {
      gameState.current.lastAnswerStatus = "none";

      update();
    }, 500);
  }, [lastAnswerStatus]);

  // console.log("GameBlock", { gameState });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="fixed z-50 animate-ping"
        style={{
          top: "50vh",
          left: "50vw",
          display:
            gameState.current.lastAnswerStatus === "incorrect"
              ? "block"
              : "none",
        }}
      >
        <HandThumbDownIcon height={100} color="red" />
      </div>
      <div
        className="fixed z-50 animate-ping"
        style={{
          top: "50vh",
          left: "50vw",
          display:
            gameState.current.lastAnswerStatus === "correct" ? "block" : "none",
        }}
      >
        <HandThumbUpIcon height={100} color="green" />
      </div>
      {status === "error" ? (
        <button className="btn btn-warning btn-lg" onClick={onClickRetry}>
          <span className="text-lg">
            Não foi possível iniciar o jogo!
            <br /> Tente novamente
          </span>
        </button>
      ) : (
        <div className="flex-col w-full">
          {gameState.current.status === "loading" && (
            <>
              <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Por favor aguarde enquanto o jogo é criado 😋</span>
              </div>

              <div className="mb-8" />
            </>
          )}

          <div className="card w-full bg-neutral-content p-4 text-white flex flex-row justify-between items-center">
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

          <div className="card min-h-72 bg-info p-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-4xl">
                  {gameState.current.status === "loading"
                    ? 0
                    : questionIndex + 1}
                  /{questions.length}
                </span>
              </div>

              <div>
                <span className="font-bold text-4xl text-green-600">
                  👍 {numberOfCorrect}
                </span>
                <span className="font-bold text-4xl text-red-600 ml-2">
                  👎 {numberOfIncorrect}
                </span>
              </div>
            </div>

            {status === "loading" ? (
              <div className="skeleton mt-8 bg-gray-300 w-84 h-40"></div>
            ) : ["readyToStart", "ended"].includes(status) ? (
              <span className="mt-4 font-bold text-4xl">
                {messageForQuestionBlock}
              </span>
            ) : (
              <span className="mt-4 font-bold text-2xl">
                {question?.question}
              </span>
            )}
          </div>

          <div className="mb-8" />

          <div className="card bg-neutral-content p-8 text-white">
            <div
              className={`grid grid-rows-2 grid-flow-col gap-4 z-20 ${
                timer === 0 ? "opacity-50" : undefined
              }`}
            >
              {status === "loading" ? (
                [0, 1, 2, 3].map((x) => (
                  <div
                    key={x}
                    className="skeleton bg-gray-300 w-full h-24"
                  ></div>
                ))
              ) : ["readyToStart", "ended"].includes(status) ? (
                [0, 1, 2, 3].map((x) => (
                  <div key={x}>
                    <button
                      className="btn btn-accent w-full h-24"
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
                        className="btn btn-accent w-full min-h-24"
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
              <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
    </div>
  );
};
