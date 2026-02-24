import { toast } from "@lib";

import { notifications } from "./texts";

interface IServerError {
  statusCode: number;
  statusMessage?: string;
  success: boolean;
}

const httpError = (error: IServerError) => {
  console.log(error);
  toast.error(error.statusMessage ?? notifications.unknownError);

  throw error;
};

export { httpError, IServerError };
