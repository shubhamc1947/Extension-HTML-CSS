document.getElementById("extract").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "extract_content" });
    document.getElementById("status").innerText = "Extraction in progress...";
});
