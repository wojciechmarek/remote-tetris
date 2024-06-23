const names: string[] = ["Steve"];

export function POST(request: Request) {
  return new Response(`POST body test: ${request.json}`);
}

export function GET(request: Request) {
  return new Response(`GET url test: ${request.url}`);
}
