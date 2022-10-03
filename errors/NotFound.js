const { NOT_FOUND } = require('../utils/errors');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFound;
