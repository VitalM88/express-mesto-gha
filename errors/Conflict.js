const { CONFLICT } = require('../utils/errors');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = Conflict;
