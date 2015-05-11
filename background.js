// Called when the user clicks on the browser action.

/*
var setHTML = chrome.extension.getURL("settings.html");
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: setHTML});
});    
*/

var banHTML = chrome.extension.getURL("red.html");

var banList = [
    "renren.com",
    "weibo.com",
    "hupu.com",
    "zhihu.com",
    "agar.io"
];

isBanned = true;
var date = new Date();
var now = new Date();
var h = date.getHours();
if (h >= 23 || h < 0) {
    pauseChopper();
} else {
    resetChopper();
}
date.setHours(23);
date.setMinutes(0);
if (date < now) {
    date.setTime(date.getTime() + 3600 * 24 * 1000);
}
chrome.alarms.create("a1", {when: date.getTime(), periodInMinutes: 60 * 24});
date = new Date();
date.setHours(0);
date.setMinutes(0);
if (date < now) {
    date.setTime(date.getTime() + 3600 * 24 * 1000);
}
chrome.alarms.create("a2", {when: date.getTime(), periodInMinutes: 60 * 24});
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == "a1") {
        resetChopper();
    } else {
        pauseChopper();
    }
});

function checkUrl(tabId, tab) {
    
    for (var i = 0; i < banList.length; i++)
    {
        if (tab.url.indexOf(banList[i]) >= 0) {
            chrome.tabs.update(tabId, {"url" : banHTML});
            return;
        }
    }
}

function checkNewTab(tabId, changeInfo, tab) {

    if (!isBanned) {
        return;
    }
    if (!changeInfo.url) {
        return;
    }
    checkUrl(tabId, tab);
}

function resetChopper() {
    alert("ChopUrHand starts!");
    chrome.browserAction.setIcon({"path" : "icon.png"});
    isBanned = true;
    chrome.tabs.query({}, checkTabs);
}

function checkTabs(tabArr) {
    for (var i = 0; i < tabArr.length; i++)
    {
        checkUrl(tabArr[i].id, tabArr[i]);
    }
}

function pauseChopper() {
    alert("ChopUrHand pauses!");
    chrome.browserAction.setIcon({"path" : "icon-disabled.png"});
    isBanned = false;
}

chrome.tabs.onUpdated.addListener(checkNewTab);

