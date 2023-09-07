export const dynamic = 'force-dynamic' 

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import BudgetCategory from "../../../../../models/Budget"; // Import the mongoose model
import connectDB from "../../../../../middleware/mongoose"; // Import the database connection
export async function GET(req) {
  try {
    const session = await getServerSession({ req });
    if (session) {
      await connectDB();
      const { email } = session.user;
      let data =await BudgetCategory.findOne({ email: email });
    //   console.log(data);
      if (data) {
        return NextResponse.json({
          success: true,
          data: data,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No transaction found",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Please login first",
      });
    }
  } catch (error) {
    // Return an error response with the error message
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
