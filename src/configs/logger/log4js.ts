import { LOG_LEVEL } from "../../constant";

const currentDate = new Date();

export default {
  appenders: {
    console: {
      type: "console",
    },
    file: {
      type: "dateFile",
      filename: `log/error.log`,
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: process.env.CONSOLE_LOG_LEVEL || LOG_LEVEL.all,
    },
    file: {
      appenders: ["file"],
      level: process.env.FILE_LOG_LEVEL || LOG_LEVEL.trace,
    },
  },
};
