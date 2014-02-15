// Called when the user clicks on the browser action.

var setHTML = chrome.extension.getURL("settings.html");
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: setHTML});
});    

var dateTime = new Date();
var hh = dateTime.getHours();
var mm = dateTime.getMinutes();

var banHTML = chrome.extension.getURL("ban.html");
alert(banHTML);

function checkUrl(tabId, changeInfo, tab) {
    
    if (!changeInfo.url) {
        return;
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
};
/*
function add() {
    with (document.all) {
        if (
*/
chrome.tabs.onUpdated.addListener(checkUrl);
