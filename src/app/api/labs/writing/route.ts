// /app/api/writing-feedback/route.ts
import type { TFeedback, WritingRequest } from "@/app/(main)/labs/writing/page";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  const response = completion.choices[0]?.message.content ?? "";

  if (response) {
    const content = JSON.parse(response) as TFeedback;
    return NextResponse.json({
      correctedText: content.correctedText,
      fluencyScore: content.fluencyScore,
      suggestions: content.suggestions,
    });
    return;
  } else {
    throw Error("Error: Response error");
  }

  // EXAMPLE RESPONSE
  // {
  //   "id": "chatcmpl-abc123",
  //   "object": "chat.completion",
  //   "created": 1713360000,
  //   "model": "gpt-4-0613",
  //   "choices": [
  //     {
  //       "index": 0,
  //       "message": {
  //         "role": "assistant",
  //         "content": "{\n  \"correctedText\": \"¡Hola! Veo a un hombre. Él tiene sobrepeso.\",\n  \"fluencyScore\": 75,\n  \"suggestions\": [\n    \"Try to use more respectful or sensitive language instead of 'gordo'.\",\n    \"Add more context to make your writing more engaging and informative.\",\n    \"Combine short sentences for better flow and cohesion.\"\n  ]\n}"
  //       },
  //       "finish_reason": "stop"
  //     }
  //   ],
  //   "usage": {
  //     "prompt_tokens": 85,
  //     "completion_tokens": 70,
  //     "total_tokens": 155
  //   }
  // }
}
