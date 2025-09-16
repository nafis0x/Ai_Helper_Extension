# AI prompt enhancing Chrome Extension

This Chrome extension organise the un organised prompt using the Gemini API.

## Setup

1.  **Get a Gemini API Key:**
    *   Go to [Google AI Studio](https://aistudio.google.com/) and get your API key.
    *   Create a file named `.env` in the root of the project.
    *   Add the following line to the `.env` file:

        ```
        GEMINI_API_KEY=YOUR_API_KEY
        ```

        Replace `YOUR_API_KEY` with your actual Gemini API key.

2.  **Build the Project:**
    *   Install the dependencies:
        ```bash
        npm install
        ```
    *   Build the project with Vite:
        ```bash
        npm run build
        ```
    This will create a `dist` directory with the extension files.

3.  **Load the Extension in Chrome:**
    *   Open Chrome and go to `chrome://extensions/`.
    *   Enable "Developer mode".
    *   Click on "Load unpacked".
    *   Select the `dist` directory from the project.

## How to Use

1.  Copy the prompt you would like to enhance.
2.  Click the extension icon located in the Chrome toolbar.
3.  Paste the prompt into the input field within the extension popup.
4.  The enhanced version of your prompt will be displayed instantly.
