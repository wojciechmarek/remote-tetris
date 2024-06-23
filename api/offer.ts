// const { offers } = require("./_database.ts");
// const { Offer } = require("./_types.ts");

export function GET(request) {
  const id = request.url.split("?id=")[1];

  return new Response(`GET from id=${id}: ${request.url}`);
}

export async function POST(request) {
  const json = await request.json();

  return new Response(
    `Method POST, received json: ${json}, parsed: ${JSON.stringify(json)}`
  );
}
