import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "UserId is missing" },
        { status: 400 }
      );
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: Number(userId) },
      select: {
        date: true,
        amount: true
      },
      orderBy: { date: "asc" }
    });

    const res = await fetch(`${process.env.ML_SERVER}/forecast/daily`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expenses: expenses.map(e => ({
          date: e.date.toISOString(),
          amount: e.amount
        }))
      }),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Daily forecast error:", err);
    return Response.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
