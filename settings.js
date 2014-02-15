function displayBans()
{
    var tarDiv = document.getElementById("banlist");
    while (tarDiv.firstChild) {
        tarDiv.removeChild(tarDiv.firstChild);
    }
    var bans = new Array();

    if (!localStorage.hasOwnProperty('bans')) {
        return;
    }
    else {
        bans = JSON.parse(localStorage.bans);
    }
        
    for (var i = 0; i < bans.length; i++) {
        var banElement = createBanElement(bans[i]);
        tarDiv.appendChild(banElement);
    }
}

function createBanElement(ban) {
    
    var div = document.createElement("ul");
    
    var prefix = document.createElement("li");
    prefix.innerHTML = ban.prefix;
    div.appendChild(prefix);

    var total = document.createElement("li");
    total.innerHTML = String(ban.pms.total);
    div.appendChild(total);

    var each = document.createElement("li");
    each.innerHTML = String(ban.pms.each);
    div.appendChild(each);

    var ttotal = document.createElement("li");
    ttotal.innerHTML = String(ban.tpms.total);
    div.appendChild(ttotal);

    var teach = document.createElement("li");
    teach.innerHTML = String(ban.tpms.each);
    div.appendChild(teach);

    var sil = document.createElement("li");
    if (!ban.silent) {
        sil.innerHTML = "disabled";
    }
    else {
        sil.innerHTML = "available";
    }
    div.appendChild(sil);

    return div;
}

function createBan(prefix, pms, tpms) {
    // pms = permission
    // tpms = temporary permission
    var ban = {
        prefix : prefix,
        pms : pms,
        tpms : tpms,
        silent : false,
        resume : new Date()
    };
    return ban;
}

function addBan() {
    
    var prefixInput = document.getElementById("prefix").value;
    var totalInput = parseInt(document.getElementById("total").value);
    var eachInput = parseInt(document.getElementById("each").value);
    
    if (isNaN(totalInput) || isNaN(eachInput)) {
        alert("输入格式有误!");
        return;
    }
    var pms = createPms(totalInput, eachInput);
    var tpms = createPms(-1, -1);
    var ban = createBan(prefixInput, pms, tpms);

    var bans = new Array();
    if (localStorage.hasOwnProperty("bans")) {
        bans = JSON.parse(localStorage.bans);
    }
    bans.push(ban);
    localStorage.bans = JSON.stringify(bans);
    alert(bans.length);
    alert(localStorage.bans.length);

    displayBans();
}

var addbutton = document.getElementById("addnow");
addbutton.addEventListener("click", addBan);
displayBans();
