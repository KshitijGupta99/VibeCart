const winston = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");

const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const ENV_CONFIGS = require("../configs/env.config");

// const logtail = new Logtail(ENV_CONFIGS.LOG_TAIL_TOKEN);

const { createLogger, format, transports } = winston;
const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
  json,
  prettyPrint,
  errors,
  align,
} = format;

const commonFormat = combine(
  errors({ stack: true }),
  json(),
  prettyPrint(),
  label({
    label: "backend",
  }),
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
    utc: true,
    timezone: "Europe/London",
  }),
  colorize({
    all: true,
    colors: {
      error: "red",
      warn: "yellow",
      info: "green",
      debug: "blue",
    },
  }),
  printf(({ level, message, label, timestamp, meta, stack }) => {
    const formattedMeta = meta ? ` ${JSON.stringify(meta)}` : "";
    const logMessage = `${timestamp} [${label}] ${level}: ${message}${formattedMeta}`;
    if (stack) {
      const stackInfo =
        stack instanceof Error ? stack.stack : new Error(stack).stack;
      return `${logMessage}\n${stackInfo}`;
    } else {
      return logMessage;
    }
  }),
);

const commonFileFormat = combine(
  errors({ stack: true }),
  json(),
  prettyPrint(),
  label({
    label: "backend",
  }),
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
    utc: true,
    timezone: "Europe/London",
  }),
  colorize({
    all: true,
    colors: {
      error: "red",
      warn: "yellow",
      info: "green",
      debug: "blue",
    },
  }),
);

class Logger {
  constructor() {
    this.logger = createLogger({
      level: "info",
      format: commonFormat,
      transports: [
        new transports.Console(),
        // new LogtailTransport(logtail, {
        //   level: 'info',
        //   format: commonFileFormat,
        // }),
      ],
    });
  }

  log(level, message, meta) {
    this.logger.log(level, message, meta);
  }

  error(message, meta) {
    this.log("error", message, meta);
  }

  warn(message, meta) {
    this.log("warn", message, meta);
  }

  info(message, meta) {
    this.log("info", message, meta);
  }

  debug(message, meta) {
    this.log("debug", message, meta);
  }
}

module.exports = new Logger();
