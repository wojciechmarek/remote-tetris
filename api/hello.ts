import { names } from "./_users";

export function GET(request: Request) {
  return JSON.stringify(names);
}
