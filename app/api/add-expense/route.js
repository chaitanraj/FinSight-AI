import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.merchant || !body.amount || !body.userId) {
      return NextResponse.json(
        { error: "merchant, amount, and userId are required" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: Number(body.userId),
        merchant: body.merchant,
        amount: Number(body.amount),
        category: body.category || null,
        date: body.date ? new Date(body.date) : new Date(),
        metadata: body.metadata || {}
      }
    });

    return NextResponse.json(expense);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}