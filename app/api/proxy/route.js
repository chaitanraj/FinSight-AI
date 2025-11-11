import { jwtVerify } from "jose";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return Response.json({ loggedIn: false }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // Return user info
    return Response.json({
      loggedIn: true,
      name: payload.name,
      id: payload.id,
    });
  } catch (err) {
    return Response.json({ loggedIn: false }, { status: 401 });
  }
}
