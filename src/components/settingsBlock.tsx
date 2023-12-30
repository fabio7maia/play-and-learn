import React from "react";
import {
  AGE_VALUES,
  LANGUAGE_VALUES,
  LEVEL_VALUES,
  THEME_VALUES,
} from "../constants/storage";
import { storage } from "../lib/storage";

export const SettingsBlock: React.FC = () => {
  const { settings } = storage.get();
  const [formData, setFormData] = React.useState(settings);
  const formRef = React.useRef<HTMLFormElement>();

  const onChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onClickSave = () => {
    storage.set({ settings: formData });

    formRef.current?.submit();
  };

  // console.log("SettingsBlock", { settings, formData });

  return (
    <form ref={formRef as any} action="/api/cookies" method="POST">
      <div className="card justify-center items-center bg-neutral-content p-8 text-white">
        <div className="card-title">
          <h1 className="mb-8 text-4xl font-bold">Settings</h1>
        </div>
        <div className="mb-4 w-full flex flex-col items-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">What is your age?</span>
            </div>
            <select
              name="age"
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

          <label className="form-control w-full max-w-xs mt-4">
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

          <label className="form-control w-full max-w-xs mt-4">
            <div className="label">
              <span className="label-text text-white">
                What is your prefered theme?
              </span>
            </div>
            <select
              name="theme"
              className="select select-bordered"
              onChange={onChangeSelect}
              value={formData.theme}
            >
              {THEME_VALUES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs mt-4">
            <div className="label">
              <span className="label-text text-white">
                What is your prefered language?
              </span>
            </div>
            <select
              name="language"
              className="select select-bordered"
              onChange={onChangeSelect}
              value={formData.language}
            >
              {LANGUAGE_VALUES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-4">
            <a href="/category" className="link link-neutral">
              Change category
            </a>
          </div>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn btn-primary btn-lg mt-8"
            onClick={onClickSave}
          >
            <span className="text-primary-content">Save</span>
          </button>
        </div>
      </div>
    </form>
  );
};
