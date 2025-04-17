// /app/api/writing-feedback/route.ts
import { type NextRequest, NextResponse } from "next/server";
import type { TFeedback, WritingRequest } from "@/app/(main)/labs/writing/page";
import { env } from "@/env";
import { GoogleGenAI } from "@google/genai";
// import OpenAI from "openai";

const gemini = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  //Validate the request first.
  const { text, language } = (await req.json()) as WritingRequest;

  const prompt = `
    You are a helpful writing tutor. Analyze the following ${language} writing and provide in JSON:
    1. correctedText: A corrected version.
    2. fluencyScore: A fluency score out of 100.
    3. suggestions: 3 constructive suggestions in english

    User writing:
    ${text}
    `;

  // const openai = new OpenAI({
  //   apiKey: env.OPENAI_API_KEY,
  // });
  // const completion = await openai.chat.completions.create({
  //   model: "",
  //   messages: [{ role: "user", content: prompt }],
  //   temperature: 0.7,
  //   max_tokens: 100,
  // });
  // const response = completion.choices[0]?.message.content ?? "";
  // const content = JSON.parse(response) as TFeedback;

  const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  if (response?.text) {
    const content = extractJSON(response.text);
    return NextResponse.json({
      correctedText: content.correctedText,
      fluencyScore: content.fluencyScore,
      suggestions: content.suggestions,
    });
  } else {
    throw Error("Error: Response error");
  }
}

function extractJSON(text: string): TFeedback {
  const match = /```json\s*([\s\S]*?)```/i.exec(text);
  if (match?.[1]) {
    return JSON.parse(match[1]) as TFeedback;
  } else {
    return JSON.parse(text) as TFeedback;
  }
}
