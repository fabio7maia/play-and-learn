import React from "react";
import { AGE_VALUES, LEVEL_VALUES, storage } from "../lib/storage";

export const GameBlock: React.FC = () => {
  const { settings } = storage.get();
  const [formData, setFormData] = React.useState(settings);

  const onChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onClickSave = () => {
    console.log("SettingsCard", { formData });
    storage.set({ settings: formData });
  };

  return (
    <div className="flex-col">
      <div className="card min-w-80 w-auto bg-neutral-content p-8 text-white">
        <span className="font-bold">Pergunta</span>
      </div>
      <div className="mb-8" />
      <div className="card min-w-80 w-auto bg-neutral-content p-8 text-white">
        <div className="grid grid-rows-2 grid-flow-col gap-4">
          <div>
            <button className="btn">resposta 1</button>
          </div>
          <div>
            <button className="btn">resposta 2</button>
          </div>
          <div>
            <button className="btn">resposta 3</button>
          </div>
          <div>
            <button className="btn">resposta 4</button>
          </div>
        </div>
      </div>
    </div>
  );
};
