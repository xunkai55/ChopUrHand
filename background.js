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
date.setHours(23);
date.setMinutes(0);
chrome.alarms.create("a1", {when: date.getMilliseconds(), periodInMinutes: 3600 * 24});
date.setHours(1);
chrome.alarms.create("a2", {when: date.getMilliseconds(), periodInMinutes: 3600 * 24});
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == "a1") {
        reset();
    } else {
        permit();
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

    var dateTime = new Date();
    var hh = dateTime.getHours();
    if (hh >= 23 || hh < 1) {
        return;
    }

    checkUrl(tabId, tab);
}

function reset() {
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

function permit() {
    chrome.browserAction.setIcon({"path" : "icon-disabled.png"});
    isBanned = false;
}

chrome.tabs.onUpdated.addListener(checkNewTab);
reset();

