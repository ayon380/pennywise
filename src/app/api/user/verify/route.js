import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
export  async function GET(req, res) {
  const session = await getServerSession({ req });
  if (session) {
    return NextResponse.redirect("https://www.google.com");
  }
  return NextResponse.redirect("https://www.instagram.com");
}
