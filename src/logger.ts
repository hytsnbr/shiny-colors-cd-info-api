import * as log from "@std/log";
import { LogRecord } from "@std/log/logger";

// ログフォーマット
const formatter = (logRecord: LogRecord) => {
  const { datetime, levelName, msg } = logRecord;

  // ログレベル表示
  const logLevelText = levelName.padEnd(7);
  // ログ日時
  const d = new Date(datetime.getTime() - datetime.getTimezoneOffset() * 6e4);
  const logTime = d.toISOString().slice(0, -5) +
    d.toString().replace(/^.*GMT([-+]\d{2})(\d{2}).*$/, "$1:$2");

  return `${logTime} ${logLevelText}: ${msg}`;
};

log.setup(
  {
    handlers: {
      // コンソール出力定義
      console: new log.ConsoleHandler("DEBUG", {
        formatter: formatter,
      }),
    },

    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  },
);
const Logger = log.getLogger();

export { Logger };
