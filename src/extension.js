import { generatePhrase } from "./octothorpe.js";
import "./sass/popup.scss";
// import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss"
// import "../node_modules/@fortawesome/fontawesome-free/scss/regular.scss"

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

function getLength() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("length", ({ length }) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(length);
        });
    });
}

function setLength(length) {
    chrome.storage.sync.set({ length });
}

let passwordField = document.getElementById("generatedPassword");
let inputLength = document.getElementById("optLength");

document.getElementById("theEasyButton").addEventListener("click", async () => {
    let length = parseInt(inputLength.value);
    let p = generatePhrase(length);
    passwordField.textContent = p;
    pushToHistory(p);
});

inputLength.addEventListener("change", function (ev) {
    if (!this.value || parseInt(this.value) < 8 || parseInt(this.value) > 64) {
        getLength().then((length) => {
            this.value = length.toString();
        });
    } else {
        setLength(this.value);
    }
});

passwordField.addEventListener("click", function (ev) {
    navigator.clipboard.writeText(this.textContent)
})

getLatestHistory().then((history) => {
    passwordField.textContent = history || "***";
});

getLength().then((length) => {
    inputLength.value = length.toString();
});
