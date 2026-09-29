export interface ServerValidationErrorDetail {
  field: string;
  message: string;
}

export interface ServerValidationResponseError {
  errorMessage: string;
  details: ServerValidationErrorDetail[];
}

export interface ServerValidationDublicateError {
  statusCode: number;
  message: string;
}

export type ServerErrorData = ServerValidationResponseError & ServerValidationDublicateError;
