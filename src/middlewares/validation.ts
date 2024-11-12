import { SafeParseError, Schema } from 'zod';
import { RequestHandler } from 'express';

type Property = 'body' | 'query' | 'header' | 'params';

type AllSchemas = Record<Property, Schema<unknown>>;

type Validation = (AllSchemas: Partial<AllSchemas>) => RequestHandler;

type Error = Record<string, Record<string, string>>;

const formatErrorsZod = (safeParseError: SafeParseError<unknown>) => {
  const errorsZod = safeParseError.error.flatten().fieldErrors;
  const errorsZodArray = Object.entries(errorsZod);
  const returnErrors: Record<string, string> = {};

  for (const [key, message] of errorsZodArray) {
    if (Array.isArray(message)) {
      returnErrors[key] = message.join(' ');
    }
  }

  return returnErrors;
};

const validation: Validation = (AllSchemas) => (req, res, next) => {
  const schemasArray = Object.entries(AllSchemas);
  let errors: Error = {};

  for (const [key, schema] of schemasArray) {
    const result = schema.safeParse(req[key as Property]);

    if (!result.success) errors[key] = formatErrorsZod(result);
  }

  const hasErrors = Object.entries(errors).length > 0;
  if (!hasErrors) return next();

  res.status(400).json({ errors });
};

export { validation };
