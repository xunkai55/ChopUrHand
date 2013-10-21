var bans = new Array();
bans[0] = /renren/;
bans[1] = /weibo/;
bans[2] = /hupu/;

var dateTime = new Date();
var hh = dateTime.getHours();
var mm = dateTime.getMinutes();

var banHTML = chrome.extension.getURL("ban.html");

function checkUrl(tabId, changeInfo, tab) {
	// check if it's not the ban time
	if (hh < 2 || hh >= 22)
	{
		alert("This time is accessible");
		return;
	}
	else
	{
	}

	// check if this page should be banned
	for (var i = 0, len = bans.length; i < len; i++) {
		if (bans[i].test(tab.url)) {
			chrome.tabs.update(tabId, {"url" : banHTML});
			chrome.pageAction.show(tabId);
		}
	}
};

chrome.tabs.onUpdated.addListener(checkUrl);
