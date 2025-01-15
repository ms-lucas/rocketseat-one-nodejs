export async function json(request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    const requestBody = Buffer.concat(buffers).toString();
    request.body = JSON.parse(requestBody);
  } catch {
    request.body = null;
  }

  response.setHeader("Content-type", "application/json");
}
