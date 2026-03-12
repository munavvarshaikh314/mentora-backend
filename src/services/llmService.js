import OpenAI from "openai";

/* Create client only if API key exists */
const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const summarizeText = async (text) => {

  /* Fallback for GitHub demo / missing API key */
  if (!client) {
    console.log("OpenAI key missing - returning mock summary");

    return "• Student practiced algebra concepts\n• Solved linear equations\n• Improved problem-solving skills\n• Session focused on fundamentals";
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Summarize the text into 3-6 bullet points under 120 words."
      },
      {
        role: "user",
        content: text
      }
    ],
    temperature: 0.3
  });

  //Safe response extrac..
  return (
    response?.choices?.[0]?.message?.content ||
    "Summary could not be generated."
  );
};