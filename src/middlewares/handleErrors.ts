import { NextFunction, Request, Response } from "express"

const ERROR_HANDLERS:  Record<string, (res: Response, e: Error) => void>  = {
  ValidationError: (res: Response, e: Error) => res.status(409).json({ error: e.message }),
  SyntaxError: (res: Response, e: Error) => res.status(400).json({ error: e }),
  Default: (res: Response, e: Error) => res.status(500).json({ error: e })
}

export const handleErrors = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error.name)
  console.log(error)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.Default
  handler(res, error)
}
