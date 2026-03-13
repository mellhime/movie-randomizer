import { FC, FormEventHandler, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { signin, signup, texts, toast } from "@lib";

interface IProps {
  onClose: () => void;
}

const SignForm: FC<IProps> = ({ onClose: handleClose }) => {
  const [kind, setKind] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const action = kind === "signin" ? signin : signup;
    action(form.email, form.password).then(() => {
      toast.success("signed on");
      handleClose();
    });
  };

  return (
    <form
      className="flex flex-column align-items-center justify-content-center gap-2"
      onSubmit={handleSubmit}
    >
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
          type="submit"
          label={texts.buttons.submit}
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
  );
};

export { SignForm };
