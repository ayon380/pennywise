import { NextResponse } from "next/server";
import BudgetCategory from "../../../../../models/Budget"; // Import the mongoose model
import { getServerSession } from "next-auth";
import connectDB from "../../../../../middleware/mongoose"; // Import the database connection
export async function DELETE(req) {
  try {
    const session = await getServerSession({ req });
    if (session) {
      const email = session.user.email;
      await connectDB();
      const q = await BudgetCategory.findOneAndDelete({ email });
      return NextResponse.json({
        success: true,
        message: "User deleted",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
