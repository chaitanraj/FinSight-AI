import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId_missing" },
        { status: 400 }
      );
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: Number(userId) },
      select: {
        date: true,
        amount: true,
      },
      orderBy: { date: "asc" },
    });

    if (expenses.length === 0) {
      return NextResponse.json(
        { error: "no_expenses" },
        { status: 400 }
      );
    }

    const payload = {
      expenses: expenses.map(e => ({
        date: e.date.toISOString(),
        amount: e.amount,
      })),
    };

    const res = await fetch(
      `${process.env.ML_SERVER}/forecast/global`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    console.error("Global forecast error:", err);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
