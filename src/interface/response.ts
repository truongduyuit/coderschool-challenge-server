import { ErrorCode, HTTP_CODE } from "../constant";

export interface IError {
  code: ErrorCode;
  message?: string;
  status?: HTTP_CODE;
}

export interface IData {
  data: any;
  status?: HTTP_CODE;
}
