import { NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.5-flash-lite"; 
const API_KEY = process.env.GOOGLE_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const ALLOWED_CATEGORIES = [
  "Groceries", "Food", "Transport", "Shopping", "Utilities", 
  "Rent", "Entertainment", "Health", "Travel", "Other"
];

function fallbackCategorize(text) {
  const input = text.toLowerCase();
  
  const rules = [
    { cat: "Groceries", keywords: ["mart", "market", "basket", "grocer", "dairy", "lentils", "pulse", "bigbasket", "zepto", "blinkit", "milk"] },
    { cat: "Food", keywords: ["restaurant", "cafe", "swiggy", "zomato", "eats", "pizza", "burger", "dine", "starbucks", "coffee"] },
    { cat: "Transport", keywords: ["uber", "ola", "taxi", "cab", "metro", "fuel", "petrol", "diesel", "shell", "hpcl", "train", "bus"] },
    { cat: "Shopping", keywords: ["zara", "amazon", "flipkart", "myntra", "mall", "fashion", "wear", "clothing", "shoes", "nike", "h&m"] },
    { cat: "Utilities", keywords: ["bill", "electricity", "water", "gas", "internet", "wifi", "jio", "airtel", "recharge", "mobile"] },
    { cat: "Rent", keywords: ["rent", "owner", "apartment", "deposit"] },
    { cat: "Entertainment", keywords: ["netflix", "prime", "spotify", "movie", "cinema", "theatre", "hotstar", "concert", "game"] },
    { cat: "Health", keywords: ["pharmacy", "hospital", "clinic", "doctor", "medical", "chemist", "fitness", "gym", "med"] },
    { cat: "Travel", keywords: ["hotel", "flight", "air", "booking", "makemytrip", "goibibo", "stay", "resort"] }
  ];

  for (const rule of rules) {
    if (rule.keywords.some(k => input.includes(k))) return rule.cat;
  }
  return "Other";
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

    const cleaned = text.toLowerCase().trim();

    const payload = {
      contents: [{
        parts: [{ 
          text: `Classify: "${cleaned}". Use ONLY: ${ALLOWED_CATEGORIES.join(", ")}. Reply with one word.` 
        }]
      }],
      generationConfig: { temperature: 0, maxOutputTokens: 10 }
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({ category: fallbackCategorize(cleaned), method: "fallback" });
    }

    const result = await response.json();
    let generated = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    
    const formatted = generated.charAt(0).toUpperCase() + generated.slice(1).toLowerCase().replace(/[^\w]/g, "");
    const finalCategory = ALLOWED_CATEGORIES.includes(formatted) ? formatted : "Other";

    return NextResponse.json({ category: finalCategory, method: "ai" });

  } catch (err) {
    const { text } = await req.json().catch(() => ({})); 
    return NextResponse.json({ 
      category: text ? fallbackCategorize(text) : "Other", 
      method: "critical-fallback" 
    });
  }
}