import React from "react";
import {
  AGE_VALUES,
  LANGUAGE_VALUES,
  LEVEL_VALUES,
  THEME_VALUES,
  storage,
} from "../lib/storage";

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

    const body = new FormData();
    body.append("age", formData.age);
    body.append("level", formData.level);
    body.append("theme", formData.theme);

    // fetch("/api/cookies", {
    //   method: "POST",
    //   body,
    // }).then((res) => {
    //   window.location.href = window.location.origin;
    // });
  };

  return (
    <form ref={formRef as any} action="/api/cookies" method="POST">
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

          <label className="form-control w-full max-w-xs">
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

          <label className="form-control w-full max-w-xs">
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
        </div>

        <div className="card-actions">
          <button className="btn btn-primary" onClick={onClickSave}>
            <span className="text-primary-content">Save</span>
          </button>
        </div>
      </div>
    </form>
  );
};
