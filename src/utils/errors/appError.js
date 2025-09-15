export default class AppError extends Error {
    constructor(message, statusCode, explanation = []) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = false; // always false for errors
      this.explanation = explanation; // array of error details
      this.isOperational = true; //lets you distinguish expected vs unexpected errors.
  
      Error.captureStackTrace(this, this.constructor); // creates a .stack property on the error instance
    }
  }
  