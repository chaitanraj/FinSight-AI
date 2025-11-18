import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  merchant: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: false },
  date: { type: Date, required: true, default: () => new Date() },
  metadata: { type: Object, required: false }
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
