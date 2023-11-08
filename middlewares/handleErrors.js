const ERROR_HANDLERS = {
  ValidationError: (res, e) => res.status(409).json({ error: e.message }),
  SyntaxError: (res, e) => res.status(400).json({ error: e }),
  Default: (res, e) => res.status(500).json({ error: e })
}

export const handleErrors = (error, req, res, next) => {
  console.log(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.Default
  handler(res, error)
}
