import { NextFunction, Request, Response } from "express";
import { v1 as uuidv1 } from 'uuid';

export const injectRequestId = function (req: Request, res: Response, next: NextFunction) {
    req.headers["reqId"] = uuidv1();
    next();
};
