import { createServer } from "node:http";

const app = createServer(async (request, response) => {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const content = Buffer.concat(buffers).toString();

  return response.end(content);
});

app.listen(3000, () => console.log("HTTP server running..."));
