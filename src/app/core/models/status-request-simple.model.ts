export interface IStatusRequestSimple {
  error: boolean;
  message: string;
}

export interface IStatusResponseFile extends IStatusRequestSimple {
  filename: string;
}
