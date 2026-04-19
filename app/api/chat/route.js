export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return Response.json({ error: "message_required" }, { status: 400 });
    }

    const ragUrl = process.env.RAG_SERVER || process.env.ML_SERVER;
    const res = await fetch(`${ragUrl}/rag/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
