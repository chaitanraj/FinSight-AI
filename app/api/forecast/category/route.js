import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "UserId is missing" }, { status: 400 });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId: Number(userId),
        category: { not: null }
      },
      select: {
        date: true,
        amount: true,
        category: true
      },
      orderBy: { date: "asc" }
    });
    const payload = {
      expenses: expenses.map(e => ({
        date: e.date.toISOString(), 
        amount: e.amount,
        category: e.category
      }))
    };

    const res = await fetch(`${process.env.ML_SERVER}/forecast/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Category forecast error:", err);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
