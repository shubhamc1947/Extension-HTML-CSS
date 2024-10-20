(async function () {
    // Wait a little to ensure dynamic content is fully loaded
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Function to convert relative URLs to absolute URLs
    function convertToAbsoluteUrl(url) {
        const a = document.createElement('a');
        a.href = url;
        return a.href;
    }

    // Convert all image sources to absolute URLs
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            img.src = convertToAbsoluteUrl(img.src);
        }
    });

    // Extract the HTML content
    const html = document.documentElement.outerHTML;

    // Initialize a variable to store all the CSS
    let css = '';

    // Iterate over each stylesheet
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            // If the stylesheet is external, try fetching it
            if (sheet.href) {
                const response = await fetch(sheet.href);
                const text = await response.text();
                css += text;
            } else {
                // If it's an inline style or internal style, add the rules directly
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
