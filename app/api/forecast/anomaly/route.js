import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const {userId} = await req.json();

    if(!userId){
      return NextResponse.json({error:"UserId is missing"},{status:400});
    }

    const expenses=await prisma.expense.findMany({
      where: { userId: Number(userId) },
      orderBy:{date:"asc"},
    });

    const result=expenses.map(x=>({
      date: x.date.toISOString().slice(0, 10),
      amount:x.amount,
      category:x.category,
    }))

    const res = await fetch(`${process.env.ML_SERVER}/anomaly`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenses: result }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Anomaly error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
