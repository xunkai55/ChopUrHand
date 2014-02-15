// Called when the user clicks on the browser action.

var setHTML = chrome.extension.getURL("settings.html");
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: setHTML});
});    

var banHTML = chrome.extension.getURL("red.html");

var banList = [
    "renren.com/353173410",
    "weibo.com",
    "hupu.com"
];

function checkUrl(tabId, changeInfo, tab) {
    
    if (!changeInfo.url) {
        return;
    }

    var dateTime = new Date();
    var hh = dateTime.getHours();
    if (hh >= 22 || (hh < 7 && hh >= 6)) {
        return;
    }

    for (var i = 0; i < banList.length; i++)
    {
        if (banList[i].test(tab.url)) {
            chrome.tab.update(tabId, {"url" : banHTML});
        }
    }
};
/*
function add() {
    with (document.all) {
        if (
*/
chrome.tabs.onUpdated.addListener(checkUrl);
