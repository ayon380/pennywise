import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import BudgetCategory from "../../../../../models/Budget"; // Import the mongoose model
import connectDB from "../../../../../middleware/mongoose"; // Import the database connection

export async function POST(req) {
  try {
    await connectDB();
    // Assuming you have a way to get the user's email
    const session = await getServerSession({ req });
    const email = session.user.email;

    const body = await req.json();
    const { category, amount, date, description, type } = body;
    console.log("body" + category + amount + date + description + type);
    let a = parseInt(amount);
    // Create a new transaction
    const newTransaction = {
      category,
      description,
      amount: a,
      type,
      date,
    };

    // Find the budget category by email
    const budgetCategory = await BudgetCategory.findOne({ email });

    // Check if the budget category exists
    // console.log("budgetCategory" + budgetCategory);
    if (!budgetCategory) {
      return NextResponse.json({
        success: false,
        message: "Budget category not found",
      });
    }

    // Add the new transaction to the transactions array
    budgetCategory.transactions.push(newTransaction);
    console.log(
      typeof budgetCategory.totalTransactions +
        " " +
        typeof newTransaction.amount
    );
    budgetCategory.totalTransactions += parseInt(newTransaction.amount);
    if (newTransaction.type === "debit") {
      budgetCategory.remainingBudget -= parseInt(newTransaction.amount);
      budgetCategory.accountBalance -= parseInt(newTransaction.amount);
    } else if (newTransaction.type === "credit") {
      budgetCategory.accountBalance += parseInt(newTransaction.amount);
    }

    // Save the updated budget category with the new transaction
    // console.log("budgetCategory" + budgetCategory);
    await budgetCategory.save();

    return NextResponse.json({
      success: true,
      data: budgetCategory.transactions,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
