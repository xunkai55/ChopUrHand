// Called when the user clicks on the browser action.

/*
var setHTML = chrome.extension.getURL("settings.html");
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: setHTML});
});    
*/

var banHTML = chrome.extension.getURL("red.html");

var banList = [
    "renren.com/353173410",
    "weibo.com",
    "hupu.com"
];

var lastPermit = new Date();
lastPermit.setFullYear(1994);
var isBanned = true;
var permitGap = 600000;
var permitLong = 600000;

//var permitGap = 5000;
//var permitLong = 5000;

function checkUrl(tabId, tab) {
    
    for (var i = 0; i < banList.length; i++)
    {
        if (tab.url.indexOf(banList[i]) >= 0) {
            chrome.tabs.update(tabId, {"url" : banHTML});
            return;
        }
    }

};

function checkNewTab(tabId, changeInfo, tab) {

    if (!isBanned) {
        return;
    }

    if (!changeInfo.url) {
        return;
    }

    var dateTime = new Date();
    var hh = dateTime.getHours();
    if (hh >= 22 || hh < 7) {
        return;
    }

    checkUrl(tabId, tab);

}

function reset() {

    if (isBanned) {
        return;
    }
    alert ("Time is up");
    chrome.browserAction.setIcon({"path" : "icon.png"});
    isBanned = true;
    chrome.tabs.query({}, checkTabs);
    var tnow = new Date();
    lastPermit.setTime(tnow.getTime());
}

function checkTabs(tabArr) {
    for (var i = 0; i < tabArr.length; i++)
    {
        checkUrl(tabArr[i].id, tabArr[i]);
    }
}

function permit(tab) {

    if (!isBanned) {
        return;
    }
    var now = new Date();
    if (now.getTime() - lastPermit.getTime() < permitGap) {
        alert ("CHOP!YOUR!HAND!");
        return;
    }
    chrome.browserAction.setIcon({"path" : "icon-disabled.png"});
    isBanned = false;
    var timer = setTimeout(reset, permitLong);
    alert("Now you have a 10 min break");
}

chrome.tabs.onUpdated.addListener(checkNewTab);
chrome.browserAction.onClicked.addListener(permit);
