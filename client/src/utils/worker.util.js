// Implementation from https://stackoverflow.com/a/47509889/5572258
export const toWorkerScript = workerCode => {
    let code = workerCode.toString();
    code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
    const blob = new Blob([code], { type: "application/javascript" });
    const workerScript = URL.createObjectURL(blob);
    return workerScript;
};
