const { SERVER_ERROR } = require('../utils/errors');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERROR;
  }
}

module.exports = ServerError;
