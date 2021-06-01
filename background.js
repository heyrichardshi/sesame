let history = [];
let historyLimit = 10;
let length = 16;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ history });
  chrome.storage.sync.set({ historyLimit });
  chrome.storage.sync.set({ length });
});
