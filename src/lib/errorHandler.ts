import { toast } from "react-toastify";

import { app } from "./texts";

interface IServerError {
  statusCode: number;
  statusMessage?: string;
  success: boolean;
}

const httpError = (error: IServerError) => {
  if (error.statusMessage) {
    toast(error.statusMessage);
  } else {
    toast(app.errors.unknownError);
    throw error;
  }
};

export { httpError, IServerError };
