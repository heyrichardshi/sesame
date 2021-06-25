let history = [];
let historyLimit = 10;
let length = 16;
let capitalization = false;
let prefix = "";
let postfix = "";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ history });
  chrome.storage.sync.set({ historyLimit });
  chrome.storage.sync.set({ length });
  chrome.storage.sync.set({ capitalization });
  chrome.storage.sync.set({ prefix });
  chrome.storage.sync.set({ postfix });
});
