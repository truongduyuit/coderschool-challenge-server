import { LOG_ENVIRONMENTS } from "../../constant";
import log4js from "log4js";
import log4jsConfig from "./log4js";

log4js.configure(log4jsConfig);

export class Logger {
    static getLogger(logEnv: LOG_ENVIRONMENTS = LOG_ENVIRONMENTS.console): log4js.Logger {
        return log4js.getLogger(logEnv);
    }
}
