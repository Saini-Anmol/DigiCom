var fileUrl = chrome.runtime.getURL('dataset.txt');
console.log(fileUrl);

fetch(fileUrl)
    .then(response => response.text())
    .then(content => {
        // Taking input in an array
        const arr = content.split('\n').filter(Boolean);
        var words = arr.map(element => element.replace('\r', ''));
        var bodyText = document.body.innerHTML;
        var matchCounter = 0;
        var categoryCounts = {
            "Forced Action": 0,
            "Baseless reassurance.": 0,
            "Misguiding User Flow": 0,
            "False Scarcity": 0,
            "Social Proof": 0,
            "Hidden Subscription": 0,
            "False Affiliation": 0,
            "Negative Option": 0,
            "Upselling": 0,
            "Positive Reinforcement": 0,
            "Urgency": 0
        }; // Object to store category-wise match counts

        for (var i = 0; i < words.length; i++) {
            var wordData = words[i].split('@');
            var word = wordData[0];
            var category = wordData[1];

            var regex = new RegExp(word, 'gi');
            bodyText = bodyText.replace(regex, function (match) {
                matchCounter++;

                // Update category count
                if (category) {
                    if (!categoryCounts[category]) {
                        categoryCounts[category] = 1;
                    } else {
                        categoryCounts[category]++;
                    }
                }

                return '<mark style="background-color: yellow;">' + match + '</mark>';
            });
        }
        // Sending match data and categories to popup.js
        sendMatchData({ Total: matchCounter, Categories: categoryCounts });
        document.body.innerHTML = bodyText;
    });

function sendMatchData(data) {
    chrome.runtime.sendMessage({ action: 'sendMatchData', matchData: data });
}







//image detection code goes here


