const names: string[] = ["Steve"];

export async function POST(request: Request) {
  const json = await request.json();
  return new Response(`POST body test: ${json}`);
}

export function GET(request: Request) {
  return new Response(`GET url test: ${request.url}`);
}
