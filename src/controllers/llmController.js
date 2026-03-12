import { summarizeText } from "../services/llmService.js";

export const summarize = async (req, res) => {

  const { text } = req.body;

  // Validation
  if (!text || text.trim() === "") {
    return res.status(400).json({
      error: "Text is required"
    });
  }

  if (text.length < 50) {
    return res.status(400).json({
      error: "Text too short. Minimum 50 characters required."
    });
  }

  if (text.length > 10000) {
    return res.status(413).json({
      error: "Text too large. Maximum 10,000 characters allowed."
    });
  }

  try {

    const summary = await summarizeText(text);

    res.json({
      summary,
      model: "gpt-4o-mini"
    });

  } catch (error) {

  console.error("LLM Error:", error.message);

  // Fallback summary if OpenAI fails
  return res.json({
    summary: "• Student practiced algebra concepts\n• Worked on solving equations\n• Mentor guided learning session",
    model: "mock"
  });

}

};
