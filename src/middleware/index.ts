import { Request, Response } from "express";

export const useMorgan = (morgan: any) => {
    morgan.token("reqId", (req: Request, _: Response) => `${req.headers["reqId"]}: `);
    return morgan(":reqId :method :url :status :res[content-length] - :response-time ms");
};

export * from "./reqId";
