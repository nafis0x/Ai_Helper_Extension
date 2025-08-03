// background.js
import { generateContent } from "./getAiData.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "generate_response") {
    const { promptInput, promptType } = message.data;
    let finalPrompt = "";

    if (promptType === "correct_prompt") {
      finalPrompt = `Revise the following text to be grammatically correct and more understandable, without altering technical meaning: "${promptInput}"`;
    } else if (promptType === "en_to_bn") {
      finalPrompt = `Translate the following English text to Bangla: "${promptInput}"`;
    }

    generateContent(finalPrompt)
      .then((response) => {
        sendResponse({ status: "success", data: response });
      })
      .catch((error) => {
        console.error("Error generating content:", error);
        sendResponse({ status: "error", data: "Failed to generate response." });
      });

    // Return true to indicate you wish to send a response asynchronously.
    return true;
  }
});
