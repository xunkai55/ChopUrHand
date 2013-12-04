// Called when the user clicks on the browser action.

var setHTML = chrome.extension.getURL("settings.html");
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: setHTML});
});    

var bans;
if (!localStorage.hasOwnProperty('bans')) {
    bans = new Array();
}
else {
    bans = localStorage.bans;
}

function appendBans(ban) {
    bans.push(ban)
}

function createBan(prefix, pbt, pms, tpms) {
    // pms = permission
    // tpms = temporary permission
    // pbt = prohibition
    var ban = {
        prefix : prefix,
        pbt : pbt,
        pms : pms,
        tpms : tpms,
        silent : false,
        resume : new Date()
    };
    return ban;
}

var dateTime = new Date();
var hh = dateTime.getHours();
var mm = dateTime.getMinutes();

var banHTML = chrome.extension.getURL("ban.html");
alert(banHTML);
localStorage.clear();

function checkUrl(tabId, changeInfo, tab) {
    
    if (!changeInfo.url) {
        return;
    }
    if (setHTML == tab.url) {
        settingsPrepare(tabId);
    }
    var cnt;
    if (!localStorage.hasOwnProperty('cnt')) {
        cnt = 0;
    }
    else {
        cnt = parseInt(localStorage.cnt);
    }
    cnt = cnt + 1;
    localStorage.cnt = cnt;
    alert(cnt);
};
/*
function add() {
    with (document.all) {
        if (
*/
chrome.tabs.onUpdated.addListener(checkUrl);
