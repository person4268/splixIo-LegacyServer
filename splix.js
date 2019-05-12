
const COLORS = {
    GREY: 0,
    RED: 1,
    RED2: 2,
    PINK: 3,
    PINK2: 4,
    PURPLE: 5,
    BLUE: 6,
    BLUE2: 7,
    GREEN: 8,
    GREEN2: 9,
    LEAF: 10,
    YELLOW: 11,
    ORANGE: 12,
    GOLD: 13
}
const sendAction = {
    UPDATE_BLOCKS: 1,
    PLAYER_POS: 2,
    FILL_AREA: 3,
    SET_TRAIL: 4,
    PLAYER_DIE: 5,
    CHUNK_OF_BLOCKS: 6,
    REMOVE_PLAYER: 7,
    PLAYER_NAME: 8,
    MY_SCORE: 9,
    MY_RANK: 10,
    LEADERBOARD: 11,
    MAP_SIZE: 12,
    YOU_DED: 13,
    MINIMAP: 14,
    PLAYER_SKIN: 15,
    EMPTY_TRAIL_WITH_LAST_POS: 16,
    READY: 17,
    PLAYER_HIT_LINE: 18,
    REFRESH_AFTER_DIE: 19,
    PLAYER_HONK: 20,
    PONG: 21,
    UNDO_PLAYER_DIE: 22,
    TEAM_LIFE_COUNT: 23
}
const recieveAction = {
    UPDATE_DIR: 1,
    SET_USERNAME: 2,
    SKIN: 3,
    READY: 4,
    REQUEST_CLOSE: 5,
    HONK: 6,
    PING: 7,
    REQUEST_MY_TRAIL: 8,
    MY_TEAM_URL: 9,
    SET_TEAM_USERNAME: 10,
    VERSION: 11,
    PATREON_CODE: 12
}

const directions = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

var utf8 = require('utf8');
//Adapted from splix for maximum compatibility
function bytesToInt() {
    for (var e = 0, t = 0, n = arguments.length - 1; 0 <= n; n--) {
        e = (e | (255 & arguments[n]) << t >>> 0) >>> 0,
            t += 8
    }
    return e
}

function intToBytes(data, length) {
    for (var n = [], a = 0; a < length; a++) {
        var i = 255 & data;
        data = (data - (n[length - a - 1] = i)) / 256
    }
    return n
}

var players = {};
class Player {
    constructor(id) {
        this.id = id;
        this.version = undefined;
        this.username = undefined;
        this.direction = directions.UP;
        this.position = []; //x, y
        this.trailStart = []; //x, y
    }

    set skin(bufferobj) {
        this._skin = {skin: bufferobj[0], pattern: bufferobj[1]};
        console.log(`Set ${this.username}'s skin to ${getKeyByValue(COLORS, this._skin.skin)} ${this._skin.pattern}`);
    }
    get skin() {
        return this._skin;
    }
    kill() {
        console.log(`Killing ${this.username}`)
        this.send(sendAction.YOU_DED, []);
    }
    send(command, data = []) {
        console.log(`SEND ${getKeyByValue(sendAction, command)} ${data.toString().split(",").join(" ".substr(1, data.length-1))}`); //I spent a lot of space formatting that array
        let cmdBuffer = Buffer.alloc(1, command);
        let dataBuffer = Buffer.from(data);
        let outBuffer = Buffer.concat([cmdBuffer, dataBuffer]);
        this.respondHandle.sendBytes(outBuffer);
    }
}
var lastPlayerId = 0;
function createPlayer(client) {
    players[client] = new Player(lastPlayerId);
    lastPlayerId++;
}


const uticl = require('util');
/**
 * 
 * @param {*} dis 
 * @param {*} message 
 * @param {Client} client 
 */
function splixMsg(dis, message, client) {
    var cmd = getKeyByValue(recieveAction, message.binaryData[0]);
    var binData = message.binaryData;
    var data = binData.slice(1);
    if(!players[client] ) {
        createPlayer(client);
    }
    players[client].respondHandle = dis;
    player = players[client];

    var inspected = util.inspect(data);
    var inspected_cropped = inspected.substring(8, inspected.length-1);
    console.log(`RECV ${cmd} ${inspected_cropped}`);

    switch (cmd) {
        case "VERSION":
            console.log(`Client version is ${bytesToInt(...data)}`);
            break;
        case "PING":
            player.send(sendAction.PONG);
            break;
        case "SET_USERNAME":
            player.username = utf8.decode(String(data));
            player.usernameRaw = data;
            player.id = Buffer.from(intToBytes(0, 2)); //Temporary. All players have an id of 0
            console.log(`Set player name to "${players[client].username}"`);
            break;
        case "SKIN":
            player.skin = data; 
            break;
        case "REQUEST_MY_TRAIL":
            //Respond with where trail started
            setTrail(player, player.trailStart[0], player.trailStart[1]);
            break;
        case "READY":
            var startingVars = getStartingVars(player);
            var startX = startingVars.x;
            var startY = startingVars.y;
            var startDir = startingVars.direction; 
        

            //FILL_AREA
            //Used here to make starting platform. 
            player.send(sendAction.FILL_AREA, [0, 217, 0, 91, 0, 5, 0, 5, 2, 0]);


            //PLAYER_POS
            setPlayerPos(player, startX, startY, startDir); /* Start player at 100, 100 for now */

            //SET_TRAIL
            player.trailStart = [startX, startY];

            player.send(sendAction.PLAYER_NAME, player.usernameRaw);
            player.send(sendAction.PLAYER_SKIN, [0,0,0]);
            player.send(sendAction.MY_SCORE, [0, 0, 0, 25, 0, 0]);
            player.send(sendAction.MAP_SIZE, [2, 88]);
            //player.send(sendAction.LEADERBOARD, [0,40,0,0,147,75,22,69,97,116,32,65,32,67,111,108,111,115,116,111,109,121,32,66,97,103,226,153,191,0,0,39,47,11,82,85,68,79,76,70,32,72,69,83,83,0,0,37,99,4,68,101,114,112,0,0,32,249,13,70,114,111,100,101,32,107,111,109,109,111,100,101,0,0,32,139,4,80,101,112,97,0,0,31,26,6,67,114,97,102,116,121,0,0,29,39,6,84,69,67,72,78,79,0,0,23,151,3,40,111,41,0,0,19,132,12,102,117,99,107,32,109,101,32,33,226,157,164,0,0,19,26,3,48,48,55]);
            player.send(sendAction.READY, []); //Tells the game to start. DONT FORGET OR GAME WILL FREEZE
            break;
        default:
            console.log(`UNHANDLED "${cmd}"`);
    }
}

function setTrail(player, x, y) {
    var fixedX = intToBytes(x, 2);
    var fixedY = intToBytes(y, 2);

    var xBuf = Buffer.from(fixedX);
    var yBuf = Buffer.from(fixedY);

    player.send(sendAction.SET_TRAIL, Buffer.concat([player.id, xBuf, yBuf]));


}

function getStartingVars(player) {
    return {x: 100, y: 100, direction: directions.UP};
}

function setPlayerPos(player, x, y, direction) {
    player.position = [x, y];

    var fixedX = intToBytes(x, 2);
    var fixedY = intToBytes(y, 2);

    //Easiest way to make messages like this are to convert them into buffers then concat them
    var xBuf = Buffer.from(fixedX);
    var yBuf = Buffer.from(fixedY);
    var dirBuf = Buffer.from([direction]);

    player.send(sendAction.PLAYER_POS, Buffer.concat([xBuf, yBuf, player.id, dirBuf]))

}


module.exports = splixMsg;