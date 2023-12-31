import { NextResponse } from "next/server";
import BudgetCategory from "../../../../../models/Budget"; // Import the mongoose model
import connectDB from "../../../../../middleware/mongoose"; // Import the database connection
export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    await connectDB();
    console.log(email);
    const q =await BudgetCategory.findOne({ email }).exec();
    console.log(q);
    if (q) {
      return NextResponse.json({
        success: true,
        message: "name already exists",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Budget doesnt exist",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
