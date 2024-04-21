// popup.js


document.addEventListener('DOMContentLoaded', function () {
    var clickCount = 0;
    document.getElementById("b1").onclick = function () {
        // clickCount toggles the button
        if (clickCount % 2 === 0) {
            document.getElementById("b_image").src = "button_on.svg";
            chrome.tabs.executeScript({
                file: 'highlighter.js'
            });
        } else {
            document.getElementById("b_image").src = "button_off.svg";
            chrome.tabs.reload();
        }
        clickCount++;
    }
    chrome.runtime.onMessage.addListener(function (message) {
        if (message.action === 'sendMatchData') {
            document.getElementById('count').textContent = message.matchData.Total;
            
            const Categories = message.matchData.Categories;
            const catList = document.getElementById("categoryList");

            for (const category in Categories) {
                const value = Categories[category];
            
                // Checks if dark pattern count is non-zero
                if (value !== 0) {
                  const listItem = document.createElement("li");
                  listItem.textContent = `${category}: ${value}`;
                  catList.appendChild(listItem);
                }
              }

        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("dark-mode").onclick = function () {
        document.body.classList.toggle("light");
        document.getElementById("extension_name").classList.toggle("light");
        document.getElementById("b1").classList.toggle("light");
        document.querySelector(".github-link").classList.toggle("light");
        document.getElementById("dark-mode").classList.toggle("light");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("categoryShow").onclick = function () {
        var content = document.getElementById("collapsibleCategory");
        var main_container = document.querySelector(".counter-container");
        if (!content) {
            return;
        }

        var body = document.body;

        if (content.style.display === "flex") {
            content.style.display = "none";
            body.style.height = "400px";
            main_container.style.flex = "0 1 auto";
        } else {
            main_container.style.display = "flex";
            content.style.display = "flex";
            main_container.style.flex = "1";
            body.style.minHeight = "400px";
            body.style.height = "auto";
            main_container.style.marginBottom = "10px";
            main_container.style.marginTop = "5px";
        }
    }
});

// popup.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'sendMatchData') {
        // Extract match data and categories from the message
        var matchData = message.matchData;
        
        // Display match data and categories in the popup HTML
        document.getElementById('totalMatches').textContent = matchData.Total;
        document.getElementById('categories').textContent = JSON.stringify(matchData.Categories);
    }
});
