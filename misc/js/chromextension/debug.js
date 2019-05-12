window.IS_DEV_BUILD = true; //Lets try this because

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
wsmg = wsSendMsg.clone();
wsSendMsg = function(t, n) {
    console.log("SEND ",getKeyByValue(sendAction, t), n);
    wsmg(t, n);
}

oM = onMessage.clone();
onMessage = function(e) {
    var t, n, a, i, o, r, s, l, c, d, m = new Uint8Array(e.data);
    console.log("RECIEVE ", getKeyByValue(receiveAction, m[0]), m.slice(1));
if(m[0] == receiveAction.CHUNK_OF_BLOCKS || m[0] == receiveAction.LEADERBOARD) {
        console.log(m.slice(1).toString());
    }
    oM(e);
}