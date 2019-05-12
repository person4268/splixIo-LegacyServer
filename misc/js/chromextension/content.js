

console.log("Injected v0");

var intId = setInterval(
    function() {
        if(typeof(getServer) == "function") {
            clearInterval(intId);
            ready();
        }
    }
    , 250
)

function replaceGetServer(ip) {
    var serverObj = getServer();
    serverObj.ip = ip;
    console.log(serverObj);
    getServer = function() {
        console.log("Overridding with ", serverObj);
        return serverObj;
    }
}

function ready() {
    console.log("ready");
    if(localStorage.replaceServer) {
        replaceGetServer("ws://127.0.0.1:8000");
    }
}