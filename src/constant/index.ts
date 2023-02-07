export * from "./httpStatus";
export * from "./logger";
export * from "./voteAction";
export * from "./errorCode";
export * from "./recordStatus";

export const enum RequestType {
  query,
  body,
  params,
  headers,
}

export enum SortType {
  latest,
  oldest,
}
