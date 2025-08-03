import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContent(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Or any other suitable model
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.STRING,
        },
      },
    });
    const text = response.candidates[0].content.parts[0].text;
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Failed to generate summary.";
  }
}
