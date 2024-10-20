(async function() {
    // Wait until all network requests are complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract the HTML
    const html = document.documentElement.outerHTML;

    // Extract all CSS, including dynamically loaded and cross-origin styles
    let css = '';
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            if (sheet.href) {
                // Fetch cross-origin stylesheets
                const response = await fetch(sheet.href);
                const text = await response.text();
                css += text;
            } else {
                // Inline styles or style tags
                for (const rule of sheet.cssRules) {
                    css += rule.cssText;
                }
            }
        } catch (e) {
            console.warn("Could not access stylesheet:", e);
        }
    }

    // Open a new tab and show the result
    const newTab = window.open();
    newTab.document.write(`
        <html>
            <body>
                <h2>Extracted HTML</h2>
                <textarea style="width: 100%; height: 40vh;">${html}</textarea>
                <h2>Extracted CSS</h2>
                <textarea style="width: 100%; height: 40vh;">${css}</textarea>
            </body>
        </html>
    `);
    newTab.document.close();
})();
