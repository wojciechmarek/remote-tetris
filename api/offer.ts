import { offers } from "./_database.ts";
import { Offer } from "./_types.ts";

export const config = {
  runtime: "nodejs",
};

export async function POST(request: Request) {
  const json = await request.json();

  const newOffer = JSON.parse(json) as Offer;
  newOffer.dateGenerated = Date.now();
  offers.push(newOffer);

  return new Response(`Offer created: ${JSON.stringify(json)}}`);
}

export function GET(request: Request) {
  const id = request.url.split("?id=")[1] as string;

  return new Response(`GET from id=${id}: ${request.url}`);
}
