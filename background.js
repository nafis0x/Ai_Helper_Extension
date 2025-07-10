// background.js

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarize-doc",
    title: "Summarize with Gemini",
    contexts: ["page"],
  });
});

// Listener for context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarize-doc") {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: extractMainContent,
      },
      (injectionResults) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        for (const frameResult of injectionResults) {
          const pageContent = frameResult.result;
          // Using local storage which has a larger quota
          chrome.storage.local.set({ summary: pageContent }, () => {
            console.log("Main content extracted and stored in local storage.");
          });
        }
      }
    );
  }
});
// adding new comment
// Function to extract the main content of the page
function extractMainContent() {
  // A copy of the body to avoid modifying the live page
  const bodyClone = document.body.cloneNode(true);

  // Remove common non-content elements from the cloned body
  const selectorsToRemove =
    'nav, header, footer, aside, script, style, .sidebar, .ad, .banner, .header, .footer, .nav, .menu, #header, #footer, #nav, [role="navigation"], [role="banner"], [role="contentinfo"], #main-nav, #main-header, #main-footer, .main-nav, .main-header, .main-footer, .site-header, .site-footer, #site-header, #site-footer';
  bodyClone.querySelectorAll(selectorsToRemove).forEach((el) => el.remove());

  // Function to recursively extract text with spacing
  function getTextWithSpacing(node) {
    let text = "";
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent.trim();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const isBlock = [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "div",
        "li",
        "tr",
        "br",
        "hr",
      ].includes(tagName);

      for (const child of node.childNodes) {
        text += getTextWithSpacing(child) + " ";
      }

      if (isBlock) {
        text += "\n";
      }
    }
    return text;
  }

  let extractedText = getTextWithSpacing(bodyClone);

  // Replace multiple spaces and newlines with a single one for cleanup
  extractedText = extractedText
    .replace(/(\s\s+)/g, " ")
    .replace(/(\n\s*)+/g, "\n")
    .trim();

  return extractedText;
}
