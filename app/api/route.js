import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_FAMOUS_QUOTES_URL;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_FAMOUS_QUOTES_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_FAMOUS_QUOTES_HOST,
  },
};

async function getQuotes() {
  const response = await fetch(url, options);
  return response.json();
}

export async function GET(request) {
  const result = await getQuotes();
  // console.log(result);
  return NextResponse.json(result);
}
