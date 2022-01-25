export interface ILoginResult {
    loginSuccessful: boolean;
    error?: IErrors;
}

interface IErrors {
    errorCode: string;
    errorType: string;
    message: string;
}