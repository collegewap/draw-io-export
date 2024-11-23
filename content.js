function copyToClipboard() {
    const interval = setInterval(() => {
        const copyButton = document.querySelectorAll('div.geDialog button.geBtn')?.[1]
        if (copyButton && copyButton.textContent === 'Copy') {
            clearInterval(interval);
            copyButton.click();
            setTimeout(() => {
                document.querySelectorAll('div.geDialog button.geBtn')?.[3]?.click()
            }, 0)
            setTimeout(() => {
                document.querySelectorAll('div.geDialog button.geBtn')?.[0]?.click()
            }, 0)
        }
    }, 100);


}

function exportToPng() {

    function triggerMouseEvent(node, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

    function triggerClick(node) {
        node.click()
    }

    const intervalPersistent = []
    const lambdas = [
        () => {
            const fileMenu = document.querySelector("body div.geMenubarContainer div.geMenubar a:nth-child(1)")
            if (!fileMenu) {
                console.error("No fileMenu");
                return;
            }

            triggerMouseEvent(fileMenu, "click")
        },
        () => {
            // here may be 14 instead of 16, if there is no "Synchronize" button in the File menu 
            const exportButton = document.querySelector("body > div.mxPopupMenu.geMenubarMenu > table > tbody > tr:nth-child(16)")
            if (!exportButton) {
                console.error("No exportButton");
                return;
            }

            triggerMouseEvent(exportButton, "pointermove")
        },
        () => {
            const pngButton = document.querySelector("body > div.mxPopupMenu:not(.geMenubarMenu) > table > tbody > tr:nth-child(1)")
            if (!pngButton) {
                console.error("No png button");
                return;
            }

            triggerMouseEvent(pngButton, "pointerdown")
        },
        () => {
            const pngButton = document.querySelector("body > div.mxPopupMenu:not(.geMenubarMenu) > table > tbody > tr:nth-child(1)")
            if (!pngButton) {
                console.error("No png button");
                return;
            }

            triggerMouseEvent(pngButton, "pointerup")
        },
        () => {
            const selectionOnlyCheckbox = document.querySelectorAll("body > div.geDialog input[type='checkbox']")[0]
            if (!selectionOnlyCheckbox) {
                console.error("No selectionOnlyCheckbox");
                return;
            }

            triggerClick(selectionOnlyCheckbox)
        },
        () => {
            const transparentBgCheckbox = document.querySelectorAll("body > div.geDialog input[type='checkbox']")[1]
            if (!transparentBgCheckbox) {
                console.error("No transparentBgCheckbox");
                return;
            }

            triggerClick(transparentBgCheckbox)
        },
        () => {
            const exportButton = document.querySelector("body > div.geDialog button.geBtn.gePrimaryBtn")
            if (!exportButton) {
                console.error("No exportButton");
                return;
            }

            triggerClick(exportButton)

            copyToClipboard()


        },
        () => {
            while (intervalPersistent.length !== 0) {
                const intervalId = intervalPersistent.pop();
                clearInterval(intervalId);
            }
        }
    ]

    let i = 0;
    const interval = setInterval(() => {
        lambdas[i]();
        ++i;
    }, 0)
    intervalPersistent.push(interval);


}

function addButtonToToolbar() {
    const toolbar = document.querySelector('.geToolbar');

    if (toolbar) {
        // Create the button element
        const button = document.createElement('button');
        button.textContent = 'Copy as PNG';
        button.className = 'custom-toolbar-button';
        button.style.cssText = `
            padding: 4px;
            margin: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f8f9fa;
            cursor: pointer;
        `;

        // Add click event listener
        button.addEventListener('click', () => {
            exportToPng()
        });

        // Append the button as the last child
        toolbar.appendChild(button);

        // Clear the interval since we've successfully added the button
        clearInterval(checkForToolbar);
    }
}

// Run when the page loads with a slight delay
setTimeout(addButtonToToolbar, 1000);

// Store interval ID so we can clear it later
const checkForToolbar = setInterval(addButtonToToolbar, 1000); 