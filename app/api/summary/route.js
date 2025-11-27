import { NextResponse } from "next/server";
import { prisma } from "@prisma/client";
export async function GET(req){
    const url=new URL(req.url);
    const start=url.searchParams.get("start");
    const end=url.searchParams.get("end");
    const userId=url.searchParams.get("userId") || undefined;

    if(!start||!end)
    {
        return NextResponse.json({error:"start and end date required"},{status:400});
    }

    const totalRes=await prisma.expense.aggregate({
        _sum:{ amount:true },
        where:{
            date:{gte:startDate, lt: endDate},
            ...(userId ? {userId:Number(userId)}:{})
        }
    });

}