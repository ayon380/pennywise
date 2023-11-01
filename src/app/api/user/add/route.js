// app/api/users/route.js
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import BudgetCategory from "../../../../../models/Budget"; // Import the mongoose model
import connectDB from "../../../../../middleware/mongoose"; // Import the database connection
export async function POST(req) {
  try {
    // Get the user data from the request body
    const body = await req.json();
    const session = await getServerSession({ req });
    if (session) {
      const { name, email, image, monthlyBudget, accountBalance } = body;
      await connectDB();
      // Validate the input data
      console.log(body);
      if (!name || !email || !image || !monthlyBudget || !accountBalance) {
        return NextResponse.json({
          success: false,
          message: "Please provide all the required fields",
        });
      }

      // Check if the email already exists in the database
      const existingUser = await BudgetCategory.findOne({ email });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: "Email already in use",
        });
      }

      // Create a new user with the input data
      const newUser = new BudgetCategory({
        name,
        email,
        image,
        monthlyBudget,
        remainingBudget: monthlyBudget,
        accountBalance,
      });

      // Save the user to the database
      await newUser.save();

      // Return a success response with the user data
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
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
