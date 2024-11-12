import { Schema } from 'zod';
import { RequestHandler } from 'express';

type Property = 'body' | 'query' | 'header' | 'params';

type AllSchemas = Record<Property, Schema<unknown>>;

type Validation = (AllSchemas: Partial<AllSchemas>) => RequestHandler;

type Error = Record<string, Record<string, string>>;

const validation: Validation = (AllSchemas) => (req, res, next) => {
  const schemasArray = Object.entries(AllSchemas);
  let errors: Error = {};

  for (const [key, schema] of schemasArray) {
    const result = schema.safeParse(req[key as Property]);

    if (!result.success) errors[key] = result.error.flatten().fieldErrors;
  }

  const hasErrors = Object.entries(errors).length > 0;
  if (!hasErrors) return next();

  res.status(400).json({ error: errors });
};

export { validation };
