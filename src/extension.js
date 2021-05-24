import { generatePhrase } from "./octothorpe.js";
import "./sass/popup.scss";

console.log(generatePhrase(16));

function pushToHistory(phrase) {
    chrome.storage.sync.get(["history", "historyLimit"], function(o) {
        let history = [phrase].concat(o.history);

        if (history.length > o.historyLimit) {
            history.pop();
        }

        console.log(history);

        chrome.storage.sync.set({ history });
    });
}

// function updateHistoryDiv() {
//     chrome.storage.sync.get("history", ({ history }) => {
//         console.log(history);
//     });
// }

let passwordField = document.getElementById("generatedPassword");
document.getElementById("theEasyButton").addEventListener("click", async () => {
    let p = generatePhrase(16);
    passwordField.textContent = p;
    pushToHistory(p);
});
