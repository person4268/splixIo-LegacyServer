var serverIp = "ws://127.0.0.1:8000";
var obj = getServer();
obj.ip = serverIp;
getServer = function() {
    return obj;
};