import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ROUTING AUTH >>
  // MODIFY COOKIES
  // REDIRECT
  // ROUTE PROTECT
  // CHECK TOKEN
  // CHECK CREDENTIALS
  // auth library

  request.cookies.delete("vercel");
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => []

  //   modify cookie: has, delete, get, set
  // ...

  const response = NextResponse.next();
  response.cookies.set({
    name: "pokedex",
    value: "fast",
    path: "/",
  });
  const cookie = response.cookies.get("pokedex");
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

  return response;
}
