// /app/api/writing-feedback/route.ts
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface WritingRequest {
  text: string;
  language: string;
}

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { text, language } = (await req.json()) as WritingRequest;

  const prompt = `
You are a helpful writing tutor. Analyze the following ${language} writing and provide:
1. A corrected version.
2. A fluency score out of 100.
3. 3 constructive suggestions.

User writing:
${text}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content ?? "";
  // You can use structured output from GPT or parse the text here.
  return NextResponse.json({
    correctedText: text, // You can update this with GPT response parsing
    fluencyScore: Math.floor(Math.random() * 30) + 70,
    highlights: [],
    suggestions: content.split("\n").slice(0, 3), // dummy split
  });
}
