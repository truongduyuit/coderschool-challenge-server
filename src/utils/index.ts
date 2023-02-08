export * from "./mongoBaseService";
export * from "./jwt";
export * from "./decorator";
export * from "./password";

export const mapArrayToObjectWithKey = (arr: any[], key: string) =>
  arr.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
