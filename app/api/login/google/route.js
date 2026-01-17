const { prisma } = require("@/lib/prisma");
const { NextResponse } = require("next/server");
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const { email, name } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "email not found" });
        }
        let user = await prisma.user.findUnique({
            where: { email },
        })
        if (!user) {
            user = await prisma.user.create({
                data: {       
                    email,
                    name,
                    provider: "google",
                },
            })
        }


        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const res = NextResponse.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email },
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
        })

        return res;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}