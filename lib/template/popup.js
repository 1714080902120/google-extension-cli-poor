export const popupJsStr = `
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
`

export const popupHtmlStr = `
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <button id="changeColor"></button>
    <script src="__popupJs"></script>
  </body>
</html>
`

export const linkCssStr = `
button {
    height: 30px;
    width: 30px;
    outline: none;
    margin: 10px;
    border: none;
    border-radius: 2px;
  }
  
  button.current {
    box-shadow: 0 0 0 2px white,
                0 0 0 4px black;
  }
`