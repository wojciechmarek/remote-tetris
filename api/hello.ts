import { names } from "./_users";

export function GET(request: Request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
// export function GET(request: Request) {
//   return JSON.stringify(names);
// }
