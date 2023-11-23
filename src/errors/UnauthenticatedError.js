class UnauthenticatedError extends Error {
  constructor(message) {
    const defaultMessage = 'Unauthenticated'
    super(message || defaultMessage);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default UnauthenticatedError;
