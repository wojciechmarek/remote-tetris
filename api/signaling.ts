const names: string[] = [];

export function GET(request: Request) {
  return JSON.stringify(names);
}

export function POST(request: Request) {
  const body = request.body as unknown as string;
  names.push(body);
  return JSON.stringify(names);
}
