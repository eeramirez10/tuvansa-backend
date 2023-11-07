const ERROR_HANDLERS = {
  ValidationError: (res, e) => res.status(409).json({ error: e.message })
}

export const handleErrors = (error, req, res, next) => {
  console.log(error.name)
  ERROR_HANDLERS[error.name](res, error)
}
