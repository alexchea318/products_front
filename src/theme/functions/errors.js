import {toastError, toastInfo, toastSuccess} from "layout/toasts/toastFunctions.js";

export const logError = (userText, serverError) => {
    toastError(userText)
    //toast.error(`${userText}`);
    console.error(serverError);
}

export const logInfo = (userText) => {
    //toast.info(`${userText}`);
    toastInfo(userText)
    console.info(userText);
}

export const logSuccess = (userText) => {
    toastSuccess(userText)
    //toast.success(`${userText}`);
}
