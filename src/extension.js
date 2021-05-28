import { generatePhrase } from "./octothorpe.js";
import "./sass/popup.scss";

function pushToHistory(phrase) {
    chrome.storage.sync.get(["history", "historyLimit"], function (o) {
        let history = [phrase].concat(o.history);

        if (history.length > o.historyLimit) {
            history.pop();
        }

        console.log(history);

        chrome.storage.sync.set({ history });
    });
}

function getHistory() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("history", ({ history }) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(history);
        });
    });
}

async function getLatestHistory() {
    const history = await getHistory();
    if (history.length) {
        return Promise.resolve(history[0]);
    } else {
        return Promise.resolve(null);
    }
}

let passwordField = document.getElementById("generatedPassword");
document.getElementById("theEasyButton").addEventListener("click", async () => {
    let p = generatePhrase(16);
    passwordField.textContent = p;
    pushToHistory(p);
});
getLatestHistory().then((history) => {
    passwordField.textContent = history || "***";
});
