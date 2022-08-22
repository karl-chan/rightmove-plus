let prevUrl = '' // prevent firing duplicate events on the same page

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (!tab.url || tab.url === prevUrl) {
      return
    }
    prevUrl = tab.url
    chrome.tabs.sendMessage(tabId, { type: 'onPageChanged' })
  }
})
