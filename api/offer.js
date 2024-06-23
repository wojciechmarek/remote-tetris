// const { offers } = require("./_database.ts");
// const { Offer } = require("./_types.ts");

export async function POST(request) {
  const json = await request.json();

  const jsonString = JSON.stringify(json);
  const newOffer = JSON.parse(jsonString);
  newOffer.dateGenerated = Date.now();
  offers.push(newOffer);

  return new Response(`Offer created: ${JSON.stringify(json)}}`);
}

export function GET(request) {
  const id = request.url.split("?id=")[1];

  return new Response(`GET from id=${id}: ${request.url}`);
}
