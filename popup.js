// popup.js
chrome.storage.local.get("summary", (data) => {
  const summaryDiv = document.getElementById("summary");
  if (data.summary) {
    summaryDiv.innerText = data.summary;
  } else {
    summaryDiv.innerText = "No summary available. Right-click on a page and select 'Summarize with Gemini' to generate a summary.";
  }
});