let history = [];
let historyLimit = 10;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ history });
  chrome.storage.sync.set({ historyLimit });
});
