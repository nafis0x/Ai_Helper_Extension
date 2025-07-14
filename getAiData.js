import "dotenv/config";
// This part of the script retrieves the summary from local storage and displays it in the popup.
// chrome.storage.local.get("summary", (data) => {
//   const summaryDiv = document.getElementById("summary");
//   if (data.summary) {
//     summaryDiv.innerText = data.summary;
//   } else {
//     summaryDiv.innerText = "No summary available. Right-click on a page and select 'Summarize with Gemini' to generate a summary.";
//   }
// });

// Step 1: Import the GoogleGenAI class from the SDK.
import { GoogleGenAI,Type } from "@google/genai";

// Step 2: Get your API key from Google AI Studio and set it as an environment variable named `GEMINI_API_KEY`.
// The GoogleGenAI constructor will automatically use this environment variable.
const ai = new GoogleGenAI({});

// Step 3: Define an async function to make the API call.
async function generateContent(prompt) {
  try {
    // Step 4: Call the generateContent method with the desired model and prompt.
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Or any other suitable model
      contents: prompt,
      config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
            },
          },
        //   propertyOrdering: ["recipeName", "ingredients"],
        },
    },
      },
    });
    // Step 5: Process the response and return the generated text.
    const text = response.candidates[0].content.parts[0].text;
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Failed to generate summary.";
  }
}

// Example of how to use the generateContent function.
// This part is for demonstration and would be triggered by a user action in a real extension.
async function main() {
  const prompt = "Explain what to learn in backend golang in a few word";
  const summary = await generateContent(prompt);
  console.log(summary);
}

main();
