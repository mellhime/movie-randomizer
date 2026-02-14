import React, { FC, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { signin, signup, texts } from "@lib";

interface IProps {
  onClose: () => void;
}

const SignFormDialog: FC<IProps> = ({ onClose: handleClose }) => {
  const [kind, setKind] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const action = kind === "signin" ? signin : signup;
    action(form.email, form.password).then(() => handleClose());
  };

  const header = kind === "signin" ? texts.app.signIn : texts.app.signUp;

  return (
    <>
      <div className="backdrop" onClick={handleClose}></div>
      <form className="dialog border-round flex flex-column align-items-center justify-content-center gap-2">
        <h3>{header}</h3>
        <label className="flex flex-column gap-2">
          {texts.app.email}
          <InputText
            name="email"
            value={form.email}
            data-testid="email"
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-column gap-2">
          {texts.app.password}
          <Password
            value={form.password}
            data-testid="password"
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </label>
        <div className="buttons flex m-4 gap-2">
          <Button
            className="p-button-secondary submit-button"
            onClick={handleSubmit}
            label={texts.buttons.submit}
          />
          <Button
            className="p-button-secondary close-button"
            onClick={handleClose}
            label={texts.buttons.close}
          />
        </div>
        <div>
          {kind === "signin" && (
            <Button
              className="p-button-secondary"
              onClick={() => setKind("signup")}
              label={texts.app.signUp}
            />
          )}
        </div>
      </form>
    </>
  );
};

export { SignFormDialog };
