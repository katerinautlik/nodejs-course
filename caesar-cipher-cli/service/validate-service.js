const fs = require('fs');

const CONSTANTS = require('../const/const');
const MESSAGES = require('../const/messages');
const exit = process.exit;

process.on('exit', code => console.log(`${MESSAGES.EXIT} ${code}`));

/**
 * @param {string} message
 * @param {number} code
 */
function throwError(message, code) {
  console.error(message);
  exit(code);
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function isShiftValid(value) {
  return Number.isInteger(parseInt(value, 10));
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function isActionValid(value) {
  return value === CONSTANTS.ENCODE_ACTION || value === CONSTANTS.DECODE_ACTION;
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function isPathValid(value) {
  let flag = true;
  try {
    // eslint-disable-next-line no-sync
    fs.accessSync(value, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

module.exports = {
  /**
   * @param {string} value
   * @returns {number}
   */
  shift: value => {
    if (isShiftValid(value)) {
      return parseInt(value, 10);
    }

    throwError(MESSAGES.SHIFT_ERROR, 1);
  },
  /**
   * @param {string} value
   * @returns {string}
   */
  action: value => {
    if (!value) {
      throwError(MESSAGES.ACTION_ERROR_REQUIRED, 1);
    }

    if (isActionValid(value)) {
      return value;
    }

    throwError(MESSAGES.ACTION_ERROR, 1);
  },
  /**
   * @param {string} value
   * @returns {string}
   */
  input: value => {
    if (isPathValid(value)) {
      return value;
    }

    throwError(MESSAGES.INPUT_ERROR, 1);
  },
  /**
   * @param {string} value
   * @returns {string}
   */
  output: value => {
    if (isPathValid(value)) {
      return value;
    }

    throwError(MESSAGES.OUTPUT_ERROR, 1);
  },
  throwError
};
