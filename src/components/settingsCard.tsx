import React from "react";
import { AGE_VALUES, LEVEL_VALUES, storage } from "../lib";

export const SettingsCard: React.FC = () => {
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
    <div className="card min-w-80 w-auto bg-neutral-content p-8 text-white">
      <div className="card-title">
        <h1 className="mb-4 text-4xl font-bold">Settings</h1>
      </div>
      <div className="mb-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">What is your age?</span>
          </div>
          <select
            className="select select-bordered"
            onChange={onChangeSelect}
            value={formData.age}
          >
            {AGE_VALUES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">What is your level?</span>
          </div>
          <select
            name="level"
            className="select select-bordered"
            onChange={onChangeSelect}
            value={formData.level}
          >
            {LEVEL_VALUES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={onClickSave}>
          <span className="text-primary-content">Save</span>
        </button>
      </div>
    </div>
  );
};
