import { fastify } from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "process";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.formErrors,
    });
  }

  if (env.NODE_ENV !== "prodution") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool
  }

  return reply.status(500).send();
});
