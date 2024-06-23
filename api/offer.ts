const { offers } = require("./_database.ts");
const { Offer } = require("./_types.ts");

export async function POST(request: Request) {
  const json = await request.json();

  const newOffer = JSON.parse(json);
  newOffer.dateGenerated = Date.now();
  offers.push(newOffer);

  return new Response(`Offer created: ${JSON.stringify(json)}}`);
}

export function GET(request: Request) {
  const id = request.url.split("?id=")[1] as string;

  return new Response(`GET from id=${id}: ${request.url}`);
}
