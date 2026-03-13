import { Toast } from "primereact/toast";

import { notifications } from "./texts";

let toastRef: Toast | null = null;

const setToastRef = (ref: Toast | null) => {
  toastRef = ref;
};

const toast = {
  success: (detail: string, summary = notifications.success) => {
    toastRef?.show({ severity: "success", summary, detail, life: 3000 });
  },

  error: (detail: string, summary = notifications.error) => {
    toastRef?.show({ severity: "error", summary, detail, life: 4000 });
  },
};

export { setToastRef, toast };
