const { log } = require("console");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "income",
      "transportation",
      "food",
      "utilities",
      "clothing",
      "medical",
      "insurance",
      "personal",
      "debt",
      "savings",
      "other",
    ],
    default: "other",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const budgetCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // This field must be unique
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  transactions: [transactionSchema], // An array of transactions
  totalTransactions: {
    type: Number,
    default: 0,
  },
  monthlyBudget: {
    type: Number,
    default: 1000,
  },
  remainingBudget: {
    type: Number,
    default: 1000,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});

const BudgetCategory =
  mongoose.models.BudgetCategory ||
  mongoose.model("BudgetCategory", budgetCategorySchema);

module.exports = BudgetCategory;
