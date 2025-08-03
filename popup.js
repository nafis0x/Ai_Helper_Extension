// popup.js
document.getElementById("submitBtn").addEventListener("click", () => {
  const promptInput = document.getElementById("promptInput").value;
  const promptType = document.getElementById("promptType").value;
  const responseDiv = document.getElementById("response");

  responseDiv.innerText = "Loading...";

  chrome.runtime.sendMessage({
    type: "generate_response",
    data: { promptInput, promptType }
  }, (response) => {
    if (chrome.runtime.lastError) {
      responseDiv.innerText = `Error: ${chrome.runtime.lastError.message}`;
      return;
    }
    
    if (response && response.status === "success") {
      console.log("popup:", response.data)
      let responseData = response.data;
      if (responseData.startsWith('"') && responseData.endsWith('"')) {
        responseData = responseData.substring(1, responseData.length - 1);
      }
      responseDiv.innerText = responseData;
    } else {
      responseDiv.innerText = "Error receiving response from background script.";
    }
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const copyBtn = document.getElementById("copyBtn");
  const responseText = document.getElementById("response").innerText;
  navigator.clipboard.writeText(responseText)
    .then(() => {
      copyBtn.innerText = "Copied!";
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
    })
    .catch(err => {
      console.error("Failed to copy response: ", err);
      copyBtn.innerText = "Error";
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
    });
});