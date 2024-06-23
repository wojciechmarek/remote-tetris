const names: string[] = ["Steve"];

export function GET(request: Request) {
  return new Response(
    `Hello from ${process.env.VERCEL_REGION}, names: ${JSON.stringify(names)}`
  );
}
// export function GET(request: Request) {
//   return JSON.stringify(names);
// }
