export function Injectable(target: any) {
  target.injectedServices = target.injectedServices || [];
}

export function useMock(useMock: boolean) {
  return function (target: any) {
    target.prototype.useMock = useMock;
  };
}

export function injectModel(key: string, model: any) {
  return function (target: any) {
    target.prototype.userService = model as typeof model;
  };
}
