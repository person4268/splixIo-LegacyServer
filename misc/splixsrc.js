var GLOBAL_SPEED = .006
    , VIEWPORT_RADIUS = 30
    , MAX_ZOOM = 430
    , BLOCKS_ON_SCREEN = 1100
    , WAIT_FOR_DISCONNECTED_MS = 1e3
    , USERNAME_SIZE = 6
    , COMPATIBLE_CLIENT_VERSION = 1
    , CLIENT_VERSION = 28
    , JS_VERSION = 80
    , IS_DEV_BUILD = !1;
!function () {
    for (var e = "x", t = document.getElementsByTagName("script"), n = 0; n < t.length; n++) {
        var a = t[n].src;
        0 < a.indexOf("//splix.io/js/") && (e = a.substring(a.indexOf("splix.io/js/") + 12, a.length - 3))
    }
    e = parseInt(e),
        isNaN(e) ? IS_DEV_BUILD = false : JS_VERSION = e
}();
var MAX_PIXEL_RATIO = function () {
    var e = document.createElement("canvas").getContext("2d");
    return (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1)
}()
    , DeviceTypes = {
        DESKTOP: 0,
        IOS: 1,
        ANDROID: 2
    }
    , deviceType = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? DeviceTypes.IOS : -1 < navigator.userAgent.toLowerCase().indexOf("android") ? DeviceTypes.ANDROID : DeviceTypes.DESKTOP;
testHashForMobile();
var patreonQueryWasFound = checkPatreonQuery();
function redirectQuery() {
    var e = location.href.indexOf("#")
        , t = location.href.indexOf("?");
    if ((0 <= t && (-1 == e || t < e) || isIframe()) && (!patreonQueryWasFound || isIframe())) {
        var n = ["gp", "siteId", "channelId", "siteLocale", "storageId"]
            , a = parseQuery(location.href);
        for (var i in a)
            a.hasOwnProperty(i) && -1 == n.indexOf(i) && delete a[i];
        isIframe() && (a.gp = "1",
            a.siteId = window.location.hostname,
            a.channelId = "1",
            a.siteLocale = "en_EN",
            a.storageId = "72167631167");
        var o = [];
        for (var i in a)
            a.hasOwnProperty(i) && o.push(window.encodeURIComponent(i) + "=" + window.encodeURIComponent(a[i]));
        var r = o.join("&");
        r && (r = "?" + r);
        var s = location.href.split("?")[0] + r;
        s != location.href && (location.href = s)
    }
}
function isIframe() {
    try {
        return window.self !== window.top
    } catch (e) {
        return !0
    }
}
redirectQuery();
//INSANE amount of variables. Fuck minification
var mainCanvas, ctx, minimapCtx, wsOnOpenTime, minimapCanvas, myScoreElem, myKillsElem, myRealScoreElem, myRankElem, totalPlayersElem, leaderboardElem, leaderboardDivElem, miniMapPlayer, playUI, beginScreen, notificationElem, formElem, appLinksElem, nameInput, linesCanvas, linesCtx, tempCanvas, tempCtx, transitionCanvas, tCtx, tutorialCanvas, tutCtx, tutorialBlocks, tutorialPlayers, tutorialText, skinButtonCanvas, skinButtonCtx, skinButtonShadow, shareToUnlock, skinCanvas, skinCtx, skinScreen, skinScreenBlocks, shareTw, shareFb, titCanvas, titCtx, socialElem, honkStartTime, zoom, myColorId, lastStatValueElem, bestStatValueElem, joinButton, teamBox, teamBoxLoading, teamBoxLoaded, teamShareCopyBtn, gamemodeDropDownEl, teamPlayersList, teamNameH, teamNameInput, IS_SECURE = 0 <= location.protocol.indexOf("https"), SECURE_WS = IS_SECURE ? "wss://" : "ws://", SKIN_BLOCK_COUNT = 13, SKIN_PATTERN_COUNT = 28, ws = null, prevTimeStamp = null, blocks = [], players = [], camPos = [0, 0], camPosSet = false, camPosPrevFrame = [0, 0], myNameAlphaTimer = 0, myPos = null, myPlayer = null, changeDirAt = null, changeDirAtIsHorizontal = false, myNextDir = 0, lastChangedDirPos = null, lastClientsideMoves = [], trailPushesDuringRequest = [], isRequestingMyTrail = false, skipTrailRequestResponse = false, mapSize = 2e3, closedBecauseOfDeath = false, beginScreenVisible = true, canvasQuality = 1, currentDtCap = 0, totalDeltaTimeFromCap = 0, deltaTime = 16.66, lerpedDeltaTime = 16.66, missedFrames = [], gainedFrames = [], myRank = 0, myRankSent = false, totalPlayers = 0, leaderboardHidden = "true" == localStorage.leaderboardHidden, lastNameValue = "", lastTeamNameValue = "", lastNameChangeCheck = 0, scoreStatTarget = 25, scoreStat = 25, realScoreStatTarget = 25, realScoreStat = 25, showCouldntConnectAfterTransition = false, playingAndReady = false, canRunAds = false, transitionTimer = 0, transitionPrevTimer = 0, transitionDirection = 1, transitionText = "GAME OVER", isTransitioning = false, transitionCallback1 = null, transitionCallback2 = null, transitionReverseOnHalf = false, tutorialTimer = 0, tutorialPrevTimer = 0, skinButtonBlocks = [], skinScreenVisible = false, titleTimer = -1, resetTitleNextFrame = true, titleLastRender = 0, currentTouches = [], doRefreshAfterDie = false, pressedKeys = [], camPosOffset = [0, 0], camRotOffset = 0, camShakeForces = [], socialOpacity = 0, socialOTarget = 0, socialIsReady = false, socialHovering = false, lastHonkTime = 0, honkSfx = null, skipDeathTransition = false, allowSkipDeathTransition = false, deathTransitionTimeout = null, servers = [], donePing = false, serversRequestDone = false, doConnectAfterServersGet = false, thisServerAvgPing = 0, thisServerDiffPing = 0, thisServerLastPing = 0, lastPingTime = 0, waitingForPing = false, serversJsonGetTime = 0, closeNotification = null, connectionLostNotification = null, lastMyPosSetClientSideTime = 0, lastMyPosServerSideTime = 0, lastMyPosSetValidClientSideTime = 0, lastMyPosHasBeenConfirmed = false, uiElems = [], uglyMode = false, hasReceivedChunkThisGame = false, didSendSecondReady = false, lastStatBlocks = 0, lastStatKills = 0, lastStatLbRank = 0, lastStatAlive = 0, lastStatNo1Time = 0, lastStatDeathType = 0, lastStatKiller = "", bestStatBlocks = 0, bestStatKills = 0, bestStatLbRank = 0, bestStatAlive = 0, bestStatNo1Time = 0, lastStatTimer = 0, lastStatCounter = 0, lastMousePos = [0, 0], mouseHidePos = [0, 0], preventTeamServerConnection = false, didConfirmOpenInApp = false, aiptag = aiptag || {};
aiptag.consented = "true" == localStorage.hasAdsConsent,
    aiptag.cmd = aiptag.cmd || [],
    aiptag.cmd.display = aiptag.cmd.display || [],
    aiptag.cmd.player = aiptag.cmd.player || [];
var bannerAdsUseCurse = true
    , receiveAction = {
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
    , sendAction = {
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
    , teamSendAction = {
        REQUEST_TEAM_ID: 1,
        MY_USERNAME: 2,
        START_GAME: 3,
        PING_DATA: 4,
        SEND_IPS: 5,
        SET_TEAM_USERNAME: 6
    }
    , teamReceiveAction = {
        URL: 1,
        BECOME_HOST: 2,
        ADD_PLAYER: 3,
        REMOVE_PLAYER: 4,
        REQUEST_IPS: 5,
        GAME_START: 6,
        TEAM_IS_FULL: 7,
        SET_TEAM_USERNAME: 8
    }
    , colors = {
        grey: {
            BG: "#3a342f",
            brighter: "#4e463f",
            darker: "#2d2926",
            diagonalLines: "#c7c7c7"
        },
        red: {
            brighter: "#a22929",
            darker: "#7b1e1e",
            slightlyBrighter: "#af2c2c",
            pattern: "#8c2222",
            patternEdge: "#631717",
            boundsDark: "#420707",
            boundsBright: "#4c0808"
        },
        red2: {
            brighter: "#E3295E",
            darker: "#B3224B",
            slightlyBrighter: "#F02B63",
            pattern: "#CC2554",
            patternEdge: "#9C1C40"
        },
        pink: {
            brighter: "#A22974",
            darker: "#7A1F57",
            pattern: "#8A2262",
            patternEdge: "#5E1743",
            slightlyBrighter: "#B02C7E"
        },
        pink2: {
            brighter: "#7D26EF",
            darker: "#5E1DBA",
            pattern: "#6A21D1",
            patternEdge: "#4C1896",
            slightlyBrighter: "#882DFF"
        },
        purple: {
            brighter: "#531880",
            darker: "#391058",
            pattern: "#4b1573",
            patternEdge: "#3b115a",
            slightlyBrighter: "#5a198c"
        },
        blue: {
            brighter: "#27409c",
            darker: "#1d3179",
            pattern: "#213786",
            patternEdge: "#1b2b67",
            slightlyBrighter: "#2a44a9"
        },
        blue2: {
            brighter: "#3873E0",
            darker: "#2754A3",
            pattern: "#2F64BF",
            patternEdge: "#1F4587",
            slightlyBrighter: "#3B79ED"
        },
        green: {
            brighter: "#2ACC38",
            darker: "#1C9626",
            pattern: "#24AF30",
            patternEdge: "#178220",
            slightlyBrighter: "#2FD63D"
        },
        green2: {
            brighter: "#1e7d29",
            darker: "#18561f",
            pattern: "#1a6d24",
            patternEdge: "#14541c",
            slightlyBrighter: "#21882c"
        },
        leaf: {
            brighter: "#6a792c",
            darker: "#576325",
            pattern: "#5A6625",
            patternEdge: "#454F1C",
            slightlyBrighter: "#738430"
        },
        yellow: {
            brighter: "#d2b732",
            darker: "#af992b",
            pattern: "#D1A932",
            patternEdge: "#B5922B",
            slightlyBrighter: "#e6c938"
        },
        orange: {
            brighter: "#d06c18",
            darker: "#ab5a15",
            pattern: "#AF5B16",
            patternEdge: "#914A0F",
            slightlyBrighter: "#da7119"
        },
        gold: {
            brighter: "#F6B62C",
            darker: "#F7981B",
            pattern: "#DC821E",
            patternEdge: "#BD6B0E",
            slightlyBrighter: "#FBDF78",
            bevelBright: "#F9D485"
        }
    }
    , titleLines = [{
        line: [[86, 82], [50, 57, 25, 99, 65, 105], [110, 110, 80, 158, 42, 129]],
        speed: 1,
        offset: 0,
        posOffset: [16, 0]
    }, {
        line: [[129, 74], [129, 169]],
        speed: 1,
        offset: .7,
        posOffset: [10, 0]
    }, {
        line: [[129, 106], [129, 63, 191, 63, 191, 106], [191, 149, 129, 149, 129, 106]],
        speed: 1,
        offset: 1.2,
        posOffset: [10, 0]
    }, {
        line: [[236, 41], [236, 138]],
        speed: 2,
        offset: .7,
        posOffset: [0, 0]
    }, {
        line: [[276, 41], [276, 45]],
        speed: 3,
        offset: .4,
        posOffset: [0, 0]
    }, {
        line: [[276, 74], [276, 138]],
        speed: 2,
        offset: 0,
        posOffset: [0, 0]
    }, {
        line: [[318, 74], [366, 138]],
        speed: 2,
        offset: .5,
        posOffset: [-5, 0]
    }, {
        line: [[318, 138], [366, 74]],
        speed: 4,
        offset: 0,
        posOffset: [-5, 0]
    }, {
        line: [[415, 136], [415, 134, 419, 134, 419, 136], [419, 138, 415, 138, 415, 136]],
        speed: 1,
        offset: 0,
        posOffset: [-25, 0]
    }, {
        line: [[454, 41], [454, 45]],
        speed: 3,
        offset: .8,
        posOffset: [-25, 0]
    }, {
        line: [[454, 74], [454, 138]],
        speed: 2,
        offset: .5,
        posOffset: [-25, 0]
    }, {
        line: [[500, 106], [500, 63, 562, 63, 562, 106], [562, 149, 500, 149, 500, 106]],
        speed: 1,
        offset: .2,
        posOffset: [-38, 0]
    }];
function addSocketWrapper() {
    if ("undefined" != typeof WebSocket) {
        var a = parseInt(localStorage.simulatedLatency) / 2;
        if (0 < a) {
            var i = WebSocket;
            WrappedWebSocket = function (e) {
                var t = new i(e);
                t.binaryType = "arraybuffer",
                    this.onclose = function () { }
                    ,
                    this.onopen = function () { }
                    ,
                    this.onmessage = function () { }
                    ;
                var n = this;
                t.onclose = function () {
                    window.setTimeout(function () {
                        n.onclose()
                    }, a)
                }
                    ,
                    t.onopen = function () {
                        window.setTimeout(function () {
                            n.onopen()
                        }, a)
                    }
                    ,
                    t.onmessage = function (e) {
                        window.setTimeout(function () {
                            n.onmessage(e)
                        }, a)
                    }
                    ,
                    this.send = function (e) {
                        window.setTimeout(function () {
                            t.send(e)
                        }, a)
                    }
                    ,
                    this.close = function () {
                        window.setTimeout(function () {
                            t.close()
                        }, a)
                    }
            }
                ,
                window.WebSocket = WrappedWebSocket.bind()
        }
    }
}
function simpleRequest(e, t) {
    var n = new XMLHttpRequest;
    n.onreadystatechange = function () {
        n.readyState == XMLHttpRequest.DONE && 200 == n.status && null != t && t(n.responseText)
    }
        ,
        n.open("GET", e, !0),
        n.send()
}
function trackGameStart() { }
function countPlayGame() {
    var e = 0;
    null !== localStorage.getItem("totalGamesPlayed") && (e = localStorage.totalGamesPlayed),
        lsSet("totalGamesPlayed", ++e)
}
function getServers() {
    simpleRequest("/json/servers.2.json", function (e) {
        serversJsonGetTime = Date.now();
        var t = JSON.parse(e)
            , n = t.locations;
        for (var a in servers = [],
            n) {
            var i = generateServerLocation(n[a]);
            servers.push(i),
                serversRequestDone = !0
        }
        teamServers = t.teamServers;
        for (var o = 0; o < teamServers.length; o++)
            teamServers[o].active && activeTeamServers.push(teamServers[o]);
        retentionSamples = t.retentionSamples,
            doConnectAfterServersGet && (doConnectAfterServersGet = false,
                doConnect()),
            teamDoConnectAfterServersGet && (teamDoConnectAfterServersGet = false,
                teamDoConnect());
        var r = t.mobileAdData.promoBannerUrl;
        if (window.location.hash.startsWith("#forcepromo=") && (r = window.location.hash.substr(12)),
            (testPatreonAdsAllowed() || t.mobileAdData.showPromoForPatreonUsers) && r) {
            var s = document.getElementById("promoboxFrame");
            s.onload = function () {
                window.addEventListener("message", function (e) {
                    e.data.promoHeight && (console.log("get promoHeight", e.data.promoHeight),
                        document.getElementById("promobox").style.opacity = 1,
                        s.height = Math.min(300, e.data.promoHeight))
                }),
                    s.contentWindow.postMessage("requestHeight", "*")
            }
                ,
                s.src = r
        }
    })
}
function generateServerLocation(e) {
    var t = IS_SECURE ? "7998" : "7999";
    return {
        pingUrlV4: e.pingIpv4 + ":" + t + "/ping-" + e.loc,
        pingUrlV6: e.pingIpv6 + ":" + t + "/ping6-" + e.loc,
        gamemodes: e.gamemodes,
        loc: e.loc,
        locId: e.locId,
        ws: null,
        ws6: null,
        pingTries: 0,
        pingTries6: 0,
        avgPing: 0,
        avgPing6: 0,
        open: false,
        open6: false,
        initSocket: function () {
            this.connectionTries++ ,
                this.lastConnectionTry = Date.now(),
                null !== this.ws && (this.ws.onmessage = null,
                    this.ws.onopen = null,
                    this.ws.onclose = null,
                    this.ws.close(),
                    this.pingTries = 0,
                    this.avgPing = 0,
                    this.lastPingTime = 0,
                    this.waitingForPing = !1),
                this.ws = new WebSocket(SECURE_WS + this.pingUrlV4),
                this.ws.binaryType = "arraybuffer";
            var t = this;
            this.ws.onmessage = function () {
                if (t.waitingForPing) {
                    var e = Date.now() - t.lastPingTime;
                    e += 10,
                        t.avgPing = t.avgPing * t.pingTries + e,
                        t.pingTries++ ,
                        t.avgPing /= t.pingTries,
                        t.lastPingTime = Date.now(),
                        t.waitingForPing = false,
                        4 <= t.pingTries && (t.open = false,
                            t.ws.close())
                }
            }
                ,
                this.ws.onopen = function () {
                    t.open = true,
                        t.connectedOnce = !0
                }
                ,
                this.ws.onclose = function () {
                    t.open = !1
                }
        },
        initSocket6: function () {
            this.connectionTries6++ ,
                this.lastConnectionTry6 = Date.now(),
                null !== this.ws6 && (this.ws6.onmessage = null,
                    this.ws6.onopen = null,
                    this.ws6.onclose = null,
                    this.ws6.close(),
                    this.pingTries6 = 0,
                    this.avgPing6 = 0,
                    this.lastPingTime6 = 0,
                    this.waitingForPing6 = !1),
                this.ws6 = new WebSocket(SECURE_WS + this.pingUrlV6),
                this.ws6.binaryType = "arraybuffer";
            var t = this;
            this.ws6.onmessage = function () {
                if (t.waitingForPing6) {
                    var e = Date.now() - t.lastPingTime6;
                    t.avgPing6 = t.avgPing6 * t.pingTries6 + e,
                        t.pingTries6++ ,
                        t.avgPing6 /= t.pingTries6,
                        t.lastPingTime6 = Date.now(),
                        t.waitingForPing6 = false,
                        4 <= t.pingTries6 && (t.open6 = false,
                            t.ws6.close())
                }
            }
                ,
                this.ws6.onopen = function () {
                    t.open6 = true,
                        t.connectedOnce6 = !0
                }
                ,
                this.ws6.onclose = function () {
                    t.open6 = !1
                }
        },
        lastPingTime: 0,
        lastPingTime6: 0,
        waitingForPing: false,
        waitingForPing6: false,
        ping: function () {
            if (!this.waitingForPing)
                return this.open && this.ws && this.ws.readyState == WebSocket.OPEN ? (this.waitingForPing = true,
                    this.lastPingTime = Date.now(),
                    this.ws.send(new Uint8Array([0])),
                    4 <= this.pingTries) : this.testSuccessfulConnection();
            1e4 < Date.now() - this.lastPingTime && this.initSocket()
        },
        ping6: function () {
            if (!this.waitingForPing6)
                return this.open6 && this.ws6 && this.ws6.readyState == WebSocket.OPEN ? (this.waitingForPing6 = true,
                    this.lastPingTime6 = Date.now(),
                    this.ws6.send(new Uint8Array([0])),
                    4 <= this.pingTries6) : this.testSuccessfulConnection();
            1e4 < Date.now() - this.lastPingTime6 && this.initSocket6()
        },
        connectedOnce: false,
        connectedOnce6: false,
        connectionTries: 0,
        connectionTries6: 0,
        lastConnectionTry: Date.now(),
        lastConnectionTry6: Date.now(),
        testSuccessfulConnection: function () {
            return !(!this.connectedOnce && !this.connectedOnce6) || (3 < this.connectionTries || (Date.now() - this.lastConnectionTry < 5e3 || this.initSocket(),
                !1))
        },
        testSuccessfulConnection6: function () {
            return !(!this.connectedOnce && !this.connectedOnce6) || (3 < this.connectionTries6 || (Date.now() - this.lastConnectionTry6 < 5e3 || this.initSocket6(),
                !1))
        }
    }
}
function startPingServers() {
    for (var e = 0; e < servers.length; e++) {
        var t = servers[e];
        t.initSocket(),
            t.initSocket6()
    }
}
function pingServers() {
    if (donePing = true,
        0 < servers.length)
        for (var e = 0; e < servers.length; e++) {
            var t = servers[e];
            t.ping() || (donePing = !1),
                t.ping6() || (donePing = !1)
        }
    else
        donePing = !1;
    donePing && "Teams" == selectedGamemode && teamSendPingData()
}
function getServer(e, t) {
    var n, a, i, o, r, s;
    console.log("searching for best server"),
        void 0 === e && (e = -1),
        void 0 === t && (t = !0);
    var l = null
        , c = null;
    if (t && location.hash) {
        if (0 === location.hash.indexOf("#ip-"))
            return console.log("ip provided in url, using " + location.hash),
                {
                    ip: SECURE_WS + location.hash.substring(4),
                    ping: 30
                };
        if (0 === location.hash.indexOf("#team-") && "Teams" == selectedGamemode) {
            if (testExistingTeamHash())
                return console.log("disconnect from previous teams session was unexpected, using the ip from the old teams session"),
                    {
                        ip: SECURE_WS + localStorage.lastTeamIp + "/splix",
                        ping: 30
                    }
        } else {
            if (servers.length <= 0)
                return console.log("servers length <= 0, unable to connect (1)"),
                    null;
            var d = selectedGamemode.toLowerCase();
            "normal" == d && (d = "default");
            for (var m = 0; m < servers.length; m++) {
                var u = servers[m];
                for (i = 0; i < u.gamemodes.length; i++)
                    if ((r = u.gamemodes[i]).gm == d)
                        for (o = 0; o < r.versions.length; o++)
                            if ((s = r.versions[o]).ver == COMPATIBLE_CLIENT_VERSION)
                                for (var p = s.lobbies, h = 0; h < p.length; h++)
                                    if ((a = p[h]).hash == location.hash.substring(1)) {
                                        l = a,
                                            c = u;
                                        break
                                    }
            }
        }
    }
    if (null === l) {
        c = null;
        var g = 1 / 0;
        if (servers.length <= 0)
            return console.log("servers length <= 0, unable to connect (2)"),
                null;
        for (console.log("determining what the best location is"),
            i = 0; i < servers.length; i++) {
            if (n = servers[i],
                0 <= e && n.locId == e) {
                c = n;
                break
            }
            n.avgPing < g && 0 < n.pingTries && (g = n.avgPing,
                c = n),
                n.avgPing6 < g && 0 < n.pingTries6 && (g = n.avgPing6,
                    c = n)
        }
        null === c && (console.log("Couldn't determine best location, picking a random one"),
            c = randFromArray(servers)),
            console.log("found location is " + c.loc);
        var f = null;
        console.log("searching for lobby group in this location with version " + COMPATIBLE_CLIENT_VERSION + " and gamemode " + selectedGamemode);
        var v = {
            Normal: "default",
            Teams: "teams"
        };
        for (i = 0; i < c.gamemodes.length; i++)
            if ((r = c.gamemodes[i]).gm == v[selectedGamemode])
                for (console.log("found gamemode", r.gm),
                    o = 0; o < r.versions.length; o++)
                    if ((s = r.versions[o]).ver == COMPATIBLE_CLIENT_VERSION) {
                        f = s.lobbies;
                        break
                    }
        if (null === f || f.length <= 0)
            return console.log(f),
                console.log("lobbiesGroup not found or lobbiesGroup.length <= 0, couldn't find server"),
                null;
        l = randFromArray(f),
            console.log("a lobby was found:", l)
    }
    var T, y, S = location.href;
    t && (location.hash || S.lastIndexOf("#") == S.length - 1) && (location.hash = l.hash),
        0 < c.pingTries6 && (c.avgPing6 < c.avgPing || c.pingTries <= 0) ? (T = l.ipv6,
            y = c.avgPing6) : (T = l.ipv4,
                y = c.avgPing);
    var C = IS_SECURE ? l.securePort : l.port;
    return {
        ip: SECURE_WS + T + ":" + C + "/splix",
        ip4: l.ipv4 + ":" + C,
        ip6: l.ipv6 + ":" + C,
        ping: y,
        locId: c.locId
    }
}
function getBlock(e, t, n) {
    var a;
    void 0 === n && (n = blocks);
    for (var i = 0; i < n.length; i++)
        if ((a = n[i]).x == e && a.y == t)
            return a;
    return a = {
        x: e,
        y: t,
        currentBlock: -1,
        nextBlock: -1,
        animDirection: 0,
        animProgress: 0,
        animDelay: 0,
        lastSetTime: Date.now(),
        setBlockId: function (state, t) { //Sets block to state e
            if (this.lastSetTime = Date.now(),
                true === t)
                this.currentBlock = this.nextBlock = state,
                    this.animDirection = 0,
                    this.animProgress = 1;
            else { //Just some animation crap
                void 0 === t && (t = 0),
                    this.animDelay = t;
                var n = state == this.currentBlock
                    , a = state == this.nextBlock;
                n && a && -1 == this.animDirection && (this.animDirection = 1),
                    n && !a && (this.animDirection = 1,
                        this.nextBlock = this.currentBlock),
                    !n && a && 1 == this.animDirection && (this.animDirection = -1),
                    n || a || (this.nextBlock = state,
                        this.animDirection = -1)
            }
        }
    },
        n.push(a),
        a
}
function getPlayer(e, t) {
    var n;
    void 0 === t && (t = players);
    for (var a = 0; a < t.length; a++)
        if ((n = t[a]).id == e)
            return n;
    return n = {
        id: e,
        pos: [0, 0],
        drawPos: [-1, -1],
        drawPosSet: false,
        serverPos: [0, 0],
        dir: 0,
        isMyPlayer: 0 === e,
        isDead: false,
        deathWasCertain: false,
        didUncertainDeathLastTick: false,
        isDeadTimer: 0,
        uncertainDeathPosition: [0, 0],
        die: function (e) {
            if (e = !!e,
                this.isDead)
                this.deathWasCertain = e || this.deathWasCertain;
            else if (e || !this.didUncertainDeathLastTick) {
                e || (this.didUncertainDeathLastTick = true,
                    this.uncertainDeathPosition = [this.pos[0], this.pos[1]]),
                    this.isDead = true,
                    this.deathWasCertain = e,
                    this.deadAnimParts = [0],
                    this.isDeadTimer = 0,
                    this.isMyPlayer && doCamShakeDir(this.dir);
                for (var t = 0; ;) {
                    if ((t += .4 * Math.random() + .5) >= 2 * Math.PI) {
                        this.deadAnimParts.push(2 * Math.PI);
                        break
                    }
                    this.deadAnimParts.push(t),
                        this.deadAnimPartsRandDist.push(Math.random())
                }
            }
        },
        undoDie: function () {
            this.isDead = !1
        },
        deadAnimParts: [],
        deadAnimPartsRandDist: [],
        addHitLine: function (e, t) {
            this.hitLines.push({
                pos: e,
                vanishTimer: 0,
                color: t
            })
        },
        hitLines: [],
        doHonk: function (e) {
            this.honkTimer = 0,
                this.honkMaxTime = e,
                "joris" == this.name.toLowerCase() && (null == honkSfx && (honkSfx = new Audio("/honk.mp3")),
                    honkSfx.play())
        },
        moveRelativeToServerPosNextFrame: false,
        lastServerPosSentTime: 0,
        honkTimer: 0,
        honkMaxTime: 0,
        trails: [],
        name: "",
        skinBlock: 0,
        lastBlock: null,
        hasReceivedPosition: !1
    },
        t.push(n),
        n.isMyPlayer && (myPlayer = n),
        n
}
function lsSet(e, t) {
    try {
        return localStorage.setItem(e, t),
            !0
    } catch (e) {
        return !1
    }
}
function checkUsername(e) {
    var t = e.toLowerCase();
    if ("denniskoe" == t) {
        var n = document.body.style;
        n.webkitFilter = n.filter = "contrast(200%) hue-rotate(90deg) invert(100%)"
    } else
        "kwebbelkop" == t ? (lsSet("skinColor", 12),
            lsSet("skinPattern", 18),
            updateSkin()) : "jelly" == t ? (lsSet("skinColor", 8),
                lsSet("skinPattern", 19),
                updateSkin()) : -1 < t.indexOf("masterov") || 0 === t.indexOf("[mg]") || 0 === t.indexOf("(mg)") ? (lsSet("skinColor", 12),
                    lsSet("skinPattern", 20),
                    updateSkin()) : "farsattack" == t ? (lsSet("skinColor", 8),
                        lsSet("skinPattern", 21),
                        updateSkin()) : 0 === t.indexOf("[am]") || 0 === t.indexOf("(am)") ? (lsSet("skinColor", 11),
                            lsSet("skinPattern", 23),
                            updateSkin()) : "hetgames" == t ? (lsSet("skinColor", 1),
                                lsSet("skinPattern", 24),
                                updateSkin()) : 0 === t.indexOf("[gym]") || 0 === t.indexOf("(gym)") ? (lsSet("skinColor", 4),
                                    lsSet("skinPattern", 25),
                                    updateSkin()) : "luh" == t && (lsSet("skinColor", 12),
                                        lsSet("skinPattern", 26),
                                        updateSkin())
}
function sendName() {
    var e = nameInput.value;
    null != e && "" !== e && "" !== e.trim() && wsSendMsg(sendAction.SET_USERNAME, e)
}
function nameInputOnChange() {
    lsSet("name", nameInput.value),
        teamSendPlayerName()
}
function sendTeamName() {
    if ("Teams" == selectedGamemode && teamBeginUIIsHost) {
        var e = teamNameInput.value;
        null != e && "" !== e && "" !== e.trim() && wsSendMsg(sendAction.SET_TEAM_USERNAME, e)
    }
}
function sendVersion() {
    wsSendMsg(sendAction.VERSION, {
        type: 0,
        ver: CLIENT_VERSION
    })
}
function sendSkin() {
    var skinColor = localStorage.getItem("skinColor");
    if(skinColor == null) skinColor = 0;
    var skinPattern = localStorage.getItem("skinPattern");
    if(skinPattern == null) skinPattern = 0;
    wsSendMsg(sendAction.SKIN, {
        blockColor: skinColor,
        pattern: skinPattern
    });
}
function sendTeamUrl() {
    "Teams" == selectedGamemode && wsSendMsg(sendAction.MY_TEAM_URL, teamShareUrl)
}
function sendPatreonCode() {
    "" !== localStorage.patreonLastSplixCode && void 0 !== localStorage.patreonLastSplixCode && wsSendMsg(sendAction.PATREON_CODE, localStorage.patreonLastSplixCode)
}
function parseDirKey(e) {
    var t = !1;
    return 38 != e && 87 != e && 56 != e && 73 != e || (sendDir(3),
        t = !0),
        37 != e && 65 != e && 52 != e && 74 != e || (sendDir(2),
            t = !0),
        39 != e && 68 != e && 54 != e && 76 != e || (sendDir(0),
            t = !0),
        40 != e && 83 != e && 50 != e && 75 != e || (sendDir(1),
            t = !0),
        80 == e && (sendDir(4),
            t = !0),
        32 != e && 53 != e || (honkStart(),
            t = !0),
        13 == e && (doSkipDeathTransition(),
            t = !0),
        t
}
addSocketWrapper(),
    getServers();
var lastSendDir = -1
    , lastSendDirTime = 0;
function sendDir(e, t) {
    if (!ws || !myPos)
        return !1;
    if (!myPlayer)
        return !1;
    if (e == lastSendDir && Date.now() - lastSendDirTime < .7 / GLOBAL_SPEED)
        return !1;
    if (lastSendDir = e,
        lastSendDirTime = Date.now(),
        myPlayer.dir == e)
        return addSendDirQueue(e, t),
            !1;
    if (0 === e && 2 == myPlayer.dir || 2 == e && 0 === myPlayer.dir || 1 == e && 3 == myPlayer.dir || 3 == e && 1 == myPlayer.dir)
        return addSendDirQueue(e, t),
            !1;
    mouseHidePos = [lastMousePos[0], lastMousePos[1]],
        document.body.style.cursor = "none";
    var n = 1 == myPlayer.dir || 3 == myPlayer.dir
        , a = myPos[n ? 1 : 0]
        , i = [myPos[0], myPos[1]]
        , o = Math.round(a);
    if (i[n ? 1 : 0] = o,
        0 === myPlayer.dir && i[0] <= lastChangedDirPos[0] || 1 == myPlayer.dir && i[1] <= lastChangedDirPos[1] || 2 == myPlayer.dir && i[0] >= lastChangedDirPos[0] || 3 == myPlayer.dir && i[1] >= lastChangedDirPos[1])
        return addSendDirQueue(e, t),
            !1;
    var r = !1
        , s = a - Math.floor(a);
    return myPlayer.dir <= 1 ? s < .45 && (r = !0) : myPlayer.dir <= 3 ? .55 < s && (r = !0) : r = true,
        r ? changeMyDir(e, i) : (myNextDir = e,
            changeDirAt = o,
            changeDirAtIsHorizontal = n,
            lastChangedDirPos = [i[0], i[1]]),
        lastMyPosSetClientSideTime = Date.now(),
        lastMyPosHasBeenConfirmed && (lastMyPosSetValidClientSideTime = Date.now()),
        lastMyPosHasBeenConfirmed = false,
        wsSendMsg(sendAction.UPDATE_DIR, {
            dir: e,
            coord: i
        }),
        !0
}
var sendDirQueue = [];
function addSendDirQueue(e, t) {
    !t && sendDirQueue.length < 3 && sendDirQueue.push({
        dir: e,
        addTime: Date.now()
    })
}
function changeMyDir(e, t, n, a) {
    myPlayer.dir = myNextDir = e,
        myPlayer.pos = [t[0], t[1]],
        lastChangedDirPos = [t[0], t[1]],
        void 0 === n && (n = !0),
        void 0 === a && (a = !0),
        n && trailPush(myPlayer),
        a && lastClientsideMoves.push({
            dir: e,
            pos: t
        })
}
function startRequestMyTrail() {
    isRequestingMyTrail = true,
        trailPushesDuringRequest = [],
        wsSendMsg(sendAction.REQUEST_MY_TRAIL)
}
function trailPush(e, t) {
    if (0 < e.trails.length) {
        var n = e.trails[e.trails.length - 1].trail;
        if (0 < n.length) {
            var a = n[n.length - 1];
            a[0] == e.pos[0] && a[1] == e.pos[1] || (t = void 0 === t ? [e.pos[0], e.pos[1]] : [t[0], t[1]],
                n.push(t),
                e.isMyPlayer && isRequestingMyTrail && trailPushesDuringRequest.push(t))
        }
    }
}
function honkStart() {
    honkStartTime = Date.now()
}
function honkEnd() {
    var e = Date.now();
    if (lastHonkTime < e) {
        var t = e - honkStartTime;
        t = clamp(t, 0, 1e3),
            lastHonkTime = e + t,
            t = iLerp(0, 1e3, t),
            t *= 255,
            t = Math.floor(t),
            wsSendMsg(sendAction.HONK, t);
        for (var n = 0; n < players.length; n++) {
            var a = players[n];
            a.isMyPlayer && a.doHonk(Math.max(70, t))
        }
    }
}
function onOpen() {
    isConnecting = false,
        sendVersion(),
        sendPatreonCode(),
        sendName(),
        sendSkin(),
        sendTeamUrl(),
        sendTeamName(),
        wsSendMsg(sendAction.READY),
        playingAndReady && onConnectOrMiddleOfTransition(),
        trackGameStart(),
        countPlayGame(),
        wsOnOpenTime = Date.now()
}
function onConnectOrMiddleOfTransition() {
    hideSkinScreen(),
        hideBeginShowMain(),
        destroyBanners(),
        skipChangeToNormalOnce = true,
        teamWsClose()
}
function hideBeginShowMain() {
    hideBegin(),
        showMainCanvas()
}
function hideBegin() {
    beginScreen.style.display = "none",
        beginScreenVisible = !1
}
function showMainCanvas() {
    playUI.style.display = null,
        mainCanvas.style.display = null,
        "ontouchstart" in window && (touchControlsElem.style.display = null),
        myNameAlphaTimer = 0,
        setNotification("")
}
function setNotification(e) {
    notificationElem.innerHTML = e,
        notificationElem.style.display = e ? null : "none"
}
function showBegin() {
    beginScreen.style.display = null,
        beginScreenVisible = true,
        nameInput.focus(),
        setAdBoxLeft()
}
function hideMainCanvas() {
    playUI.style.display = "none",
        mainCanvas.style.display = "none",
        touchControlsElem.style.display = "none"
}
function showSkinScreen() {
    skinScreenVisible = true,
        skinScreen.style.display = null
}
function hideSkinScreen() {
    skinScreenVisible = false,
        skinScreen.style.display = "none"
}
function openSkinScreen() {
    hideBegin(),
        showSkinScreen()
}
function showBeginHideMainCanvas() {
    showBegin(),
        hideMainCanvas()
}
function showBeginHideSkin() {
    showBegin(),
        hideSkinScreen()
}
function onClose() {
    ws && ws.readyState == WebSocket.OPEN && ws.close(),
        playingAndReady ? closedBecauseOfDeath || (doTransition("", false, resetAll),
            setNotification("The connection was lost :/")) : isTransitioning ? showCouldntConnectAfterTransition = false : couldntConnect() && showBeginHideMainCanvas(),
        ws = null,
        isConnecting = false,
        "Teams" != selectedGamemode || testTeamWsConnection() || teamDoConnect()
}
function couldntConnect() {
    var e = Date.now() - serversJsonGetTime;
    if (resetAll(),
        5 < (e /= 1e3))
        return doConnectAfterServersGet = true,
            console.log("requesting server list again"),
            getServers(),
            !1;
    setNotification("Couldn't connect to the server :/");
    var t = new Error("couldntConnectError");
    return console.log(t.stack),
        isTransitioning = !0
}
var isConnectingWithTransition = !(window.onload = function () {
    mainCanvas = document.getElementById("mainCanvas"),
        ctx = mainCanvas.getContext("2d"),
        minimapCanvas = document.getElementById("minimapCanvas"),
        minimapCtx = minimapCanvas.getContext("2d"),
        linesCanvas = document.createElement("canvas"),
        linesCtx = linesCanvas.getContext("2d"),
        tempCanvas = document.createElement("canvas"),
        tempCtx = tempCanvas.getContext("2d"),
        transitionCanvas = document.getElementById("transitionCanvas"),
        tCtx = transitionCanvas.getContext("2d"),
        tutorialCanvas = document.getElementById("tutorialCanvas"),
        tutCtx = tutorialCanvas.getContext("2d"),
        tutorialText = document.getElementById("tutorialText"),
        touchControlsElem = document.getElementById("touchControls"),
        notificationElem = document.getElementById("notification"),
        skinScreen = document.getElementById("skinScreen"),
        skinCanvas = document.getElementById("skinScreenCanvas"),
        skinCtx = skinCanvas.getContext("2d"),
        lastStatValueElem = document.getElementById("lastStatsRight"),
        bestStatValueElem = document.getElementById("bestStatsRight"),
        joinButton = document.getElementById("joinButton"),
        teamBox = document.getElementById("teamBox"),
        teamBoxLoading = document.getElementById("teamBoxLoading"),
        teamBoxLoaded = document.getElementById("teamBoxLoaded"),
        teamShareLink = document.getElementById("teamShareLink"),
        teamShareCopyBtn = document.getElementById("teamShareCopyBtn"),
        qualityText = document.getElementById("qualityText"),
        uglyText = document.getElementById("uglyText"),
        teamPlayersList = document.getElementById("teamPlayersList"),
        teamNameH = document.getElementById("teamNameH"),
        teamNameInput = document.getElementById("teamNameInput"),
        lifeBox = document.getElementById("lifeBox"),
        adBox = document.getElementById("adbox"),
        adBox2 = document.getElementById("adbox2"),
        window.onkeydown = function (e) {
            var t = e.keyCode;
            if (pressedKeys.indexOf(t) < 0) {
                pressedKeys.push(t);
                var n = parseDirKey(t);
                79 == t && myPos && (leaderboardHidden = !leaderboardHidden,
                    setLeaderboardVisibility(),
                    lsSet("leaderboardHidden", leaderboardHidden)),
                    n && playingAndReady && e.preventDefault()
            }
        }
        ,
        window.onkeyup = function (e) {
            var t = e.keyCode
                , n = pressedKeys.indexOf(t);
            pressedKeys.splice(n, 1),
                32 != t && 53 != t || honkEnd();
            for (var a = 0; a < pressedKeys.length; a++)
                parseDirKey(pressedKeys[a])
        }
        ,
        window.addEventListener("blur", function (e) {
            pressedKeys = []
        }, !1),
        bindSwipeEvents(),
        window.oncontextmenu = function (e) {
            return "embed" == e.target.nodeName.toLowerCase() || (e.preventDefault(),
                !1)
        }
        ,
        myScoreElem = document.getElementById("blockCaptureCount"),
        myRealScoreElem = document.getElementById("score"),
        myKillsElem = document.getElementById("myKills"),
        myRankElem = document.getElementById("myRank"),
        totalPlayersElem = document.getElementById("totalPlayers"),
        leaderboardElem = document.createElement("tbody");
    var e = document.createElement("table");
    if (e.appendChild(leaderboardElem),
        (leaderboardDivElem = document.getElementById("leaderboard")).appendChild(e),
        uiElems.push(leaderboardDivElem),
        miniMapPlayer = document.getElementById("miniMapPlayer"),
        beginScreen = document.getElementById("beginScreen"),
        playUI = document.getElementById("playUI"),
        uiElems.push(document.getElementById("scoreBlock")),
        uiElems.push(document.getElementById("miniMap")),
        prerollElem = document.getElementById("preroll"),
        (appLinksElem = document.getElementById("appLinks")).style.opacity = 0,
        nameInput = document.getElementById("nameInput"),
        localStorage.name && (nameInput.value = localStorage.name),
        localStorage.teamName && (teamNameInput.value = localStorage.teamName),
        nameInput.focus(),
        localStorage.autoConnect && doConnect(),
        (formElem = document.getElementById("nameForm")).onsubmit = function () {
            if ("Teams" == selectedGamemode)
                teamWsSendMsg(teamSendAction.START_GAME);
            else
                try {
                    connectWithTransition()
                } catch (e) {
                    console.log("Error", e.stack),
                        console.log("Error", e.name),
                        console.log("Error", e.message),
                        setNotification("An error occurred :/")
                }
            return !1
        }
        ,
        window.addEventListener("click", showCursor),
        window.addEventListener("mousemove", function (e) {
            var t = (lastMousePos = [e.screenX, e.screenY])[0] - mouseHidePos[0]
                , n = lastMousePos[1] - mouseHidePos[1];
            15 < Math.sqrt(Math.pow(t, 2) + Math.pow(n, 2)) && showCursor()
        }),
        qualityText.onclick = toggleQuality,
        uglyText.onclick = toggleUglyMode,
        setQuality(),
        setUglyText(),
        initTutorial(),
        initSkinScreen(),
        initTitle(),
        initGameModeUI(),
        setLeaderboardVisibility(),
        0 === location.hash.indexOf("#pledged")) {
        var t = parseQuery(location.href);
        "action" in t && -1 == ["update", "create"].indexOf(t.action) || setPatreonOverlay(!0)
    }
    if (requestPatreonPledgeData(),
        localStorage.refreshDuringAd && (initVideoAdsScript(),
            requestCanRunAds()),
        testPatreonAdsAllowed())
        if (setUpAdBoxContent(),
            bannerAdsUseCurse) {
            var n = document.createElement("script")
                , a = new Date;
            n.id = "factorem",
                n.src = "//cdm.cursecdn.com/js/splix/cdmfactorem_min.js?sec=home&misc=" + a.getTime(),
                n.type = "text/javascript",
                document.head.appendChild(n)
        } else {
            (n = document.createElement("script")).src = "//api.adinplay.com/libs/aiptag/pub/JTE/splix.io/tag.min.js",
                n.type = "text/javascript",
                document.head.appendChild(n),
                refreshBanner()
        }
    (socialElem = document.getElementById("social")).addEventListener("mouseenter", function () {
        socialHovering = true,
            testSocialTarget()
    }),
        socialElem.addEventListener("mouseleave", function () {
            socialHovering = false,
                testSocialTarget()
        }),
        bestStatBlocks = Math.max(bestStatBlocks, localStorage.getItem("bestStatBlocks")),
        bestStatKills = Math.max(bestStatKills, localStorage.getItem("bestStatKills")),
        bestStatLbRank = Math.max(bestStatLbRank, localStorage.getItem("bestStatLbRank")),
        bestStatAlive = Math.max(bestStatAlive, localStorage.getItem("bestStatAlive")),
        bestStatNo1Time = Math.max(bestStatNo1Time, localStorage.getItem("bestStatNo1Time")),
        window.requestAnimationFrame(loop);
    var i = IS_DEV_BUILD ? " (dev build)" : "";
    console.log("%c splix.io %c\n\n\nversion " + JS_VERSION + " loaded" + i, "color: #a22929; font-size: 50px; font-family: arial; text-shadow: 1px 1px #7b1e1e, 2px 2px #7b1e1e;", "")
}
);
function connectWithTransition(e) {
    isConnectingWithTransition || isWaitingForAd || (isConnectingWithTransition = true,
        doConnect(e) && (doTransition("", false, function () {
            playingAndReady || (isTransitioning = !1),
                showCouldntConnectAfterTransition ? couldntConnect() : onConnectOrMiddleOfTransition(),
                showCouldntConnectAfterTransition = !1
        }),
            nameInput.blur(),
            checkUsername(nameInput.value)),
        isConnectingWithTransition = !1)
}
var isConnecting = !1;
function doConnect(e) {
    if (!ws && !isConnecting && !isTransitioning) {
        if (canRunAds && !e && testPatreonAdsAllowed()) {
            var t = getAdCounter()
                , n = localStorage.lastAdTime;
            if (n = parseInt(n),
                n = Date.now() - n,
                1 == t || !isNaN(n) && 3e5 < n)
                return displayAd(),
                    !1;
            countAd()
        }
        closedBecauseOfDeath = showCouldntConnectAfterTransition = !(isConnecting = !0);
        var a = getServer();
        return a ? (thisServerAvgPing = thisServerLastPing = a.ping,
            console.log("connecting to " + a.ip + "..."),
            (ws = new WebSocket(a.ip)).binaryType = "arraybuffer",
            ws.onmessage = function (e) {
                ws == this && onMessage(e)
            }
            ,
            ws.onclose = function (e) {
                ws == this && onClose(e)
            }
            ,
            ws.onopen = function (e) {
                ws == this && onOpen(e)
            }
            ,
            !0) : (onClose(),
                !1)
    }
    return !1
}
function onMessage(e) {
    var posX;
    var posY;
    var state;
    var playerId;
    var player;
    var fillX;
    var fillY;
    var iter;
    var c;
    var d;
    var data = new Uint8Array(e.data);
    if (data[0] == receiveAction.UPDATE_BLOCKS && ( //Sets block at pos(data[1, 2], data[3, 4]) to state(data[5]). Owned by player(data[5], data[6]])
        posX = bytesToInt(data[1], data[2]), //Looks like a 16 bit int 
        posY = bytesToInt(data[3], data[4]),
        state = data[5],
        getBlock(posX, posY).setBlockId(state)),
        data[0] == receiveAction.PLAYER_POS) {
            posX = bytesToInt(data[1], data[2]),
            posY = bytesToInt(data[3], data[4]),
            player = getPlayer(playerId = bytesToInt(data[5], data[6]))
            player.hasReceivedPosition = true,
            player.moveRelativeToServerPosNextFrame = true,
            player.lastServerPosSentTime = Date.now(),
            lastMyPosHasBeenConfirmed = true;
        var directionIThink = data[7]
            , p = [posX, posY]
            , h = [posX, posY]
            , g = 0;
        (player.isMyPlayer || 50 < thisServerAvgPing) && (g = thisServerAvgPing / 2 * GLOBAL_SPEED),
            movePos(h, directionIThink, g);
        var f = !0;
        if (player.isMyPlayer) {
            if (lastMyPosServerSideTime = Date.now(),
                (player.dir == directionIThink || myNextDir == directionIThink) && Math.abs(h[0] - player.pos[0]) < 1 && Math.abs(h[1] - player.pos[1]) < 1 && (f = !1),
                0 < lastClientsideMoves.length) {
                var v = lastClientsideMoves.shift();
                v.dir == directionIThink && v.pos[0] == p[0] && v.pos[1] == p[1] ? f = true : lastClientsideMoves = []
            }
            4 != player.dir && 4 != directionIThink || (f = !0),
                f && (changeMyDir(myNextDir = directionIThink, p, false, !1),
                    startRequestMyTrail(),
                    sendDirQueue = []),
                player.serverPos = [h[0], h[1]],
                player.serverDir = directionIThink,
                removeBlocksOutsideViewport(player.pos)
        } else
            player.dir = directionIThink;
        if (f)
            if (player.pos = h,
                8 < data.length)
                1 == data[8] ? trailPush(player, p) : player.trails.push({
                    trail: [],
                    vanishTimer: 0
                });
        player.drawPosSet || (player.drawPos = [player.pos[0], player.pos[1]],
            player.drawPosSet = !0)
    }

    data[0] == receiveAction.FILL_AREA && //Format: 2(startX), 2(startY), 2(endX), 2(endY), 2(blockState)
    fillArea(posX = bytesToInt(data[1], data[2]), 
    posY = bytesToInt(data[3], data[4]), 
    fillX = bytesToInt(data[5], data[6]), 
    fillY = bytesToInt(data[7], data[8]), 
    state = data[9], data[10]);


    if (data[0] == receiveAction.SET_TRAIL) {
        player = getPlayer(playerId = bytesToInt(data[1], data[2]));
        var trails = [];
        var y = false;
        for (iter = 3; iter < data.length; iter += 4) { //Iterating from when data starts to end of data, jumping up by 4 bytes every iteration
            var currentTrailMatrix = [bytesToInt(data[iter], data[iter + 1]), bytesToInt(data[iter + 2], data[iter + 3])]; //Appears to be decoding 2d matrixes into array
            trails.push(currentTrailMatrix)
        }
        if (player.isMyPlayer)
            if (skipTrailRequestResponse)
                skipTrailRequestResponse = false,
                    trailPushesDuringRequest = [];
            else {
                if (isRequestingMyTrail) {
                    for (y = !(isRequestingMyTrail = false),
                        iter = 0; iter < trailPushesDuringRequest.length; iter++)
                        trails.push(trailPushesDuringRequest[iter]);
                    trailPushesDuringRequest = []
                }
                if (0 < player.trails.length)
                    player.trails[player.trails.length - 1].trail.length <= 0 && 0 < trails.length && startRequestMyTrail()
            }
        if (y)
            if (0 < player.trails.length) {
                var C = player.trails[player.trails.length - 1];
                C.trail = trails,
                    C.vanishTimer = 0
            } else
                y = !1;
        y || player.trails.push({
            trail: trails,
            vanishTimer: 0
        })
    }
    if (data[0] == receiveAction.EMPTY_TRAIL_WITH_LAST_POS) {
        if (0 < (player = getPlayer(playerId = bytesToInt(data[1], data[2]))).trails.length) {
            var P = player.trails[player.trails.length - 1].trail;
            0 < P.length && (posX = bytesToInt(data[3], data[4]),
                posY = bytesToInt(data[5], data[6]),
                P.push([posX, posY]))
        }
        player.isMyPlayer && isRequestingMyTrail && (skipTrailRequestResponse = !0),
            player.trails.push({
                trail: [],
                vanishTimer: 0
            })
    }
    if (data[0] == receiveAction.PLAYER_DIE && (player = getPlayer(playerId = bytesToInt(data[1], data[2])),
        3 < data.length && (posX = bytesToInt(data[3], data[4]),
            posY = bytesToInt(data[5], data[6]),
            player.pos = [posX, posY]),
        player.die(true)),
        data[0] == receiveAction.CHUNK_OF_BLOCKS) {
        for (posX = bytesToInt(data[1], data[2]),
            posY = bytesToInt(data[3], data[4]),
            fillX = bytesToInt(data[5], data[6]),
            fillY = bytesToInt(data[7], data[8]),
            iter = 9,
            c = posX; c < posX + fillX; c++) //c is condition
            for (var x = posY; x < posY + fillY; x++) //inner for loop. This is confusing D: We're doing a 2d iteration here. But for x to y we set it to state iterator
                getBlock(c, x).setBlockId(data[iter], false),
                    iter++;
        hasReceivedChunkThisGame || (hasReceivedChunkThisGame = true,
            wsSendMsg(sendAction.READY),
            didSendSecondReady = true);
    }
    if (data[0] == receiveAction.REMOVE_PLAYER)
        for (playerId = bytesToInt(data[1], data[2]),
            iter = players.length - 1; 0 <= iter; iter--)
            playerId == (player = players[iter]).id && players.splice(iter, 1);
    if (data[0] == receiveAction.PLAYER_NAME) {
        playerId = bytesToInt(data[1], data[2]);
        var playerName = Utf8ArrayToStr(d = data.subarray(3, data.length));
        (player = getPlayer(playerId)).name = filter(playerName)
    }
    if (data[0] == receiveAction.MY_SCORE) {
        var A = bytesToInt(data[1], data[2], data[3], data[4])
            , I = 0;
        5 < data.length && (I = bytesToInt(data[5], data[6])),
            realScoreStatTarget = (scoreStatTarget = A) + 500 * I,
            myKillsElem.innerHTML = I
    }
    if (data[0] == receiveAction.MY_RANK && (myRank = bytesToInt(data[1], data[2]),
        myRankSent = true,
        updateStats()),
        data[0] == receiveAction.LEADERBOARD) {
        leaderboardElem.innerHTML = "",
            totalPlayers = bytesToInt(data[1], data[2]),
            updateStats(),
            iter = 3;
        for (var k = 1; !(iter >= data.length);) {
            var b = bytesToInt(data[iter], data[iter + 1], data[iter + 2], data[iter + 3])
                , w = data[iter + 4]
                , D = Utf8ArrayToStr(d = data.subarray(iter + 5, iter + 5 + w))
                , M = document.createElement("tr");
            M.className = "scoreRank";
            var B = document.createElement("td");
            B.innerHTML = "#" + k,
                M.appendChild(B);
            var R = document.createElement("td");
            R.innerHTML = filter(htmlEscape(D)),
                M.appendChild(R);
            var L = document.createElement("td");
            L.innerHTML = b,
                M.appendChild(L),
                leaderboardElem.appendChild(M),
                iter = iter + 5 + w,
                k++
        }
        totalPlayers < 30 && doRefreshAfterDie && null === closeNotification && (closeNotification = doTopNotification("This server is about to close, refresh to join a full server."))
    }
    if (data[0] == receiveAction.MAP_SIZE && (mapSize = bytesToInt(data[1], data[2])),
        data[0] == receiveAction.YOU_DED) {
        if (1 < data.length)
            switch (lastStatBlocks = bytesToInt(data[1], data[2], data[3], data[4]),
            bestStatBlocks < lastStatBlocks && lsSet("bestStatBlocks", bestStatBlocks = lastStatBlocks),
            lastStatKills = bytesToInt(data[5], data[6]),
            bestStatKills < lastStatKills && lsSet("bestStatKills", bestStatKills = lastStatKills),
            ((lastStatLbRank = bytesToInt(data[7], data[8])) < bestStatLbRank || bestStatLbRank <= 0) && 0 < lastStatLbRank && lsSet("bestStatLbRank", bestStatLbRank = lastStatLbRank),
            lastStatAlive = bytesToInt(data[9], data[10], data[11], data[12]),
            bestStatAlive < lastStatAlive && lsSet("bestStatAlive", bestStatAlive = lastStatAlive),
            lastStatNo1Time = bytesToInt(data[13], data[14], data[15], data[16]),
            bestStatNo1Time < lastStatNo1Time && lsSet("bestStatNo1Time", bestStatNo1Time = lastStatNo1Time),
            lastStatDeathType = data[17],
            lastStatKiller = "",
            document.getElementById("lastStats").style.display = null,
            document.getElementById("bestStats").style.display = null,
            lastStatTimer = lastStatCounter = 0,
            lastStatValueElem.innerHTML = bestStatValueElem.innerHTML = "",
            lastStatDeathType) {
                case 1:
                    18 < data.length && (d = data.subarray(18, data.length),
                        lastStatKiller = Utf8ArrayToStr(d));
                    break;
                case 2:
                    lastStatKiller = "the wall";
                    break;
                case 3:
                    lastStatKiller = "yourself"
            }
        lsSet("lastTeamShareUrl", ""),
            lsSet("lastTeamIp", ""),
            allowSkipDeathTransition = closedBecauseOfDeath = true,
            hideBanners(),
            refreshBanner(),
            document.getElementById("newsbox").style.display = null,
            deathTransitionTimeout = window.setTimeout(function () {
                skipDeathTransition ? doTransition("", false, function () {
                    window.setTimeout(afterDeath, 700),
                        onClose(),
                        resetAll()
                }) : doTransition("GAME OVER", true, null, function () {
                    window.setTimeout(afterDeath, 250),
                        onClose(),
                        resetAll()
                }, !0),
                    deathTransitionTimeout = null
            }, 1e3)
    }
    if (data[0] == receiveAction.MINIMAP) {
        var O = 20 * data[1];
        for (minimapCtx.clearRect(2 * O, 0, 40, 160),
            minimapCtx.fillStyle = "#000000",
            iter = 1; iter < data.length; iter++)
            for (c = 0; c < 8; c++) {
                if (0 != (data[iter] & 1 << c)) {
                    var N = 8 * (iter - 2) + c;
                    posX = Math.floor(N / 80) % 80 + O,
                        posY = N % 80,
                        minimapCtx.fillRect(2 * posX, 2 * posY, 2, 2)
                }
            }
    }
    if (data[0] == receiveAction.PLAYER_SKIN && ((player = getPlayer(playerId = bytesToInt(data[1], data[2]))).isMyPlayer && (myColorId = data[3],
        colorUI()),
        player.skinBlock = data[3]),
        data[0] == receiveAction.READY && (playingAndReady = true,
            isTransitioning || (isTransitioning = true,
                onConnectOrMiddleOfTransition())),
        data[0] == receiveAction.PLAYER_HIT_LINE) {
        player = getPlayer(playerId = bytesToInt(data[1], data[2]));
        var _ = getColorForBlockSkinId(data[3]);
        posX = bytesToInt(data[4], data[5]),
            posY = bytesToInt(data[6], data[7]);
        var U = !1;
        8 < data.length && (U = 1 == data[8]),
            player.addHitLine([posX, posY], _, U),
            player.isMyPlayer && !U && doCamShakeDir(player.dir, 10, !1)
    }
    if (data[0] == receiveAction.REFRESH_AFTER_DIE && (doRefreshAfterDie = !0),
        data[0] == receiveAction.PLAYER_HONK) {
        player = getPlayer(playerId = bytesToInt(data[1], data[2]));
        var W = data[3];
        player.doHonk(W)
    }
    if (data[0] == receiveAction.PONG) {
        var H = Date.now() - lastPingTime
            , F = Math.abs(H - thisServerLastPing);
        thisServerDiffPing = lerp(F, thisServerDiffPing = Math.max(thisServerDiffPing, F), .5),
            thisServerAvgPing = lerp(thisServerAvgPing, H, .5),
            thisServerLastPing = H,
            lastPingTime = Date.now(),
            waitingForPing = !1
    }
    (data[0] == receiveAction.UNDO_PLAYER_DIE && (player = getPlayer(playerId = bytesToInt(data[1], data[2]))).undoDie(),
        data[0] == receiveAction.TEAM_LIFE_COUNT) && setLives(data[1], data[2])
}
function wsSendMsg(action, data) {
    var e;
    if (ws && ws.readyState == WebSocket.OPEN) {
        var output = [action];
        if (action == sendAction.UPDATE_DIR) { //Here we're pushing, [direction, x, y]
            output.push(data.dir);
            var i = intToBytes(data.coord[0], 2);
            output.push(i[0]),
                output.push(i[1]);
            var o = intToBytes(data.coord[1], 2);
            output.push(o[0]),
                output.push(o[1])
        }
        if (action != sendAction.SET_USERNAME && action != sendAction.SET_TEAM_USERNAME && action != sendAction.PATREON_CODE || (e = toUTF8Array(data),
            output.push.apply(output, e)),
            action == sendAction.SKIN && (output.push(data.blockColor),
                output.push(data.pattern)),
            action == sendAction.REQUEST_CLOSE)
            for (var r = 0; r < data.length; r++)
                output.push(data[r]);
        if (action == sendAction.HONK && output.push(data),
            action == sendAction.MY_TEAM_URL && (e = toUTF8Array(data),
                output.push.apply(output, e)),
            action == sendAction.VERSION) {
            output.push(data.type);
            var s = intToBytes(data.ver, 2);
            output.push(s[0]),
                output.push(s[1])
        }
        var l = new Uint8Array(output);
        try {
            return ws.send(l),
                !0
        } catch (e) {
            console.log("error sending message", action, data, output, e)
        }
    }
    return !1
}
function resetAll() {
    ws && ws.readyState == WebSocket.OPEN && ws.close(),
        isConnecting = false,
        blocks = [],
        myPos = ws = null,
        scoreStat = scoreStatTarget = realScoreStat = realScoreStatTarget = 25,
        totalPlayers = myRank = 0,
        playingAndReady = myRankSent = !(beginScreenVisible = !(camPosSet = !(players = []))),
        camShakeForces = [],
        titleComplete = false,
        skipDeathTransition = allowSkipDeathTransition = !(resetTitleNextFrame = !0),
        minimapCtx.clearRect(0, 0, 160, 160),
        didSendSecondReady = hasReceivedChunkThisGame = false,
        showBeginHideMainCanvas(),
        doRefreshAfterDie && location.reload();
    var e = document.body.style;
    e.webkitFilter = e.filter = null;
    for (var t = currentTopNotifications.length - 1; 0 <= t; t--) {
        currentTopNotifications[t].destroy()
    }
    currentTopNotifications = [],
        sendDirQueue = [],
        clearAllLives()
}
function initTutorial() {
    tutorialBlocks = [];
    for (var e = 0; e < 10; e++)
        for (var t = 0; t < 10; t++) {
            var n = 1;
            1 <= e && e <= 3 && 1 <= t && t <= 3 && (n = 10),
                getBlock(e, t, tutorialBlocks).setBlockId(n, !1)
        }
    var a = getPlayer(1, tutorialPlayers = []);
    a.skinBlock = 8,
        a.hasReceivedPosition = !0;
    var i = getPlayer(2, tutorialPlayers);
    i.skinBlock = 0,
        i.pos = [-2, 7],
        i.hasReceivedPosition = !0
}
function initSkinScreen() {
    skinButtonCanvas = document.getElementById("skinButton"),
        skinButtonShadow = document.getElementById("skinButtonShadow"),
        shareTw = document.getElementById("shareTw"),
        shareFb = document.getElementById("shareFb"),
        shareTw.onclick = function () {
            popUp("https://twitter.com/intent/tweet?text=Check%20out%20this%20game%20I%27ve%20just%20found&amp;url=http://splix.io&amp;hashtags=splixio&amp;related=splixio%3AOfficial%20Twitter%20account,jespertheend%3ADeveloper,", 500, 300),
                share()
        }
        ,
        shareFb.onclick = function () {
            popUp("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fsplix.io%2F&display=popup&ref=plugin&src=like&app_id=840486436000126", 500, 300),
                share()
        }
        ,
        shareToUnlock = document.getElementById("shareToUnlock"),
        skinButtonCtx = skinButtonCanvas.getContext("2d"),
        skinButtonCanvas.onclick = function () {
            ws || isTransitioning || playingAndReady || doTransition("", false, openSkinScreen)
        }
        ;
    var e = localStorage.getItem("skinColor");
    null === e && (e = 0),
        e = parseInt(e);
    var t = localStorage.getItem("skinPattern");
    null === t && (t = 0),
        t = parseInt(t),
        fillArea(0, 0, 2 * VIEWPORT_RADIUS, 2 * VIEWPORT_RADIUS, e + 1, t, skinScreenBlocks = []),
        document.getElementById("prevColor").onclick = function () {
            skinButton(-1, 0)
        }
        ,
        document.getElementById("nextColor").onclick = function () {
            skinButton(1, 0)
        }
        ,
        document.getElementById("prevPattern").onclick = function () {
            skinButton(-1, 1)
        }
        ,
        document.getElementById("nextPattern").onclick = function () {
            skinButton(1, 1)
        }
        ,
        document.getElementById("skinSave").onclick = function () {
            doTransition("", false, showBeginHideSkin)
        }
        ,
        getBlock(0, 0, skinButtonBlocks).setBlockId(e + 1, !1),
        skinButtonCanvas.onmouseover = function () {
            var e = localStorage.getItem("skinColor");
            null === e && (e = 0),
                0 < (e = parseInt(e)) && skinButtonBlocks[0].setBlockId(e + 1 + SKIN_BLOCK_COUNT, !1)
        }
        ,
        skinButtonCanvas.onmouseout = function () {
            var e = localStorage.getItem("skinColor");
            null === e && (e = 0),
                skinButtonBlocks[0].setBlockId(parseInt(e) + 1, !1)
        }
        ,
        checkShared()
}
function initTitle() {
    for (var e = 0; e < titleLines.length; e++)
        for (var t = titleLines[e], n = 0; n < t.line.length; n++)
            for (var a = t.line[n], i = 0; i < a.length; i += 2)
                a[i] += t.posOffset[0] - 40,
                    a[i + 1] += t.posOffset[1] - 20;
    titCanvas = document.getElementById("logoCanvas"),
        titCtx = titCanvas.getContext("2d")
}
var selectedGamemode = "Normal";
function initGameModeUI() {
    (gamemodeDropDownEl = document.getElementById("gamemodeSelect")).value = "Normal",
        gamemodeDropDownEl.onchange = function () {
            selectedGamemode = gamemodeDropDownEl.options[gamemodeDropDownEl.selectedIndex].value,
                setJoinButton();
            var e = "Teams" == selectedGamemode;
            teamBox.style.display = e ? null : "none",
                e ? teamDoConnect() : changeTeamModeToNormalMode()
        }
        ,
        initTeamUI()
}
function setJoinButton() {
    if (joinButton.disabled = false,
        joinButton.title = "",
        "Normal" == selectedGamemode)
        joinButton.value = "Join";
    else if ("Teams" == selectedGamemode) {
        joinButton.value = "Start",
            testTeamWsConnection() ? (teamBeginUIIsHost || (joinButton.disabled = true,
                joinButton.title = "Only the team host can start a game"),
                teamPlayersList.childNodes.length <= 1 && (joinButton.disabled = true,
                    joinButton.title = "Not enough players")) : (joinButton.disabled = true,
                        joinButton.title = "Not connected to the team server");
        var e = 1 < teamPlayersList.childNodes.length;
        document.getElementById("teamShareLinkDesc").innerHTML = e ? teamBeginUIIsHost ? "Click Start to start the game." : "Waiting for host to start the game." : "Share this url with your<br>friends to create a team.",
            document.getElementById("teamPlayersContainer").style.display = e ? null : "none"
    }
}
var teamBeginUIIsHost = !1
    , teamWs4 = null
    , teamWs6 = null
    , teamWs = null
    , teamWs4Failed = !1
    , teamWs6Failed = !1
    , teamWsCloseWasIntended = !1
    , teamWsWasConnected = !1
    , teamShareUrl = ""
    , teamServers = []
    , activeTeamServers = [];
function initTeamUI() {
    if (teamShareLink.ondblclick = function () {
        window.getSelection && selectTeamShareLink()
    }
        ,
        document.addEventListener("mouseup", function () {
            var e = window.getSelection();
            if (0 < e.rangeCount) {
                var t = e.getRangeAt(0);
                if (t.startContainer.parentElement == teamShareLink && 0 === t.startOffset) {
                    e.removeAllRanges();
                    var n = document.createRange();
                    n.selectNodeContents(teamShareLink),
                        n.setEnd(t.endContainer, t.endOffset),
                        e.addRange(n)
                }
            }
        }),
        teamShareCopyBtn.onclick = function () {
            var e = selectTeamShareLink();
            document.execCommand("copy"),
                e.removeAllRanges()
        }
        ,
        0 === location.hash.indexOf("#team-") && !didConfirmOpenInApp) {
        teamShareUrl = location.hash.substring(6);
        var e = testExistingTeamHash();
        e && (preventTeamServerConnection = !0),
            gamemodeDropDownEl.value = "Teams",
            gamemodeDropDownEl.onchange(),
            e && connectWithTransition(!0)
    }
    nameInput.addEventListener("change", nameInputOnChange),
        teamNameInput.addEventListener("change", teamNameInputOnChange)
}
function testExistingTeamHash() {
    var e = Date.now() - parseInt(localStorage.lastTeamJoinTime)
        , t = localStorage.lastTeamShareUrl
        , n = location.hash.substring(6);
    return e < 36e5 && t == n
}
function selectTeamShareLink() {
    var e = document.createRange();
    e.selectNodeContents(teamShareLink);
    var t = window.getSelection();
    return t.removeAllRanges(),
        t.addRange(e),
        t
}
var teamDoConnectAfterServersGet = !1
    , connectedTeamServerLetter = "";
function teamDoConnect() {
    if (preventTeamServerConnection)
        preventTeamServerConnection = !1;
    else if (setTeamBoxLoadVisibility(),
        teamServers.length <= 0)
        teamDoConnectAfterServersGet = !0;
    else {
        var e = null;
        if (0 === location.hash.indexOf("#team-"))
            for (var t = location.hash.substr(6, 1), n = 0; n < teamServers.length; n++) {
                var a = teamServers[n];
                a.letter == t && (e = a)
            }
        null === e && (e = randFromArray(activeTeamServers));
        var i = IS_SECURE ? e.securePort : e.port;
        connectedTeamServerLetter = e.letter,
            teamWs4 = newTeamWs(e.ipv4 + ":" + i + "/teamServer"),
            teamWs6 = newTeamWs(e.ipv6 + ":" + i + "/teamServer")
    }
}
function newTeamWs(e) {
    var t = new WebSocket(SECURE_WS + e);
    return t.binaryType = "arraybuffer",
        t.onmessage = function (e) {
            teamWs == this && teamWsOnMessage(e)
        }
        ,
        t.onclose = function () {
            teamWs4 == this && (teamWs4Failed = !0),
                teamWs6 == this && (teamWs6Failed = !0),
                (teamWs == this || teamWs4Failed && teamWs6Failed) && teamWsOnClose()
        }
        ,
        t.onopen = function () {
            testTeamWsConnection() ? t.close() : (teamWs = t,
                teamWs6 = teamWs4 = null,
                teamWsOnConnect()),
                setTeamBoxLoadVisibility()
        }
        ,
        t
}
function testTeamWsConnection() {
    return null !== teamWs && teamWs.readyState == WebSocket.OPEN
}
function setTeamBoxLoadVisibility() {
    var e = testTeamWsConnection();
    teamBoxLoading.style.display = e ? "none" : null,
        teamBoxLoaded.style.display = e ? null : "none"
}
function teamWsOnConnect() {
    if (teamWsWasConnected = !(teamBeginUIIsHost = !1),
        setJoinButton(),
        setTeamNameUI(),
        0 === location.hash.indexOf("#team-")) {
        var e = location.hash
            , t = e.substring(7, e.length);
        teamWsSendMsg(teamSendAction.REQUEST_TEAM_ID, t)
    } else
        "" !== lastTeamLostConnShareUrl && Date.now() - lastTeamLostConnTime < 12e4 ? (teamWsSendMsg(teamSendAction.REQUEST_TEAM_ID, lastTeamLostConnShareUrl.substring(1)),
            lastTeamLostConnShareUrl = "") : teamWsSendMsg(teamSendAction.REQUEST_TEAM_ID);
    teamSendPlayerName(),
        teamSendTeamName(),
        teamSendPingData(),
        setNotification("")
}
var lastTeamLostConnShareUrl = ""
    , lastTeamLostConnTime = 0;
function teamWsOnClose() {
    teamWsCloseWasIntended || (teamWsWasConnected ? (setNotification("The connection to the team server was lost :/"),
        lastTeamLostConnShareUrl = teamShareUrl,
        lastTeamLostConnTime = Date.now()) : setNotification("Couldn't connect to the team server :/")),
        setTeamBoxLoadVisibility(),
        changeTeamModeToNormalMode(),
        teamWs6Failed = teamWs4Failed = teamWsCloseWasIntended = teamWsWasConnected = false,
        teamPlayersList.innerHTML = "",
        teamShareLink.innerHTML = "loading..."
}
function teamWsClose() {
    teamWsCloseWasIntended = true,
        testTeamWsConnection() && teamWs.close(),
        teamWs = null,
        teamWsOnClose()
}
var skipChangeToNormalOnce = !1;
function changeTeamModeToNormalMode() {
    skipChangeToNormalOnce ? skipChangeToNormalOnce = true : (0 === location.hash.indexOf("#team") && removeHash(),
        "Teams" == gamemodeDropDownEl.value && (gamemodeDropDownEl.value = "Normal",
            gamemodeDropDownEl.onchange()),
        skipChangeToNormalOnce = true,
        teamWsClose())
}
function removeHash() {
    history.pushState("", document.title, location.pathname + location.search)
}
function testHashForMobile() {
    if (deviceType != DeviceTypes.DESKTOP) {
        var e = location.hash;
        if ("" != e && "#pledged" != e) {
            var t = "Would you like to open the splix.io app?";
            t = 0 === e.indexOf("#team") ? "Would you like to join this team in the app?" : "Would you like to join this server in the app?",
                confirm(t) && (didConfirmOpenInApp = true,
                    openSplixApp(e.substring(1, e.length)))
        }
    }
}
function openSplixApp(e) {
    var t = location.href = "splix://" + e;
    deviceType == DeviceTypes.ANDROID && -1 < navigator.userAgent.toLowerCase().indexOf("chrome") && (window.document.body.innerHTML = "Chrome doesn't like auto redirecting, click <a href=\"" + t + '">here</a> to open the splix.io app.')
}
function teamWsOnMessage(e) {
    var t, n, a, i, o = new Uint8Array(e.data);
    if (o[0] == teamReceiveAction.URL) {
        var r = o.subarray(1, o.length);
        teamShareUrl = connectedTeamServerLetter + Utf8ArrayToStr(r);
        var s = location.host + location.pathname + "#team-" + teamShareUrl;
        teamShareLink.innerHTML = '<span class="teamShareLinkHidden">http://</span>' + s,
            location.hash = "team-" + teamShareUrl
    }
    if (o[0] == teamReceiveAction.BECOME_HOST && (teamBeginUIIsHost = true,
        setJoinButton(),
        setTeamNameUI()),
        o[0] == teamReceiveAction.ADD_PLAYER) {
        t = bytesToInt(o[1]);
        var l = Utf8ArrayToStr(o.subarray(2, o.length));
        a = "teamPlayer-" + t,
            null === (n = document.getElementById(a)) && ((n = document.createElement("li")).id = a,
                teamPlayersList.appendChild(n)),
            n.innerHTML = testEmtpyName(filter(htmlEscape(l))),
            setJoinButton()
    }
    if (o[0] == teamReceiveAction.REMOVE_PLAYER && (a = "teamPlayer-" + (t = bytesToInt(o[1])),
        null !== (n = document.getElementById(a)) && teamPlayersList.removeChild(n)),
        o[0] == teamReceiveAction.REQUEST_IPS) {
        0 == (i = o[1]) && (i = -1);
        var c = getServer(i, !1);
        if (i = c.locId,
            null === c)
            return void setNotification("Couldn't find a server to connect to :/");
        if (void 0 === c.ip4 || void 0 === c.ip6) {
            if (void 0 === c.ip)
                return void setNotification("Couldn't find a server to connect to :/");
            teamWsSendMsg(teamSendAction.SEND_IPS, [i, c.ip, c.ip])
        }
        teamWsSendMsg(teamSendAction.SEND_IPS, [i, c.ip4, c.ip6])
    }
    if (o[0] == teamReceiveAction.GAME_START) {
        i = o[1];
        for (var d = bytesToInt(o[2], o[3]), m = Utf8ArrayToStr(o.subarray(4, d + 4)), u = Utf8ArrayToStr(o.subarray(d + 4, o.length)), p = "", h = 0; h < servers.length; h++) {
            var g = servers[h];
            if (g.locId == i) {
                var f = !1;
                0 < g.pingTries6 && g.pingTries <= 0 ? f = false : 0 < g.pingTries6 && 0 < g.pingTries && g.avgPing6 < g.avgPing && (f = !0),
                    p = f ? u : m;
                break
            }
        }
        lsSet("lastTeamShareUrl", teamShareUrl),
            lsSet("lastTeamIp", p),
            lsSet("lastTeamJoinTime", Date.now()),
            connectWithTransition(!0)
    }
    if (o[0] == teamReceiveAction.TEAM_IS_FULL && (setNotification("This team is full :("),
        teamWsClose()),
        o[0] == teamReceiveAction.SET_TEAM_USERNAME) {
        var v = Utf8ArrayToStr(o.subarray(1, o.length));
        v = filter(htmlEscape(v)),
            teamNameH.innerHTML = v,
            teamBeginUIIsHost || (teamNameInput.value = v)
    }
}
function teamWsSendMsg(t, n) {
    var e;
    if (testTeamWsConnection()) {
        var a = [t];
        if (t == teamSendAction.REQUEST_TEAM_ID && n && (e = toUTF8Array(n),
            a.push.apply(a, e)),
            t != teamSendAction.MY_USERNAME && t != teamSendAction.SET_TEAM_USERNAME || n && (e = toUTF8Array(n),
                a.push.apply(a, e)),
            t == teamSendAction.PING_DATA)
            for (var i = 0; i < n.length; i++) {
                var o = servers[i];
                a.push(o.locId);
                var r = 0 < o.pingTries ? o.avgPing : 0
                    , s = 0 < o.pingTries6 ? o.avgPing6 : 0;
                r = Math.round(Math.min(Math.max(0, r), 65e3)),
                    s = Math.round(Math.min(Math.max(0, s), 65e3));
                var l = intToBytes(r, 2)
                    , c = intToBytes(s, 2);
                a.push(l[0]),
                    a.push(l[1]),
                    a.push(c[0]),
                    a.push(c[1])
            }
        if (t == teamSendAction.SEND_IPS) {
            var d = toUTF8Array(n[1])
                , m = toUTF8Array(n[2])
                , u = intToBytes(d.length, 2);
            a.push(n[0]),
                a.push(u[0]),
                a.push(u[1]),
                a.push.apply(a, d),
                a.push.apply(a, m)
        }
        var p = new Uint8Array(a);
        try {
            return teamWs.send(p),
                !0
        } catch (e) {
            console.log("error sending team message", t, n, a, e)
        }
    }
    return !1
}
function teamSendPlayerName() {
    teamWsSendMsg(teamSendAction.MY_USERNAME, nameInput.value)
}
function teamSendTeamName() {
    teamWsSendMsg(teamSendAction.SET_TEAM_USERNAME, teamNameInput.value)
}
function teamSendPingData() {
    teamWsSendMsg(teamSendAction.PING_DATA, servers)
}
function testEmtpyName(e) {
    return /\S/.test(e) ? e : "Enter your name..."
}
function setTeamNameUI() {
    teamBeginUIIsHost ? (teamNameH.style.display = "none",
        teamNameInput.style.display = null) : (teamNameH.style.display = null,
            teamNameInput.style.display = "none")
}
function teamNameInputOnChange() {
    teamSendTeamName(),
        lsSet("teamName", teamNameInput.value)
}
var canRunAdsRequested = !1;
function requestCanRunAds() {
    if (!canRunAdsRequested && testPatreonAdsAllowed()) {
        canRunAdsRequested = !0;
        var e = document.createElement("script");
        e.type = "text/javascript",
            e.src = "/js/ads.js",
            document.getElementsByTagName("head")[0].appendChild(e)
    }
}
var initVidAdsCalled = !1;
function initVideoAdsScript() {
    if (!initVidAdsCalled && testPatreonAdsAllowed()) {
        initVidAdsCalled = !0;
        var e = document.getElementsByTagName("head")[0];
        if (bannerAdsUseCurse) {
            var t = document.createElement("script");
            t.type = "text/javascript",
                t.src = "//api.adinplay.com/player/v2/JTE/splix.io/player.min.js",
                e.appendChild(t)
        } else
            aiptag.cmd.player.push(function () {
                adplayer = new aipPlayer({
                    AD_WIDTH: 960,
                    AD_HEIGHT: 540,
                    AD_FULLSCREEN: false,
                    AD_CENTERPLAYER: false,
                    LOADING_TEXT: "loading advertisement",
                    PREROLL_ELEM: function () {
                        return prerollElem
                    },
                    AIP_COMPLETE: function (e) {
                        console.log("Ad: " + e + " Completed"),
                            onAdFinish()
                    },
                    AIP_REMOVE: function () { }
                })
            })
    }
}
var prerollElem, isWaitingForAd = false, boltIsRendered = !1;
function displayAd() {
    isWaitingForAd = true,
        formElem.style.display = "none",
        prerollElem.style.display = null,
        bannerAdsUseCurse ? "undefined" != typeof aipPlayer ? (adplayer = new aipPlayer({
            AD_WIDTH: 960,
            AD_HEIGHT: 540,
            PREROLL_ELEM: prerollElem,
            AIP_COMPLETE: function () {
                onAdFinish()
            }
        }),
            adplayer.startPreRoll(),
            onAdLoaded()) : (console.log("couldn't load ad, aipPlayer not defined"),
                onAdFinish()) : (aiptag.cmd.player.push(function () {
                    adplayer.startPreRoll()
                }),
                    onAdLoaded()),
        scrollAd()
}
function getScript(e, t) {
    var n = document.head || document.getElementsByTagName("head")[0]
        , a = document.createElement("script")
        , i = !0;
    a.async = "async",
        a.type = "text/javascript",
        a.charset = "UTF-8",
        a.src = e,
        a.onload = a.onreadystatechange = function () {
            !i || a.readyState && !/loaded|complete/.test(a.readyState) || (i = false,
                t(),
                a.onload = a.onreadystatechange = null)
        }
        ,
        n.appendChild(a)
}
var prerollIsVisible = !1;
function onAdLoaded(e) {
    lsSet("refreshDuringAd", "true"),
        prerollIsVisible = true,
        document.getElementById("shareText").className = shareToUnlock.className = appLinksElem.className = "adRunning",
        hideBanners(),
        destroyBanners()
}
function scrollAd() {
    var e = prerollElem.offsetTop
        , t = e + prerollElem.offsetHeight
        , n = document.documentElement.scrollTop || document.body.scrollTop
        , a = n + window.innerHeight
        , i = (e + t) / 2;
    (e < n || a < t) && window.scroll(0, i - window.innerHeight / 2)
}
function onAdFinish() {
    countAd(),
        lsSet("refreshDuringAd", ""),
        prerollIsVisible = false,
        lsSet("lastAdTime", Date.now()),
        formElem.style.display = null,
        prerollElem.style.display = "none",
        document.getElementById("shareText").className = shareToUnlock.className = null,
        connectWithTransition(!(isWaitingForAd = isConnectingWithTransition = !1))
}
function getAdCounter() {
    var e = localStorage.adCounter;
    return void 0 === e && (e = 0),
        e = parseInt(e),
        isNaN(e) && (e = 0),
        e
}
function countAd() {
    var e = getAdCounter();
    5 < ++e && (e = 0),
        lsSet("adCounter", e)
}
function refreshBanner() {
    testPatreonAdsAllowed() && (bannerAdsUseCurse ? (setUpAdBoxContent(),
        "undefined" != typeof factorem && setTimeout(factorem.refreshAds.bind(factorem, null, !0), 10)) : aiptag.cmd.display.push(function () {
            aipDisplayTag.display("JTE_splix-io_300x250")
        }))
}
function showBanner() {
    prerollIsVisible || (adBox.style.visibility = null)
}
function showBanner2() {
    prerollIsVisible || (adBox2.style.visibility = null)
}
function destroyBanners() {
    bannerAdsUseCurse && (adBox.innerHTML = "",
        adBox2.innerHTML = "")
}
function hideBanners() {
    adBox.style.visibility = adBox2.style.visibility = "hidden"
}
function setAdBoxLeft() {
    adBox.style.left = "-" + (adBox.clientWidth + 20) + "px"
}
function setUpAdBoxContent() {
    destroyBanners(),
        adBoxContentDiv = document.createElement("div"),
        adBoxContentDiv2 = document.createElement("div"),
        bannerAdsUseCurse ? (adBoxContentDiv.id = "cdm-zone-02",
            adBoxContentDiv2.id = "cdm-zone-01") : adBoxContentDiv.id = "JTE_splix-io_300x250",
        adBox.appendChild(adBoxContentDiv),
        adBox2.appendChild(adBoxContentDiv2)
}
function onAdBoxLoaded() {
    showBanner(),
        setAdBoxLeft()
}
function onAdBox2Loaded() {
    showBanner2()
}
var adBoxContentDiv = null
    , prevAdboxContentWidth = 0
    , prevAdboxContentHeight = 0
    , adBox = null;
function testAdBoxLoaded() {
    adBoxContentDiv && (prevAdboxContentWidth == adBoxContentDiv.clientWidth && prevAdboxContentHeight == adBoxContentDiv.clientHeight || (prevAdboxContentWidth = adBoxContentDiv.clientWidth,
        prevAdboxContentHeight = adBoxContentDiv.clientHeight,
        onAdBoxLoaded()))
}
var adBoxContentDiv2 = null
    , prevAdbox2ContentWidth = 0
    , prevAdbox2ContentHeight = 0
    , adBox2 = null;
function testAdBox2Loaded() {
    adBoxContentDiv2 && (prevAdbox2ContentWidth == adBoxContentDiv2.clientWidth && prevAdbox2ContentHeight == adBoxContentDiv2.clientHeight || (prevAdbox2ContentWidth = adBoxContentDiv2.clientWidth,
        prevAdbox2ContentHeight = adBoxContentDiv2.clientHeight,
        onAdBox2Loaded()))
}
function setCookieNoticeVisibility() {
    var e = null === localStorage.getItem("hasAdsConsent") && !bannerAdsUseCurse;
    document.getElementById("euConsent").style.display = e ? null : "none"
}
function showCursor() {
    document.body.style.cursor = null
}
setCookieNoticeVisibility(),
    document.getElementById("euConsentAgreeBtn").addEventListener("click", function () {
        lsSet("hasAdsConsent", "true"),
            aiptag.consented = true,
            refreshBanner(),
            setCookieNoticeVisibility()
    }),
    document.getElementById("euConsentDeny").addEventListener("click", function () {
        lsSet("hasAdsConsent", "false"),
            aiptag.consented = false,
            setCookieNoticeVisibility()
    });
var afterDeathCounter = 0;
function afterDeath() {
    switch (++afterDeathCounter) {
        case 1:
            window.twttr = (v = document,
                T = "twitter-wjs",
                S = v.getElementsByTagName("script")[0],
                C = window.twttr || {},
                v.getElementById(T) || ((y = v.createElement("script")).id = T,
                    y.src = "https://platform.twitter.com/widgets.js",
                    S.parentNode.insertBefore(y, S),
                    C._e = [],
                    C.ready = function (e) {
                        C._e.push(e)
                    }
                ),
                C),
                twttr.ready(function (e) {
                    e.events.bind("rendered", function () {
                        twttrIsInit = true,
                            testSocialReady()
                    }),
                        e.events.bind("tweet", function () {
                            share()
                        })
                }),
                window.fbAsyncInit = function () {
                    FB.Event.subscribe("xfbml.render", function () {
                        fbIsInit = true,
                            testSocialReady()
                    }),
                        FB.init({
                            appId: "1812921762327343",
                            autoLogAppEvents: true,
                            xfbml: true,
                            version: "v3.1"
                        })
                }
                ,
                p = document,
                h = "facebook-jssdk",
                f = p.getElementsByTagName("script")[0],
                p.getElementById(h) || ((g = p.createElement("script")).id = h,
                    g.src = "https://connect.facebook.net/en_US/sdk.js",
                    f.parentNode.insertBefore(g, f));
            var e = document.getElementsByTagName("head")[0]
                , t = document.createElement("script");
            t.type = "text/javascript",
                t.src = "https://apis.google.com/js/platform.js",
                t.onload = function () {
                    ytIsInit = !0
                }
                ,
                e.appendChild(t);
            var n = document.createElement("img");
            n.id = "discord",
                n.className = "socialHover",
                n.draggable = false,
                n.title = "splix.io discord group",
                n.onload = function () {
                    discordIsInit = true,
                        testSocialReady()
                }
                ,
                n.src = "/img/discord.svg",
                document.getElementById("discordA").appendChild(n);
            var a = document.createElement("img");
            a.id = "reddit",
                a.className = "socialHover",
                a.draggable = false,
                a.title = "splix.io on reddit",
                a.onload = function () {
                    redditIsInit = true,
                        testSocialReady()
                }
                ,
                a.src = "/img/reddit.svg",
                document.getElementById("redditA").appendChild(a);
            var i = document.createElement("img");
            i.id = "patreonCornerButton",
                i.className = "socialHover",
                i.draggable = false,
                i.title = "Become a patreon of splix.io",
                i.onload = function () {
                    patreonCornerButtonIsInit = true,
                        testSocialReady()
                }
                ,
                i.src = "/img/patreon.png";
            var o = document.getElementById("patreonA");
            o.appendChild(i),
                o.appendChild(document.createElement("br"));
            var r = document.createElement("img");
            r.alt = "Get it on Google Play",
                r.style.width = "250px",
                r.style.display = "block",
                r.onload = function () {
                    androidImgIsInit = true,
                        testAppLinksReady()
                }
                ,
                r.src = "https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png";
            var s = document.createElement("a");
            s.href = "https://play.google.com/store/apps/details?id=com.Jespertheend.splix",
                s.target = "_blank",
                s.appendChild(r),
                appLinksElem.appendChild(s);
            var l = document.createElement("img");
            l.alt = "Download on the App Store",
                l.style.width = "220px",
                l.style.marginBottom = "15px",
                l.onload = function () {
                    appleImgIsInit = true,
                        testAppLinksReady()
                }
                ,
                l.src = "https://linkmaker.itunes.apple.com/images/badges/en-us/badge_appstore-lrg.svg";
            var c = document.createElement("a");
            c.href = "https://itunes.apple.com/app/id1150901618",
                c.target = "_blank",
                c.appendChild(l),
                appLinksElem.appendChild(c);
            var d = "splixio.org;splix-io.net;splixio.net;splixio.org".split(";");
            if (this.top.location !== this.location)
                for (var m = 0; m < d.length; m++) {
                    var u = d[m];
                    -1 != document.referrer.indexOf(u) && (this.top.location = this.location)
                }
            requestCanRunAds(),
                initVideoAdsScript()
    }
    var p, h, g, f, v, T, y, S, C
}
var doneAppLinksReady = !1
    , animateAppLinks = !1
    , appLinksTimer = -3
    , androidImgIsInit = !1
    , appleImgIsInit = !1;
function testAppLinksReady() {
    androidImgIsInit && appleImgIsInit && !doneAppLinksReady && (doneAppLinksReady = true,
        onAppLinksReady())
}
function onAppLinksReady() {
    animateAppLinks = !0
}
var doneOnSocialReady = !1
    , twttrIsInit = !1
    , fbIsInit = !1
    , ytIsInit = !1
    , discordIsInit = !1
    , redditIsInit = !1
    , patreonCornerButtonIsInit = !1;
function testSocialReady() {
    twttrIsInit && fbIsInit && ytIsInit && discordIsInit && redditIsInit && patreonCornerButtonIsInit && !doneOnSocialReady && (doneOnSocialReady = true,
        onSocialReady())
}
function onSocialReady() {
    socialIsReady = true,
        socialElem.style.display = null,
        window.setTimeout(function () {
            testSocialTarget()
        }, 500)
}
function testSocialTarget() {
    socialOTarget = socialIsReady ? socialHovering ? 1 : .2 : 0
}
function popUp(e, t, n) {
    var a = screen.width / 2 - t / 2
        , i = screen.height / 2 - n / 2;
    window.open(e, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + t + ", height=" + n + ", top=" + i + ", left=" + a)
}
function share(e) {
    void 0 === e && (e = 3e3),
        lsSet("s", 1),
        window.setTimeout(function () {
            checkShared()
        }, e)
}
function checkShared() {
    var e = !!localStorage.s
        , t = e ? null : "none"
        , n = e ? "none" : null;
    skinButtonCanvas.style.display = t,
        skinButtonShadow.style.display = t,
        shareToUnlock.style.display = n
}
function colorUI() {
    for (var e = getColorForBlockSkinId(myColorId), t = e.brighter, n = e.darker, a = 0; a < uiElems.length; a++) {
        colorBox(uiElems[a], t, n)
    }
}
function colorBox(e, t, n) {
    e.style.backgroundColor = t,
        e.style.boxShadow = "1px 1px " + n + ",2px 2px " + n + ",3px 3px " + n + ",4px 4px " + n + ",5px 5px " + n + ",10px 30px 80px rgba(0,0,0,0.3)"
}
function skinButton(e, t) {
    if (0 === t) {
        var n = localStorage.getItem("skinColor")
            , a = [];
        300 <= localStorage.patreonLastPledgedValue || a.push(13),
            null === n && (n = 0),
            n = parseInt(n);
        for (var i = !1; !i;)
            n = mod(n += e, SKIN_BLOCK_COUNT + 1),
                a.indexOf(n) < 0 && (i = !0);
        lsSet("skinColor", n)
    } else if (1 == t) {
        var o = localStorage.getItem("skinPattern")
            , r = [18, 19, 20, 21, 23, 24, 25, 26];
        0 < localStorage.patreonLastPledgedValue || r.push(27),
            null === o && (o = 0),
            o = parseInt(o);
        for (var s = !1; !s;)
            o = mod(o += e, SKIN_PATTERN_COUNT),
                r.indexOf(o) < 0 && (s = !0);
        lsSet("skinPattern", o)
    }
    updateSkin()
}
function updateSkin() {
    var e = parseInt(localStorage.skinColor) + 1;
    fillArea(0, 0, 2 * VIEWPORT_RADIUS, 2 * VIEWPORT_RADIUS, e, parseInt(localStorage.skinPattern), skinScreenBlocks),
        skinButtonBlocks[0].setBlockId(e)
}
var lifeBox, lives = [];
function clearAllLives() {
    lifeBox.innerHTML = "",
        lives = []
}
function setLives(e, t) {
    var n, a, i = lives.length;
    for (a = 0; a < t - i; a++) {
        var o = document.createElement("canvas");
        o.style.margin = "-15px";
        var r = o.getContext("2d");
        n = {
            node: o,
            ctx: r,
            timer: 0,
            animDir: 0,
            isLife: true,
            render: function (e, t) {
                if (0 !== this.animDir || t)
                    if (this.timer += e * this.animDir * .002,
                        1 == this.animDir ? 1 < this.timer && (this.timer = 1,
                            this.afterAnimate()) : this.timer < 0 && (this.timer = 0,
                                this.afterAnimate()),
                        canvasTransformType = canvasTransformTypes.LIFE,
                        ctxApplyCamTransform(this.ctx, true, !0),
                        this.ctx.fillStyle = "rgba(0,0,0,0.3)",
                        this.drawHeart(false, 15.7, 15.7),
                        1 == this.animDir) {
                        this.ctx.fillStyle = colors.red.darker,
                            this.ctx.translate(30, 30);
                        var n = this.timer
                            , a = .5 * (1 - (n = n < .8 ? lerp(0, 1.2, ease.in(iLerp(0, .8, n))) : lerp(1.2, 1, ease.in(iLerp(.8, 1, n)))));
                        this.ctx.rotate(a),
                            this.ctx.scale(n, n),
                            this.ctx.translate(-30, -30),
                            this.drawHeart(false, 15.7, 15.7),
                            this.ctx.fillStyle = colors.red.brighter,
                            this.drawHeart(false, 14.3, 14.3),
                            this.ctx.restore()
                    } else
                        this.ctx.globalAlpha = this.timer,
                            this.ctx.fillStyle = colors.red.darker,
                            this.drawHeart(true, 15.7, 15.7),
                            this.ctx.fillStyle = colors.red.brighter,
                            this.drawHeart(true, 14.3, 14.3),
                            this.ctx.restore()
            },
            drawHeart: function (e, t, n) {
                if (e && 1 != this.timer) {
                    var a, i, o = ease.out(1 - this.timer);
                    a = t + 3 * o,
                        i = n - 12 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(15 + a, 12 + i),
                        this.ctx.bezierCurveTo(15 + a, 8.1 + i, 17.4 + a, 5.25 + i, 21 + a, 5.25 + i),
                        this.ctx.fill(),
                        a = t + 9 * o,
                        i = n - 1.5 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(21 + a, 5.25 + i),
                        this.ctx.bezierCurveTo(24 + a, 5.25 + i, 27 + a, 7.5 + i, 27 + a, 12 + i),
                        this.ctx.bezierCurveTo(27 + a, 15.3 + i, 23.25 + a, 19.35 + i, 23.1 + a, 19.5 + i),
                        this.ctx.fill(),
                        a = t + 6 * o,
                        i = n + 9 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(23.1 + a, 19.5 + i),
                        this.ctx.bezierCurveTo(23.1 + a, 19.8 + i, 17.55 + a, 25.11 + i, 17.1 + a, 25.35 + i),
                        this.ctx.fill(),
                        a = t - 1.5 * o,
                        i = n + 9 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(17.1 + a, 25.35 + i),
                        this.ctx.lineTo(15 + a, 27 + i),
                        this.ctx.bezierCurveTo(14.91 + a, 27 + i, 10.5 + a, 23.28 + i, 10.5 + a, 23.16 + i),
                        this.ctx.fill(),
                        a = t - 12 * o,
                        i = n + 1.5 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(10.5 + a, 23.16 + i),
                        this.ctx.bezierCurveTo(10.5 + a, 23.16 + i, 3 + a, 16.65 + i, 3 + a, 12 + i),
                        this.ctx.fill(),
                        a = t - 3 * o,
                        i = n - 6 * o,
                        this.ctx.beginPath(),
                        this.ctx.moveTo(15 + a, 16.5 + i),
                        this.ctx.lineTo(3 + a, 12 + i),
                        this.ctx.bezierCurveTo(3 + a, 3 + i, 15 + a, 3 + i, 15 + a, 12 + i),
                        this.ctx.fill()
                } else
                    this.ctx.beginPath(),
                        this.ctx.moveTo(15 + t, 12 + n),
                        this.ctx.bezierCurveTo(15 + t, 3 + n, 27 + t, 3 + n, 27 + t, 12 + n),
                        this.ctx.bezierCurveTo(27 + t, 18 + n, 15 + t, 27 + n, 15 + t, 27 + n),
                        this.ctx.bezierCurveTo(15 + t, 27 + n, 3 + t, 18 + n, 3 + t, 12 + n),
                        this.ctx.bezierCurveTo(3 + t, 3 + n, 15 + t, 3 + n, 15 + t, 12 + n),
                        this.ctx.fill()
            },
            afterAnimate: function () {
                this.animDir = 0,
                    this.set(this.isLife)
            },
            set: function (e) {
                this.isLife = e,
                    0 === this.animDir && (e ? this.timer < 1 && (this.animDir = 1) : 0 < this.timer && (this.animDir = -1))
            }
        },
            lifeBox.appendChild(o),
            lives.push(n),
            n.render(0, !0)
    }
    for (a = i - 1; t <= a; a--)
        n = lives[a],
            lifeBox.removeChild(n.node),
            lives.splice(a, 1);
    for (a = 0; a < lives.length; a++)
        (n = lives[a]).set(a < e)
}
function renderAllLives(e) {
    for (var t = 0; t < lives.length; t++) {
        lives[t].render(e)
    }
}
var engagementIsPlaying = "true" == localStorage.engagementIsPlaying
    , engagementLastPlayTime = localStorage.engagementLastPlayTime;
void 0 === engagementLastPlayTime && (engagementLastPlayTime = Date.now());
var engagementLastNoPlayTime = 0
    , engagementLastChangeTime = localStorage.engagementLastChangeTime;
void 0 === engagementLastChangeTime && (engagementLastChangeTime = Date.now());
var engagementValue = localStorage.engagementValue;
function engagementSetIsPlaying(e) {
    var t = Date.now();
    if (e != engagementIsPlaying) {
        lsSet("engagementIsPlaying", e);
        var n = ((engagementIsPlaying = e) ? engagementLastNoPlayTime : engagementLastPlayTime) - engagementLastChangeTime;
        n /= 2e4,
            lsSet("engagementValue", engagementValue = e ? lerptt(engagementValue, 0, .01, n / 100) : lerptt(engagementValue, 1, .01, n)),
            lsSet("engagementLastChangeTime", engagementLastChangeTime = t)
    }
    e ? (lsSet("engagementLastPlayTime", t),
        engagementLastPlayTime = t) : engagementLastNoPlayTime = t
}
engagementValue = void 0 === engagementValue ? .5 : parseFloat(engagementValue);
var retentionSamples = [];
function loopRetentionSamples(e) {
    for (var t = 0; t < retentionSamples.length; t++) {
        var n = retentionSamples[t];
        if (n.secondsFromNow -= e / 1e3,
            n.secondsFromNow < 0) {
            var a = n.sampleId;
            if (-1 == sentRetentionSamples.indexOf(a))
                sentRetentionSamples.push(a),
                    saveSentRetentionSamples(),
                    simpleRequest("http://stats.splix.io/retention.php?value=" + Math.round(100 * engagementValue) + "&id=" + a)
        }
    }
}
var sentRetentionSamples = [];
function loadSentRetentionSamples() {
    var e = localStorage.sentRetentionSamples;
    void 0 === e && (e = "");
    var t = e.split(",");
    sentRetentionSamples = [];
    for (var n = 0; n < t.length; n++) {
        var a = parseInt(t[n]);
        isNaN(a) || sentRetentionSamples.push(a)
    }
}
function saveSentRetentionSamples() {
    lsSet("sentRetentionSamples", sentRetentionSamples.join(","))
}
function loginWithPatreon() {
    lsSet("clickedLoginWithPatreonButton", "true");
    var e = getPatreonRedirectUri();
    window.location = "//www.patreon.com/oauth2/authorize?response_type=code&client_id=29edae8672a352342c2ecda5ff440eda65e5e52ebc7500b02eefb481c94c88b1&scope=users%20pledges-to-me%20my-campaign&redirect_uri=" + encodeURIComponent(e)
}
function getPatreonRedirectUri() {
    return location.origin + location.pathname
}
function setPatreonOverlay(e, t) {
    document.getElementById("patreonOverlay").style.display = e ? null : "none",
        void 0 !== t && (document.getElementById("patreonBox").innerHTML = t)
}
function requestPatreonPledgeData(t) {
    void 0 === localStorage.patreonDeviceId || "" == localStorage.patreonDeviceId ? resetPatreonPledgedData() : simpleRequest("https://patreon.splix.io/requestPledge2.php?deviceId=" + localStorage.patreonDeviceId, function (e) {
        "pledged" in (e = JSON.parse(e)) && "splixCode" in e ? (lsSet("patreonLastPledgedValue", e.pledged),
            lsSet("patreonLastSplixCode", e.splixCode),
            t && setPatreonOverlay(true, '<h2 style="margin-top: 0;">All set!</h2><p>Successfully logged in with patreon.<br>Reload the page to activate your pledge.</p><a class="fancyBox fancyBtn" href="javascript:window.location.href = window.location.origin + window.location.pathname + \'#nohttpsredirect\'">Reload</a>')) : resetPatreonPledgedData()
    })
}
function resetPatreonPledgedData() {
    lsSet("patreonLastPledgedValue", 0),
        lsSet("patreonLastSplixCode", "")
}
function testPatreonAdsAllowed() {
    return "true" != localStorage.fuckAds && !(0 < localStorage.patreonLastPledgedValue)
}
function checkPatreonQuery() {
    var e = parseQuery(location.href)
        , t = !1;
    return "code" in e && "true" == localStorage.clickedLoginWithPatreonButton && ("true" == localStorage.skipPatreon ? console.log("code: ", e.code) : (deviceType != DeviceTypes.DESKTOP && confirm("Would you like to activate patreon in the app?") ? openSplixApp("patreoncode-" + e.code) : (setPatreonOverlay(true, "Logging in with patreon..."),
        simpleRequest("https://patreon.splix.io/login2.php?code=" + e.code + "&redirectUri=" + encodeURIComponent(getPatreonRedirectUri()), function (e) {
            lsSet("patreonDeviceId", e),
                requestPatreonPledgeData(!0)
        })),
        t = !0)),
        lsSet("clickedLoginWithPatreonButton", "false"),
        t
}
function removeBlocksOutsideViewport(e) {
    for (i = blocks.length - 1; 0 <= i; i--) {
        var t = blocks[i];
        (t.x < e[0] - 2 * VIEWPORT_RADIUS || t.x > e[0] + 2 * VIEWPORT_RADIUS || t.y < e[1] - 2 * VIEWPORT_RADIUS || t.y > e[1] + 2 * VIEWPORT_RADIUS) && blocks.splice(i, 1)
    }
}
function getColorForBlockSkinId(e) {
    switch (e) {
        case 0:
            return colors.red;
        case 1:
            return colors.red2;
        case 2:
            return colors.pink;
        case 3:
            return colors.pink2;
        case 4:
            return colors.purple;
        case 5:
            return colors.blue;
        case 6:
            return colors.blue2;
        case 7:
            return colors.green;
        case 8:
            return colors.green2;
        case 9:
            return colors.leaf;
        case 10:
            return colors.yellow;
        case 11:
            return colors.orange;
        case 12:
            return colors.gold;
        default:
            return {
                brighter: "#000000",
                darker: "#000000",
                slightlyBrighter: "#000000"
            }
    }
}
function ctxCanvasSize(e, t) {
    var n = window.innerWidth
        , a = window.innerHeight;
    canvasTransformType == canvasTransformTypes.TUTORIAL && (n = a = 300),
        canvasTransformType == canvasTransformTypes.SKIN_BUTTON && (n = a = 30),
        canvasTransformType == canvasTransformTypes.LIFE && (n = a = 60),
        canvasTransformType == canvasTransformTypes.TITLE && (n = 520,
            a = 180);
    var i = t ? 1 : canvasQuality
        , o = e.canvas;
    o.width = n * MAX_PIXEL_RATIO * i,
        o.height = a * MAX_PIXEL_RATIO * i;
    var r = 1;
    canvasTransformType == canvasTransformTypes.TITLE && (r = Math.min(1, (window.innerWidth - 30) / n)),
        o.style.width = n * r + "px",
        o.style.height = a * r + "px"
}
loadSentRetentionSamples();
var canvasTransformTypes = {
    MAIN: 1,
    TUTORIAL: 2,
    SKIN: 3,
    SKIN_BUTTON: 4,
    TITLE: 5,
    LIFE: 6
}
    , canvasTransformType = canvasTransformTypes.MAIN;
function ctxApplyCamTransform(e, t, n) {
    t && ctxCanvasSize(e, n),
        e.save();
    var a = n ? 1 : canvasQuality;
    if (canvasTransformType != canvasTransformTypes.MAIN && canvasTransformType != canvasTransformTypes.SKIN && e.setTransform(MAX_PIXEL_RATIO * a, 0, 0, MAX_PIXEL_RATIO * a, 0, 0),
        canvasTransformType == canvasTransformTypes.MAIN || canvasTransformType == canvasTransformTypes.SKIN) {
        var i = canvasTransformType == canvasTransformTypes.MAIN;
        e.translate(mainCanvas.width / 2, mainCanvas.height / 2);
        var o = Math.max(mainCanvas.width, mainCanvas.height) / MAX_ZOOM
            , r = mainCanvas.width * mainCanvas.height / BLOCKS_ON_SCREEN
            , s = Math.sqrt(r) / 10;
        zoom = Math.max(s, o),
            i && e.rotate(camRotOffset),
            e.scale(zoom, zoom),
            i ? e.translate(10 * -camPosPrevFrame[0] - camPosOffset[0], 10 * -camPosPrevFrame[1] - camPosOffset[1]) : e.translate(10 * -VIEWPORT_RADIUS, 10 * -VIEWPORT_RADIUS)
    } else
        canvasTransformType != canvasTransformTypes.TUTORIAL && canvasTransformType != canvasTransformTypes.SKIN_BUTTON || e.scale(3, 3)
}
function doCamShake(e, t, n) {
    void 0 === n && (n = !0),
        camShakeForces.push([e, t, 0, !!n])
}
function doCamShakeDir(e, t, n) {
    void 0 === t && (t = 6);
    var a = 0
        , i = 0;
    switch (e) {
        case 0:
            a = t;
            break;
        case 1:
            i = t;
            break;
        case 2:
            a = -t;
            break;
        case 3:
            i = -t
    }
    doCamShake(a, i, n)
}
function calcCamOffset() {
    camPosOffset = [0, 0],
        camRotOffset = 0;
    for (var e = camShakeForces.length - 1; 0 <= e; e--) {
        var t = camShakeForces[e];
        t[2] += .003 * deltaTime;
        var n = t[2]
            , a = 0
            , i = 0;
        n < 1 ? (i = ease.out(n),
            a = ease.inout(n)) : n < 8 ? (i = ease.inout(iLerp(8, 1, n)),
                a = ease.in(iLerp(8, 1, n))) : camShakeForces.splice(e, 1),
            camPosOffset[0] += t[0] * i,
            camPosOffset[1] += t[1] * i,
            camPosOffset[0] += t[0] * Math.cos(8 * n) * .04 * a,
            camPosOffset[1] += t[1] * Math.cos(7 * n) * .04 * a,
            t[3] && (camRotOffset += .003 * Math.cos(9 * n) * a)
    }
    camPosOffset[0] /= 80,
        camPosOffset[1] /= 80,
        camPosOffset[0] = smoothLimit(camPosOffset[0]),
        camPosOffset[1] = smoothLimit(camPosOffset[1]),
        camPosOffset[0] *= 80,
        camPosOffset[1] *= 80
}
function lerp(e, t, n) {
    return e + n * (t - e)
}
function iLerp(e, t, n) {
    return (n - e) / (t - e)
}
function lerpt(e, t, n) {
    return lerptt(e, t, n, deltaTime / 16.6666)
}
function lerptt(e, t, n, a) {
    return lerp(e, t, 1 - Math.pow(1 - n, a))
}
function lerpA(e, t, n) {
    for (var a = [], i = 0; i < e.length; i++)
        a.push(lerp(e[i], t[i], n));
    return a
}
function mod(e, t) {
    return (e % t + t) % t
}
function clamp(e, t, n) {
    return Math.max(t, Math.min(n, e))
}
function clamp01(e) {
    return clamp(e, 0, 1)
}
function randFromArray(e) {
    return e[Math.floor(Math.random() * e.length)]
}
function smoothLimit(e) {
    var t = e < 0;
    return t && (e *= -1),
        e = 1 - Math.pow(2, -e),
        t && (e *= -1),
        e
}
function updateStats() {
    totalPlayers < myRank && myRankSent ? totalPlayers = myRank : (totalPlayers < myRank || 0 === myRank && 0 < totalPlayers) && (myRank = totalPlayers),
        myRankElem.innerHTML = myRank,
        totalPlayersElem.innerHTML = totalPlayers
}
function drawTrailOnCtx(e, t, n) {
    if (0 < t.length)
        for (var a = 0; a < e.length; a++) {
            var i = e[a]
                , o = i.ctx;
            o.lineCap = "round",
                o.lineJoin = "round",
                o.lineWidth = 6,
                o.strokeStyle = i.color;
            var r = i.offset;
            o.beginPath(),
                o.moveTo(10 * t[0][0] + r, 10 * t[0][1] + r);
            for (var s = 1; s < t.length; s++)
                o.lineTo(10 * t[s][0] + r, 10 * t[s][1] + r);
            null !== n && o.lineTo(10 * n[0] + r, 10 * n[1] + r),
                o.stroke()
        }
}
function drawDiagonalLines(e, t, n, a, i) {
    if (0 < n) {
        e.lineCap = "butt",
            e.strokeStyle = t,
            e.lineWidth = n;
        var o = 20 * VIEWPORT_RADIUS
            , r = 0
            , s = 0;
        null !== camPosPrevFrame && canvasTransformType == canvasTransformTypes.MAIN && (r = Math.round((10 * camPosPrevFrame[0] - o / 2) / a) * a,
            s = Math.round((10 * camPosPrevFrame[1] - o / 2) / a) * a),
            r += i % a;
        for (var l = -o; l < o; l += a) {
            var c = r + l;
            e.beginPath(),
                e.moveTo(c, s),
                e.lineTo(c + o, s + o),
                e.stroke()
        }
    }
}
function drawAnimatedText(e, t, n, a, i, o, r, s, l, c, d) {
    var m;
    void 0 === r && (r = "white"),
        e.fillStyle = r,
        void 0 === s && (s = "Arial, Helvetica, sans-serif"),
        e.font = s = o + "px " + s,
        void 0 === d && (d = 0);
    for (var u = 0, p = 0; p < transitionText.length; p++) {
        var h = rndSeed(p + d);
        void 0 === c && (c = 3);
        var g = n * c - h * (c - h)
            , f = transitionText[p]
            , v = e.measureText(f).width
            , T = i - .77 * o;
        if (g < .8)
            tempCanvas.width = v,
                tempCanvas.height = o,
                tempCtx.font = s,
                tempCtx.fillStyle = "white",
                tempCtx.fillText(f, 0, .77 * o),
                g < .4 ? (m = g / .4,
                    tempCtx.beginPath(),
                    tempCtx.moveTo(0, lerp(o, 0, m)),
                    tempCtx.lineTo(0, o),
                    tempCtx.lineTo(lerp(0, v, m), o),
                    tempCtx.closePath()) : (m = g / .4 - 1,
                        tempCtx.moveTo(0, 0),
                        tempCtx.lineTo(0, o),
                        tempCtx.lineTo(v, o),
                        tempCtx.lineTo(v, lerp(o, 0, m)),
                        tempCtx.lineTo(lerp(0, v, m), 0)),
                tempCtx.globalCompositeOperation = "destination-in",
                tempCtx.fill(),
                e.drawImage(tempCanvas, a + u, T);
        else {
            var y = (m = Math.min(1, 5 * g - 4)) * l;
            e.fillStyle = colors.green2.darker;
            for (var S = 0; S < y; S++)
                e.fillText(f, a + u - y + S, i - y + S);
            e.fillStyle = "white",
                e.fillText(f, a + u - y, i - y)
        }
        u += v - .5
    }
}
function orderTwoPos(e, t) {
    return [[Math.min(e[0], t[0]), Math.min(e[1], t[1])], [Math.max(e[0], t[0]), Math.max(e[1], t[1])]]
}
function fillArea(e, t, n, a, i, o, r) {
    var s = void 0 === r;
    s && (r = blocks),
        void 0 === o && (o = 0);
    var l = e + n
        , c = t + a;
    null !== myPos && s && (e = Math.max(e, Math.round(myPos[0]) - VIEWPORT_RADIUS),
        t = Math.max(t, Math.round(myPos[1]) - VIEWPORT_RADIUS),
        l = Math.min(l, Math.round(myPos[0]) + VIEWPORT_RADIUS),
        c = Math.min(c, Math.round(myPos[1]) + VIEWPORT_RADIUS));
    for (var d = e; d < l; d++)
        for (var m = t; m < c; m++) {
            var u = getBlock(d, m, r)
                , p = applyPattern(i, o, d, m);
            u.setBlockId(p, 400 * Math.random())
        }
}
function applyPattern(e, t, n, a) {
    var i, o;
    if (e < 2)
        return e;
    var r = !1;
    switch (t) {
        case 1:
            r = n % 2 == 0 && a % 2 == 0;
            break;
        case 2:
            r = n % 2 == (a % 2 == 0 ? 0 : 1);
            break;
        case 3:
            r = a % 3 < 1 ? 0 < n % 3 : n % 3 < 1;
            break;
        case 4:
            r = n % 5 == 0 || a % 5 == 0;
            break;
        case 5:
            r = (n - a) % 5 == 0;
            break;
        case 6:
            r = .5 < Math.random();
            break;
        case 7:
            i = (n + 7) % 100,
                r = (o = (a + 7) % 100) < 2 && (i < 2 || 3 < i && i < 6) || 2 == o && 1 < i && i < 4 || 2 < o && o < 5 && 0 < i && i < 5 || 5 == o && (1 == i || 4 == i);
            break;
        case 8:
            r = n % 2 == (a % 2 == 0 ? 0 : 1) && n % 4 != 0 && a % 4 != 1;
            break;
        case 9:
            r = mod(n % 8 < 4 ? n + a : n - a - 4, 8) < 3;
            break;
        case 10:
            r = n % 2 == (a % 2 == 0 ? 0 : 1) && mod(n % 8 < 4 ? n + a : n - a - 4, 8) < 3;
            break;
        case 11:
            o = a % 10,
                r = (0 === (i = n % 10) || 6 == i) && o < 7 || (2 == i || 4 == i) && 1 < o && o < 5 || (7 == i || 9 == i) && 6 < o || (0 === o || 6 == o) && i < 7 || (2 == o || 4 == o) && 1 < i && i < 5 || (7 == o || 9 == o) && 6 < i;
            break;
        case 12:
            i = (a % 12 < 6 ? n + 5 : n) % 10,
                r = (o = a % 6) < 4 && 0 < i && i < 6 && 3 != i || 0 < o && o < 3 && i < 7 || 1 < i && i < 5 && 2 < o && o < 5 || 3 == i && 5 == o;
            break;
        case 13:
            r = !(!((n + a) % 10 < 1 || mod(n - a, 10) < 1 || (n + 1) % 10 < 3 && (a + 1) % 10 < 3 || (n + 6) % 10 < 3 && (a + 6) % 10 < 3) || n % 10 == 0 && a % 10 == 0 || n % 10 == 5 && a % 10 == 5);
            break;
        case 14:
            o = a % 5,
                r = (1 == (i = (a % 10 < 5 ? n + 5 : n) % 10) || 4 == i) && 1 < o && o < 4 || (1 == o || 4 == o) && 1 < i && i < 4;
            break;
        case 15:
            r = (n + a) % 6 < 1 || mod(n - a, 6) < 1 && n % 6 < 3;
            break;
        case 16:
            o = a % 6,
                r = 1 == (i = n % 6) && 2 < o && o < 5 || 4 == i && 0 < o && o < 3 || 4 == o && 2 < i && i < 5 || 1 == o && 0 < i && i < 3;
            break;
        case 17:
            r = .99 < Math.random();
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
            var s, l, c, d = 0, m = 0;
            switch (t) {
                case 18:
                    c = l = 18,
                        m = 6,
                        s = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0], [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0], [1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0], [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]];
                    break;
                case 19:
                    l = 14,
                        c = 10,
                        d = 7,
                        s = [[m = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                    break;
                case 20:
                    l = 12,
                        c = 7,
                        d = 6,
                        s = [[m = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1], [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0]];
                    break;
                case 21:
                    l = 17,
                        c = 15,
                        m = 5,
                        s = [[1, 1, 1, 1, 1, d = 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1], [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
                    break;
                case 22:
                    c = l = 10,
                        s = [[1, m = d = 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 1, 0, 1, 0, 1, 0, 0], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0], [1, 1, 1, 1, 0, 1, 0, 1, 1, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 1, 0, 1, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0], [1, 0, 0, 1, 0, 1, 0, 1, 0, 0], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0]];
                    break;
                case 23:
                    l = 12,
                        c = 7,
                        d = 6,
                        s = [[m = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1], [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1], [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1]];
                    break;
                case 24:
                    l = 14,
                        c = 13,
                        d = 7,
                        s = [[1, 1, 1, 1, m = 0, 1, 0, 0, 0, 1, 0, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], [1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1]];
                    break;
                case 25:
                    l = 22,
                        c = 7,
                        d = 11,
                        s = [[m = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]];
                    break;
                case 26:
                    l = 15,
                        c = 19,
                        m = 6,
                        s = [[d = 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                    break;
                case 27:
                    c = l = 10,
                        m = 5,
                        s = [[d = 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0, 0, 0], [1, 0, 1, 1, 1, 0, 1, 1, 0, 0], [1, 0, 1, 1, 1, 1, 0, 1, 0, 0], [1, 0, 1, 1, 1, 1, 0, 1, 0, 0], [1, 0, 1, 1, 1, 0, 1, 1, 0, 0], [1, 0, 1, 0, 0, 1, 1, 0, 0, 0], [1, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            }
            i = (n + (d *= Math.floor(a / c))) % l,
                r = 1 == s[o = (a + (m *= Math.floor(n / l))) % c][i]
    }
    return r && (e += SKIN_BLOCK_COUNT),
        e
}
var currentTopNotifications = [];
function doTopNotification(e) {
    var t = {
        text: e,
        elem: null,
        initiate: function () {
            var e = document.createElement("div");
            (this.elem = e).innerHTML = this.text,
                e.className = "topNotification greenBox",
                e.style.visibility = "hidden",
                document.getElementById("topNotifications").appendChild(e);
            var t = getColorForBlockSkinId(myColorId);
            colorBox(e, t.brighter, t.darker)
        },
        animationTimer: 0,
        animationDirection: 1,
        update: function (e) {
            this.animationTimer += .001 * e * this.animationDirection;
            var t = lerp(-this.elem.offsetHeight - 10, 10, ease.out(clamp01(this.animationTimer)));
            this.elem.style.top = t + "px",
                this.elem.style.visibility = null,
                -1 == this.animationDirection && this.animationTimer < 0 && this.destroy()
        },
        animateOut: function () {
            this.animationDirection = -1,
                1 < this.animationTimer && (this.animationTimer = 1)
        },
        destroy: function () {
            this.elem.parentElement.removeChild(this.elem);
            for (var e = currentTopNotifications.length - 1; 0 <= e; e--) {
                currentTopNotifications[e] == this && currentTopNotifications.splice(e, 1)
            }
        }
    };
    return t.initiate(),
        currentTopNotifications.push(t),
        t
}
function bindSwipeEvents() {
    touchControlsElem.addEventListener("touchstart", onTouchStart),
        touchControlsElem.addEventListener("touchmove", onTouchMove),
        touchControlsElem.addEventListener("touchend", onTouchEnd),
        touchControlsElem.addEventListener("touchcancel", onTouchEnd)
}
function onTouchStart(e) {
    var t = e.touches[e.touches.length - 1];
    currentTouches.push({
        prevPos: [t.pageX, t.pageY],
        prevTime: Date.now(),
        id: t.identifier
    })
}
function onTouchMove(e) {
    for (var t = e.touches, n = 0; n < t.length; n++) {
        for (var a = t[n], i = null, o = 0; o < currentTouches.length; o++)
            if (currentTouches[o].id == a.identifier) {
                i = currentTouches[o];
                break
            }
        i && calcTouch(i, a)
    }
    e.preventDefault()
}
function calcTouch(e, t) {
    var n = Date.now()
        , a = n - e.prevTime
        , i = [t.pageX, t.pageY]
        , o = e.prevPos
        , r = o[0] - i[0]
        , s = o[1] - i[1]
        , l = Math.sqrt(Math.pow(r, 2) + Math.pow(s, 2)) / a;
    l *= MAX_PIXEL_RATIO * canvasQuality,
        e.prevTime = n,
        e.prevPos = i,
        0 < a && 2 < l && (Math.abs(r) > Math.abs(s) ? sendDir(0 < r ? 2 : 0) : sendDir(0 < s ? 3 : 1))
}
function onTouchEnd(e) {
    for (var t = currentTouches.length - 1; 0 <= t; t--)
        for (var n = 0; n < e.touches.length; n++)
            currentTouches[t].id == e.touches[n].identifier && (calcTouch(currentTouches[t], e.touches[n]),
                currentTouches.splice(t, 1))
}
function doTransition(e, t, n, a, i) {
    isTransitioning && !i || (transitionText = e,
        isTransitioning = true,
        transitionDirection = 1,
        transitionTimer = transitionPrevTimer = 0,
        transitionCanvas.style.display = null,
        void 0 === t && (t = !1),
        transitionReverseOnHalf = t,
        transitionCallback1 = n,
        transitionCallback2 = a)
}
function doSkipDeathTransition() {
    allowSkipDeathTransition && (null !== deathTransitionTimeout && (window.clearTimeout(deathTransitionTimeout),
        deathTransitionTimeout = null,
        onClose(),
        doTransition("", false, function () {
            window.setTimeout(afterDeath, 700),
                resetAll()
        })),
        skipDeathTransition = !0)
}
function rndSeed(e) {
    var t = 1e4 * Math.sin(e);
    return t - Math.floor(t)
}
var ease = {
    in: function (e) {
        return e * e * e * e
    },
    out: function (e) {
        return 1 - Math.pow(1 - e, 4)
    },
    inout: function (e) {
        return e < .5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2
    }
};
function drawTitle(e, t, n, a, i) {
    e.strokeStyle = n ? colors.red.patternEdge : colors.red.brighter,
        e.lineWidth = 16,
        e.lineJoin = "round",
        e.lineCap = "round",
        i ? (e.shadowBlur = 40 * MAX_PIXEL_RATIO,
            e.shadowColor = "rgba(0,0,0,0.4)",
            e.shadowOffsetX = e.shadowOffsetY = 10 * MAX_PIXEL_RATIO) : e.shadowColor = "rgba(0,0,0,0)";
    for (var o = titleTimer, r = 0; r < titleLines.length; r++) {
        var s = titleLines[r]
            , l = clamp01(o * s.speed - s.offset)
            , c = clamp01(o);
        c *= 5,
            void 0 !== a && (c = Math.min(c, a)),
            e.beginPath();
        for (var d = 0; d < s.line.length; d++) {
            var m = s.line[d]
                , u = clamp01(l * (s.line.length - 1) - d + 1);
            if (0 < u)
                if (1 == u)
                    0 === d && 2 == m.length ? e.moveTo(m[0] - c, m[1] - c) : 2 == m.length ? e.lineTo(m[0] - c, m[1] - c) : 6 == m.length && e.bezierCurveTo(m[0] - c, m[1] - c, m[2] - c, m[3] - c, m[4] - c, m[5] - c);
                else {
                    var p = s.line[d - 1]
                        , h = [p[p.length - 2], p[p.length - 1]];
                    if (2 == m.length)
                        e.lineTo(lerp(h[0], m[0], u) - c, lerp(h[1], m[1], u) - c);
                    else if (6 == m.length) {
                        var g = h
                            , f = [m[0], m[1]]
                            , v = [m[2], m[3]]
                            , T = [m[4], m[5]]
                            , y = lerpA(g, f, u)
                            , S = lerpA(f, v, u)
                            , C = lerpA(v, T, u)
                            , P = lerpA(y, S, u)
                            , x = lerpA(P, lerpA(S, C, u), u);
                        e.bezierCurveTo(y[0] - c, y[1] - c, P[0] - c, P[1] - c, x[0] - c, x[1] - c)
                    }
                }
        }
        e.stroke()
    }
}
function drawBlocks(e, t, n) {
    for (var a, i = 0; i < t.length; i++) {
        var o = t[i];
        if (n && (o.x < camPos[0] - VIEWPORT_RADIUS || o.x > camPos[0] + VIEWPORT_RADIUS || o.y < camPos[1] - VIEWPORT_RADIUS || o.y > camPos[1] + VIEWPORT_RADIUS))
            ;
        else if (0 < o.animDelay ? o.animDelay -= deltaTime : o.animProgress += deltaTime * o.animDirection * .003,
            1 < o.animProgress && (o.animDirection = 0,
                o.animProgress = 1),
            o.animProgress < 0)
            o.currentBlock = o.nextBlock,
                o.animDirection = 1,
                o.animProgress = 0;
        else {
            var r = o.animProgress;
            if (0 === o.currentBlock && (e.fillStyle = colors.red.boundsDark,
                e.fillRect(10 * o.x, 10 * o.y, 10, 10),
                uglyMode || (linesCtx.fillStyle = colors.grey.diagonalLines,
                    linesCtx.fillRect(10 * o.x, 10 * o.y, 10, 10))),
                1 == o.currentBlock && (.8 < r && !uglyMode && (e.fillStyle = colors.grey.darker,
                    e.fillRect(10 * o.x + 2, 10 * o.y + 2, 7, 7)),
                    e.fillStyle = colors.grey.brighter,
                    1 == r || uglyMode ? e.fillRect(10 * o.x + 1, 10 * o.y + 1, 7, 7) : r < .4 ? (a = 2.5 * r,
                        e.beginPath(),
                        e.moveTo(10 * o.x + 2, 10 * o.y + lerp(9, 2, a)),
                        e.lineTo(10 * o.x + 2, 10 * o.y + 9),
                        e.lineTo(10 * o.x + lerp(2, 9, a), 10 * o.y + 9),
                        e.fill()) : r < .8 ? (a = 2.5 * r - 1,
                            e.beginPath(),
                            e.moveTo(10 * o.x + 2, 10 * o.y + 2),
                            e.lineTo(10 * o.x + 2, 10 * o.y + 9),
                            e.lineTo(10 * o.x + 9, 10 * o.y + 9),
                            e.lineTo(10 * o.x + 9, 10 * o.y + lerp(9, 2, a)),
                            e.lineTo(10 * o.x + lerp(2, 9, a), 10 * o.y + 2),
                            e.fill()) : (a = 5 * r - 4,
                                e.fillRect(10 * o.x + lerp(2, 1, a), 10 * o.y + lerp(2, 1, a), 7, 7))),
                2 <= o.currentBlock) {
                var s = (o.currentBlock - 2) % SKIN_BLOCK_COUNT
                    , l = getColorForBlockSkinId(s)
                    , c = o.currentBlock > SKIN_BLOCK_COUNT + 1
                    , d = c ? l.pattern : l.brighter
                    , m = c ? l.patternEdge : l.darker;
                .8 < r && !uglyMode && (e.fillStyle = m,
                    e.fillRect(10 * o.x + 1, 10 * o.y + 1, 9, 9)),
                    e.fillStyle = d,
                    1 == r || uglyMode ? (e.fillRect(10 * o.x, 10 * o.y, 9, 9),
                        12 != s || uglyMode || (e.fillStyle = colors.gold.bevelBright,
                            e.fillRect(10 * o.x + 3, 10 * o.y + .1, 6, .1))) : r < .4 ? (a = 2.5 * r,
                                e.beginPath(),
                                e.moveTo(10 * o.x + 1, 10 * o.y + lerp(10, 1, a)),
                                e.lineTo(10 * o.x + 1, 10 * o.y + 10),
                                e.lineTo(10 * o.x + lerp(1, 10, a), 10 * o.y + 10),
                                e.fill()) : r < .8 ? (a = 2.5 * r - 1,
                                    e.beginPath(),
                                    e.moveTo(10 * o.x + 1, 10 * o.y + 1),
                                    e.lineTo(10 * o.x + 1, 10 * o.y + 10),
                                    e.lineTo(10 * o.x + 10, 10 * o.y + 10),
                                    e.lineTo(10 * o.x + 10, 10 * o.y + lerp(10, 1, a)),
                                    e.lineTo(10 * o.x + lerp(1, 10, a), 10 * o.y + 1),
                                    e.fill()) : (a = 5 * r - 4,
                                        e.fillRect(10 * o.x + lerp(1, 0, a), 10 * o.y + lerp(1, 0, a), 9, 9))
            }
        }
    }
}
function drawPlayer(e, t, n) {
    if (t.hasReceivedPosition) {
        var a, i, o = getColorForBlockSkinId(t.skinBlock);
        if (0 < t.trails.length)
            for (var r = t.trails.length - 1; 0 <= r; r--) {
                var s = t.trails[r]
                    , l = r == t.trails.length - 1;
                if (!l || t.isDead) {
                    if (uglyMode)
                        s.vanishTimer = 10;
                    else {
                        var c = t.isDead && l ? .006 : .02;
                        s.vanishTimer += deltaTime * c
                    }
                    !l && 10 < s.vanishTimer && t.trails.splice(r, 1)
                }
                if (0 < s.trail.length) {
                    var d = l ? t.drawPos : null;
                    0 < s.vanishTimer && !uglyMode ? (ctxApplyCamTransform(tempCtx, !0),
                        drawTrailOnCtx([{
                            ctx: tempCtx,
                            color: o.darker,
                            offset: 5
                        }, {
                            ctx: tempCtx,
                            color: o.brighter,
                            offset: 4
                        }], s.trail, d),
                        tempCtx.globalCompositeOperation = "destination-out",
                        drawDiagonalLines(tempCtx, "white", s.vanishTimer, 10, .003 * n),
                        e.restore(),
                        tempCtx.restore(),
                        linesCtx.restore(),
                        e.drawImage(tempCanvas, 0, 0),
                        tempCtx.fillStyle = colors.grey.diagonalLines,
                        tempCtx.globalCompositeOperation = "source-in",
                        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height),
                        linesCtx.drawImage(tempCanvas, 0, 0),
                        ctxApplyCamTransform(e),
                        ctxApplyCamTransform(linesCtx)) : s.vanishTimer < 10 && drawTrailOnCtx(uglyMode ? [{
                            ctx: e,
                            color: o.darker,
                            offset: 5
                        }, {
                            ctx: e,
                            color: o.brighter,
                            offset: 4
                        }] : [{
                            ctx: e,
                            color: o.darker,
                            offset: 5
                        }, {
                            ctx: e,
                            color: o.brighter,
                            offset: 4
                        }, {
                            ctx: linesCtx,
                            color: colors.grey.diagonalLines,
                            offset: 4
                        }], s.trail, d)
                }
            }
        var m = [10 * t.drawPos[0] + 4.5, 10 * t.drawPos[1] + 4.5]
            , u = e.createRadialGradient(m[0] - 3, m[1] - 3, 0, m[0], m[1], 6);
        if (u.addColorStop(0, o.slightlyBrighter),
            u.addColorStop(1, o.brighter),
            linesCtx.fillStyle = "white",
            t.isDead) {
            t.isDeadTimer += .003 * deltaTime,
                e.fillStyle = u;
            for (var p = 0; p < t.deadAnimParts.length - 1; p++) {
                var h = t.deadAnimParts[p]
                    , g = t.deadAnimParts[p + 1]
                    , f = lerp(h, g, .5)
                    , v = t.dir * Math.PI / 2 - Math.PI
                    , T = Math.min(Math.abs(v - f), Math.abs(v - 2 * Math.PI - f), Math.abs(v + 2 * Math.PI - f))
                    , y = t.deadAnimPartsRandDist[p]
                    , S = (1 - Math.pow(2, -2 * t.isDeadTimer)) * T * 5 * (y + 1)
                    , C = [Math.cos(f) * S, Math.sin(f) * S];
                e.globalAlpha = linesCtx.globalAlpha = Math.max(0, 1 - .2 * t.isDeadTimer),
                    e.beginPath(),
                    e.arc(m[0] - .3 + C[0], m[1] - .3 + C[1], 6, h, g, !1),
                    e.lineTo(m[0] - .3 + C[0], m[1] - .3 + C[1]),
                    e.fill(),
                    uglyMode || (linesCtx.beginPath(),
                        linesCtx.arc(m[0] - .3 + C[0], m[1] - .3 + C[1], 6, h, g, !1),
                        linesCtx.lineTo(m[0] - .3 + C[0], m[1] - .3 + C[1]),
                        linesCtx.fill())
            }
            e.globalAlpha = linesCtx.globalAlpha = 1
        } else
            e.fillStyle = o.darker,
                e.beginPath(),
                e.arc(m[0] + .3, m[1] + .3, 6, 0, 2 * Math.PI, !1),
                e.fill(),
                e.fillStyle = u,
                e.beginPath(),
                e.arc(m[0] - .3, m[1] - .3, 6, 0, 2 * Math.PI, !1),
                e.fill(),
                t.isMyPlayer && "true" == localStorage.drawWhiteDot && (e.fillStyle = "white",
                    e.beginPath(),
                    e.arc(m[0] - .3, m[1] - .3, 1, 0, 2 * Math.PI, !1),
                    e.fill()),
                uglyMode || (linesCtx.beginPath(),
                    linesCtx.arc(m[0] + .3, m[1] + .3, 6, 0, 2 * Math.PI, !1),
                    linesCtx.fill(),
                    linesCtx.beginPath(),
                    linesCtx.arc(m[0] - .3, m[1] - .3, 6, 0, 2 * Math.PI, !1),
                    linesCtx.fill());
        if (t.isMyPlayer && "true" == localStorage.drawActualPlayerPos && (e.fillStyle = "#FF0000",
            e.beginPath(),
            e.arc(10 * t.serverPos[0] + 5, 10 * t.serverPos[1] + 5, 6, 0, 2 * Math.PI, !1),
            e.fill()),
            0 < t.hitLines.length)
            for (var P = t.hitLines.length - 1; 0 <= P; P--) {
                var x = t.hitLines[P];
                x.vanishTimer += .004 * deltaTime;
                var E, A, I = x.vanishTimer;
                if (4 < I && t.hitLines.splice(P, 1),
                    a = 10 * x.pos[0] + 5,
                    i = 10 * x.pos[1] + 5,
                    I < 2) {
                    var k = Math.max(0, 18 * ease.out(iLerp(0, 2, I)))
                        , b = Math.max(0, 18 * ease.out(iLerp(.5, 2, I)));
                    e.fillStyle = o.brighter,
                        e.beginPath(),
                        e.arc(a, i, k, 0, 2 * Math.PI, !1),
                        e.arc(a, i, b, 0, 2 * Math.PI, !1),
                        e.fill("evenodd"),
                        uglyMode || (linesCtx.beginPath(),
                            linesCtx.arc(a, i, k, 0, 2 * Math.PI, !1),
                            linesCtx.arc(a, i, b, 0, 2 * Math.PI, !1),
                            linesCtx.fill("evenodd"))
                }
                if (void 0 !== x.color && t.isMyPlayer)
                    e.save(),
                        e.font = linesCtx.font = "6px Arial, Helvetica, sans-serif",
                        e.fillStyle = x.color.brighter,
                        e.shadowColor = x.color.darker,
                        e.shadowOffsetX = e.shadowOffsetY = .4 * MAX_PIXEL_RATIO * zoom * canvasQuality,
                        w = e.measureText("+500").width,
                        A = clamp01(A = I < .5 ? iLerp(0, .5, I) : I < 3.5 ? 1 : iLerp(4, 3.5, I)),
                        E = I < 2 ? 20 * ease.out(I / 2) : 20,
                        e.globalAlpha = A,
                        e.fillText("+500", a - w / 2, i - E),
                        e.restore()
            }
        if (t.honkTimer < t.honkMaxTime && (t.honkTimer += .255 * deltaTime,
            e.fillStyle = o.brighter,
            e.globalAlpha = clamp01(iLerp(t.honkMaxTime, 0, t.honkTimer)),
            e.beginPath(),
            e.arc(10 * t.drawPos[0] + 4.5 + .3, 10 * t.drawPos[1] + 4.5 + .3, 6 + .1 * t.honkTimer, 0, 2 * Math.PI, !1),
            e.fill(),
            e.globalAlpha = 1,
            uglyMode || (linesCtx.globalAlpha = clamp01(iLerp(t.honkMaxTime, 0, t.honkTimer)),
                linesCtx.beginPath(),
                linesCtx.arc(10 * t.drawPos[0] + 4.5 + .3, 10 * t.drawPos[1] + 4.5 + .3, 6 + .1 * t.honkTimer, 0, 2 * Math.PI, !1),
                linesCtx.fill(),
                linesCtx.globalAlpha = 1)),
            "true" != localStorage.hidePlayerNames && (myNameAlphaTimer += .001 * deltaTime,
                e.font = linesCtx.font = USERNAME_SIZE + "px Arial, Helvetica, sans-serif",
                t.name)) {
            var D = 1
                , M = 1;
            t.isMyPlayer && (M = 9 - myNameAlphaTimer),
                t.isDead && (D = 1 - t.isDeadTimer);
            var B = Math.min(D, M);
            if (0 < B) {
                e.save(),
                    uglyMode || linesCtx.save(),
                    e.globalAlpha = clamp01(B);
                var R = e.measureText(t.name).width;
                R = Math.min(100, R),
                    a = 10 * t.drawPos[0] + 5 - R / 2,
                    i = 10 * t.drawPos[1] - 5,
                    e.rect(a - 4, i - 1.2 * USERNAME_SIZE, R + 8, 2 * USERNAME_SIZE),
                    e.clip(),
                    uglyMode || (linesCtx.rect(a - 4, i - 1.2 * USERNAME_SIZE, R + 8, 2 * USERNAME_SIZE),
                        linesCtx.clip(),
                        linesCtx.fillText(t.name, a, i)),
                    e.shadowColor = "rgba(0,0,0,0.9)",
                    e.shadowBlur = 10,
                    e.shadowOffsetX = e.shadowOffsetY = 2,
                    e.fillStyle = o.brighter,
                    e.fillText(t.name, a, i),
                    e.shadowColor = o.darker,
                    e.shadowBlur = 0,
                    e.shadowOffsetX = e.shadowOffsetY = .8,
                    e.fillText(t.name, a, i),
                    e.restore(),
                    uglyMode || linesCtx.restore()
            }
        }
        "Jesper" != t.name || t.isDead || (e.fillStyle = "black",
            e.fillRect(m[0] - 6.5, m[1] - 2, 13, 1),
            e.fillRect(m[0] - 1, m[1] - 2, 2, 2),
            e.fillRect(m[0] - 5.5, m[1] - 2, 5, 3),
            e.fillRect(m[0] + .5, m[1] - 2, 5, 3))
    }
}
function moveDrawPosToPos(e) {
    var t = null;
    t = e.isDead && !e.deathWasCertain ? e.uncertainDeathPosition : e.pos,
        e.drawPos[0] = lerpt(e.drawPos[0], t[0], .23),
        e.drawPos[1] = lerpt(e.drawPos[1], t[1], .23)
}
function movePos(e, t, n) {
    switch (t) {
        case 0:
            e[0] += n;
            break;
        case 1:
            e[1] += n;
            break;
        case 2:
            e[0] -= n;
            break;
        case 3:
            e[1] -= n
    }
}
var qualityText, uglyText, dtCaps = [0, 6.5, 16, 33, 49, 99];
function getDtCap(e) {
    return dtCaps[clamp(e, 0, dtCaps.length - 1)]
}
function toggleQuality() {
    switch (localStorage.quality) {
        case "auto":
            lsSet("quality", "0.4");
            break;
        case "0.4":
            lsSet("quality", "0.7");
            break;
        case "0.7":
            lsSet("quality", "1");
            break;
        case "1":
            lsSet("quality", "auto")
    }
    setQuality()
}
function setQuality() {
    null === localStorage.getItem("quality") && lsSet("quality", "1"),
        "auto" != localStorage.quality ? (canvasQuality = parseFloat(localStorage.quality),
            qualityText.innerHTML = "Quality: " + {
                .4: "low",
                .7: "medium",
                1: "high"
            }[localStorage.quality]) : qualityText.innerHTML = "Quality: auto"
}
function setUglyText() {
    updateUglyMode();
    var e = uglyMode ? "on" : "off";
    uglyText.innerHTML = "Ugly mode: " + e
}
function toggleUglyMode() {
    switch (localStorage.uglyMode) {
        case "true":
            lsSet("uglyMode", "false");
            break;
        case "false":
        default:
            lsSet("uglyMode", "true")
    }
    setUglyText()
}
function updateUglyMode() {
    uglyMode = "true" == localStorage.uglyMode
}
function setLeaderboardVisibility() {
    leaderboardDivElem.style.display = leaderboardHidden ? "none" : null
}
function loop(e) {
    var t, n, a, i, o = e - prevTimeStamp;
    if (lerpedDeltaTime = lerpedDeltaTime < o ? o : lerpt(lerpedDeltaTime, o, .05),
        "auto" != localStorage.quality && null !== localStorage.getItem("quality") || (33 < lerpedDeltaTime ? canvasQuality -= .01 : lerpedDeltaTime < 28 && (canvasQuality += .01),
            canvasQuality = Math.min(1, Math.max(.4, canvasQuality))),
        o < lerp(getDtCap(currentDtCap), getDtCap(currentDtCap - 1), .9))
        for (gainedFrames.push(Date.now()); 190 < gainedFrames.length;) {
            if (!(1e4 < Date.now() - gainedFrames[0])) {
                gainedFrames = [],
                    currentDtCap = clamp(--currentDtCap, 0, dtCaps.length - 1);
                break
            }
            gainedFrames.splice(0, 1)
        }
    if (o > lerp(getDtCap(currentDtCap), getDtCap(currentDtCap + 1), .05))
        for (missedFrames.push(Date.now()),
            gainedFrames = []; 5 < missedFrames.length;) {
            if (!(5e3 < Date.now() - missedFrames[0])) {
                missedFrames = [],
                    currentDtCap = clamp(++currentDtCap, 0, dtCaps.length - 1);
                break
            }
            missedFrames.splice(0, 1)
        }
    if (prevTimeStamp = e,
        (deltaTime = o + totalDeltaTimeFromCap) < getDtCap(currentDtCap) && "true" != localStorage.dontCapFps)
        totalDeltaTimeFromCap += o;
    else {
        totalDeltaTimeFromCap = 0,
            canvasTransformType = canvasTransformTypes.MAIN,
            ctxCanvasSize(ctx),
            uglyMode || ctxCanvasSize(linesCtx),
            ctx.fillStyle = colors.grey.BG,
            ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height),
            uglyMode || (linesCtx.fillStyle = "white",
                linesCtx.fillRect(0, 0, linesCanvas.width, linesCanvas.height)),
            camPosPrevFrame = [camPos[0], camPos[1]],
            calcCamOffset(),
            ctxApplyCamTransform(ctx),
            uglyMode || ctxApplyCamTransform(linesCtx),
            drawBlocks(ctx, blocks, !0);
        for (var r = deltaTime * GLOBAL_SPEED, s = 0; s < players.length; s++) {
            var l = players[s];
            if (!l.isDead || !l.deathWasCertain) {
                if (l.moveRelativeToServerPosNextFrame && (r = (Date.now() - l.lastServerPosSentTime) * GLOBAL_SPEED),
                    l.isMyPlayer && (movePos(l.serverPos, l.serverDir, r),
                        l.serverDir == l.dir)) {
                    var c = 0;
                    "true" != localStorage.dontSlowPlayersDown && (0 === l.dir || 2 == l.dir ? l.pos.y == l.serverPos.y && (c = 0 === l.dir ? l.pos[0] - l.serverPos[0] : l.serverPos[0] - l.pos[0]) : l.pos.x == l.serverPos.x && (c = 1 == l.dir ? l.pos[1] - l.serverPos[1] : l.serverPos[1] - l.pos[1])),
                        r *= lerp(.5, 1, iLerp(5, 0, c = Math.max(0, c)))
                }
                movePos(l.pos, l.dir, r)
            }
            l.moveRelativeToServerPosNextFrame = false,
                moveDrawPosToPos(l);
            var d = !1;
            if (l.drawPos[0] <= 0 || l.drawPos[1] <= 0 || l.drawPos[0] >= mapSize - 1 || l.drawPos[1] >= mapSize - 1)
                d = !0;
            else if (0 < l.trails.length) {
                n = l.trails[l.trails.length - 1].trail;
                var m = [Math.round(l.drawPos[0]), Math.round(l.drawPos[1])];
                if (Math.abs(m[0] - l.drawPos[0]) < .2 && Math.abs(m[1] - l.drawPos[1]) < .2) {
                    var u = !0;
                    for (t = n.length - 3; 0 <= t; t--) {
                        var p = orderTwoPos([Math.round(n[t][0]), Math.round(n[t][1])], [Math.round(n[t + 1][0]), Math.round(n[t + 1][1])]);
                        m[0] >= p[0][0] && m[0] <= p[1][0] && m[1] >= p[0][1] && m[1] <= p[1][1] ? (u || (d = !0),
                            u = !0) : u = !1
                    }
                }
            }
            if (d ? l.isDead || l.die() : l.didUncertainDeathLastTick = false,
                l.isDead && !l.deathWasCertain && 1.5 < l.isDeadTimer && (l.isDead = false,
                    0 < l.trails.length && ((n = l.trails[l.trails.length - 1]).vanishTimer = 0)),
                l.isMyPlayer && (myPos = [l.pos[0], l.pos[1]],
                    miniMapPlayer.style.left = myPos[0] / mapSize * 160 + 1.5 + "px",
                    miniMapPlayer.style.top = myPos[1] / mapSize * 160 + 1.5 + "px",
                    camPosSet ? (camPos[0] = lerpt(camPos[0], l.pos[0], .03),
                        camPos[1] = lerpt(camPos[1], l.pos[1], .03)) : (camPos = [l.pos[0], l.pos[1]],
                            camPosSet = !0),
                    myNextDir != l.dir)) {
                var h = 0 === l.dir || 2 == l.dir;
                if (changeDirAtIsHorizontal != h) {
                    var g = !1
                        , f = l.pos[h ? 0 : 1];
                    if (0 === l.dir || 1 == l.dir ? changeDirAt < f && (g = !0) : f < changeDirAt && (g = !0),
                        g) {
                        var v = [l.pos[0], l.pos[1]]
                            , T = Math.abs(changeDirAt - f);
                        v[h ? 0 : 1] = changeDirAt,
                            changeMyDir(myNextDir, v),
                            movePos(l.pos, l.dir, T)
                    }
                }
            }
            drawPlayer(ctx, l, e)
        }
        if (0 < sendDirQueue.length) {
            var y = sendDirQueue[0];
            (Date.now() - y.addTime > 1.2 / GLOBAL_SPEED || sendDir(y.dir, !0)) && sendDirQueue.shift()
        }
        if (uglyMode || drawDiagonalLines(linesCtx, "white", 5, 10, .008 * e),
            ctx.restore(),
            uglyMode || (linesCtx.restore(),
                ctx.globalCompositeOperation = "multiply",
                ctx.drawImage(linesCanvas, 0, 0),
                ctx.globalCompositeOperation = "source-over"),
            scoreStat = lerpt(scoreStat, scoreStatTarget, .1),
            myScoreElem.innerHTML = Math.round(scoreStat),
            realScoreStat = lerpt(realScoreStat, realScoreStatTarget, .1),
            myRealScoreElem.innerHTML = Math.round(realScoreStat),
            isTransitioning) {
            var S = 60
                , C = 5;
            if (S *= MAX_PIXEL_RATIO,
                C *= MAX_PIXEL_RATIO,
                transitionTimer += deltaTime * transitionDirection * .001,
                1 == transitionDirection && null !== transitionCallback1 && .5 <= transitionTimer && transitionPrevTimer < .5 && (transitionTimer = .5,
                    transitionCallback1()),
                -1 == transitionDirection && null !== transitionCallback2 && transitionTimer <= .5 && .5 < transitionPrevTimer && (transitionTimer = .5,
                    transitionCallback2()),
                transitionReverseOnHalf && 1 == transitionDirection && 3 <= transitionTimer && transitionPrevTimer < 3 && (transitionDirection = -1,
                    transitionTimer = 1),
                (transitionPrevTimer = transitionTimer) <= 0 && transitionReverseOnHalf || 3.5 <= transitionTimer && !transitionReverseOnHalf)
                transitionDirection = 0,
                    isTransitioning = false,
                    transitionCanvas.style.display = "none";
            else {
                ctxCanvasSize(tCtx, !0);
                var P = transitionCanvas.width
                    , x = transitionCanvas.height;
                if ((a = transitionTimer) < .5 ? (i = 2 * a,
                    i = ease.in(i),
                    tCtx.fillStyle = colors.green2.darker,
                    tCtx.fillRect(0, lerp(-10, x / 2, i), P, 10),
                    tCtx.fillStyle = colors.green2.brighter,
                    tCtx.fillRect(0, -10, P, lerp(0, x / 2 + 10, i)),
                    tCtx.fillRect(0, lerp(x, x / 2, i), P, x)) : a < 1 ? (i = 2 * a - 1,
                        i = ease.out(i),
                        transitionText ? (tCtx.fillStyle = colors.green2.darker,
                            tCtx.fillRect(0, lerp(0, x / 2 - S / 2, i), P, lerp(x, S + 10, i)),
                            tCtx.fillStyle = colors.green2.brighter,
                            tCtx.fillRect(0, lerp(0, x / 2 - S / 2, i), P, lerp(x, S, i))) : (tCtx.fillStyle = colors.green2.darker,
                                tCtx.fillRect(0, lerp(0, x / 2, i), P, lerp(x, 10, i)),
                                tCtx.fillStyle = colors.green2.brighter,
                                tCtx.fillRect(0, lerp(0, x / 2, i), P, lerp(x, 0, i)))) : a < 3 ? transitionText ? (tCtx.fillStyle = colors.green2.darker,
                                    tCtx.fillRect(0, x / 2, P, S / 2 + 10),
                                    tCtx.fillStyle = colors.green2.brighter,
                                    tCtx.fillRect(0, x / 2 - S / 2, P, S)) : transitionTimer = 3.5 : a < 3.5 && (i = 2 * (a - 2 - 1),
                                        i = ease.in(i),
                                        tCtx.fillStyle = colors.green2.darker,
                                        tCtx.fillRect(0, x / 2, P, lerp(S / 2 + 10, 10, i)),
                                        tCtx.fillStyle = colors.green2.brighter,
                                        tCtx.fillRect(0, lerp(x / 2 - S / 2, x / 2, i), P, lerp(S, 0, i))),
                    .5 < a && a < 3.5) {
                    var E = S - 20;
                    tCtx.font = E + "px Arial, Helvetica, sans-serif";
                    var A = P / 2 - tCtx.measureText(transitionText).width / 2 + C / 2
                        , I = x / 2 + .37 * E + C / 2;
                    i = (i = a) < 1.1 ? iLerp(.5, 1.1, a) : a < 2.9 ? 1 : iLerp(3.5, 2.9, a),
                        drawAnimatedText(tCtx, transitionText, i, A, I, E, "white", "Arial, Helvetica, sans-serif", C, 3, 16842438)
                }
                tCtx.restore()
            }
            skipDeathTransition && "GAME OVER" == transitionText && 1 < transitionTimer && (transitionTimer = 1.1,
                skipDeathTransition = allowSkipDeathTransition = !(transitionDirection = -1))
        }
        renderAllLives(deltaTime);
        for (var k = currentTopNotifications.length - 1; 0 <= k; k--) {
            currentTopNotifications[k].update(deltaTime)
        }
        if (engagementSetIsPlaying(playingAndReady && Date.now() - lastSendDirTime < 2e4),
            beginScreenVisible && 49 < e - titleLastRender && (resetTitleNextFrame && (resetTitleNextFrame = false,
                titleTimer = -1,
                titleLastRender = e),
                titleTimer += .002 * (e - titleLastRender),
                titleLastRender = e,
                canvasTransformType = canvasTransformTypes.TITLE,
                ctxCanvasSize(titCtx, !0),
                ctxApplyCamTransform(titCtx, false, !0),
                drawTitle(titCtx, titleTimer, true, 0, !0),
                drawTitle(titCtx, titleTimer, true, 2.5),
                drawTitle(titCtx, titleTimer),
                titCtx.restore()),
            beginScreenVisible) {
            tutorialTimer += deltaTime * GLOBAL_SPEED * .7,
                canvasTransformType = canvasTransformTypes.TUTORIAL,
                ctxCanvasSize(tutCtx),
                uglyMode || ctxCanvasSize(linesCtx),
                tutCtx.fillStyle = colors.grey.BG,
                tutCtx.fillRect(0, 0, tutorialCanvas.width, tutorialCanvas.height),
                uglyMode || (linesCtx.fillStyle = "white",
                    linesCtx.fillRect(0, 0, linesCanvas.width, linesCanvas.height)),
                ctxApplyCamTransform(tutCtx),
                uglyMode || ctxApplyCamTransform(linesCtx),
                a = tutorialTimer,
                drawBlocks(tutCtx, tutorialBlocks);
            var b = getPlayer(1, tutorialPlayers)
                , w = getPlayer(2, tutorialPlayers);
            a < 10 ? b.pos = [2, 2] : a < 15 ? b.pos = [a - 8, 2] : a < 18 ? b.pos = [7, a - 13] : a < 23 ? b.pos = [25 - a, 5] : a < 26 ? b.pos = [2, 28 - a] : a < 30 || (a < 36 ? b.pos = [2, a - 28] : a < 39 && (b.pos = [a - 34, 8])),
                a < 12 || (a < 15 ? b.trails = [{
                    trail: [[4, 2]],
                    vanishTimer: 0
                }] : a < 18 ? b.trails = [{
                    trail: [[4, 2], [7, 2]],
                    vanishTimer: 0
                }] : a < 23 ? b.trails = [{
                    trail: [[4, 2], [7, 2], [7, 5]],
                    vanishTimer: 0
                }] : a < 24 && (b.trails = [{
                    trail: [[4, 2], [7, 2], [7, 5], [2, 5]],
                    vanishTimer: 0
                }])),
                24 < a && tutorialPrevTimer < 24 && (b.trails = [{
                    trail: [[4, 2], [7, 2], [7, 5], [2, 5], [2, 4]],
                    vanishTimer: 0
                }, {
                    trail: [],
                    vanishTimer: 0
                }]),
                a < 34 || (a < 36 ? b.trails = [{
                    trail: [[2, 6]],
                    vanishTimer: 0
                }] : a < 39 && (b.trails = [{
                    trail: [[2, 6], [2, 8]],
                    vanishTimer: 0
                }])),
                a < 34 || a < 50 && (w.pos = [a - 37, 7],
                    w.trails = [{
                        trail: [[-2, 7]],
                        vanishTimer: 0
                    }]),
                25 < a && tutorialPrevTimer < 25 && fillArea(2, 2, 6, 4, 10, 0, tutorialBlocks),
                39 < a && tutorialPrevTimer < 39 && (b.die(!0),
                    fillArea(1, 1, 7, 5, 1, 0, tutorialBlocks),
                    w.addHitLine([2, 7])),
                50 < a && (tutorialTimer = tutorialPrevTimer = 0,
                    fillArea(1, 1, 3, 3, 10, 0, tutorialBlocks),
                    b.isDeadTimer = 0,
                    b.isDead = false,
                    b.trails = [],
                    b.pos = [100, 100],
                    w.trails = [{
                        trail: [[-2, 7], [12, 7]],
                        vanishTimer: 0
                    }, {
                        trail: [],
                        vanishTimer: 0
                    }],
                    w.pos = w.drawPos = [-2, 7]),
                1 < a && tutorialPrevTimer < 1 && (tutorialText.innerHTML = "Close an area to fill it with your color."),
                30 < a && tutorialPrevTimer < 30 && (tutorialText.innerHTML = "Don't get hit by other players.");
            var D = clamp01(5 - Math.abs(.5 * (a - 20)));
            D += clamp01(4 - Math.abs(.5 * (a - 40))),
                tutorialText.style.opacity = clamp(D, 0, .9),
                moveDrawPosToPos(b),
                moveDrawPosToPos(w),
                tutCtx.globalAlpha = Math.min(1, Math.max(0, .3 * a - 1)),
                drawPlayer(tutCtx, b, e),
                drawPlayer(tutCtx, w, e),
                tutCtx.globalAlpha = 1,
                tutorialPrevTimer = a,
                uglyMode || drawDiagonalLines(linesCtx, "white", 5, 10, .008 * e),
                tutCtx.restore(),
                uglyMode || (linesCtx.restore(),
                    tutCtx.globalCompositeOperation = "multiply",
                    tutCtx.drawImage(linesCanvas, 0, 0),
                    tutCtx.globalCompositeOperation = "source-over")
        }
        if (beginScreenVisible && (canvasTransformType = canvasTransformTypes.SKIN_BUTTON,
            ctxApplyCamTransform(skinButtonCtx, true, !0),
            drawBlocks(skinButtonCtx, skinButtonBlocks),
            skinButtonCtx.restore()),
            skinScreenVisible && (canvasTransformType = canvasTransformTypes.SKIN,
                ctxApplyCamTransform(skinCtx, !0),
                drawBlocks(skinCtx, skinScreenBlocks),
                skinCtx.restore()),
            beginScreenVisible && (socialOpacity = lerpt(socialOpacity, socialOTarget, .1),
                socialElem.style.opacity = Math.min(1, socialOpacity),
                animateAppLinks && (appLinksTimer += .003 * deltaTime,
                    appLinksElem.style.opacity = Math.min(1, Math.max(0, appLinksTimer)),
                    1 < appLinksTimer && (animateAppLinks = !1))),
            beginScreenVisible) {
            if (1 < (a = (lastStatTimer += deltaTime) / 2e3)) {
                if (lastStatTimer = 0,
                    5 < ++lastStatCounter && (lastStatCounter = 0),
                    0 === lastStatCounter && (lastStatNo1Time <= 0 && bestStatNo1Time <= 0 ? lastStatCounter++ : (lastStatValueElem.innerHTML = parseTimeToString(lastStatNo1Time) + " on #1",
                        bestStatValueElem.innerHTML = parseTimeToString(bestStatNo1Time) + " on #1")),
                    1 == lastStatCounter && ("" === lastStatKiller && 0 < lastStatKiller.replace(/\s/g, "").length ? lastStatCounter++ : (lastStatValueElem.innerHTML = "killed by " + filter(htmlEscape(lastStatKiller)),
                        bestStatValueElem.innerHTML = "")),
                    2 == lastStatCounter)
                    if (lastStatKills <= 0 && bestStatKills <= 0)
                        lastStatCounter++;
                    else {
                        var M = 1 == lastStatKills ? "" : "s";
                        lastStatValueElem.innerHTML = lastStatKills + " player" + M + " killed";
                        var B = 1 == bestStatKills ? "" : "s";
                        bestStatValueElem.innerHTML = bestStatKills + " player" + B + " killed"
                    }
                if (3 == lastStatCounter && (lastStatValueElem.innerHTML = parseTimeToString(lastStatAlive) + " alive",
                    bestStatValueElem.innerHTML = parseTimeToString(Math.max(lastStatAlive, localStorage.getItem("bestStatAlive"))) + " alive"),
                    4 == lastStatCounter)
                    if (lastStatBlocks <= 0 && bestStatBlocks <= 0)
                        lastStatCounter++;
                    else {
                        var R = 1 == lastStatBlocks ? "" : "s";
                        lastStatValueElem.innerHTML = lastStatBlocks + " block" + R + " captured";
                        var L = 1 == bestStatBlocks ? "" : "s";
                        bestStatValueElem.innerHTML = bestStatBlocks + " block" + L + " captured"
                    }
                5 == lastStatCounter && (lastStatLbRank <= 0 && bestStatLbRank <= 0 ? lastStatCounter = 0 : (lastStatValueElem.innerHTML = 0 == lastStatLbRank ? "" : "#" + lastStatLbRank + " highest rank",
                    bestStatValueElem.innerHTML = 0 == bestStatLbRank ? "" : "#" + bestStatLbRank + " highest rank"))
            }
            lastStatValueElem.style.opacity = bestStatValueElem.style.opacity = 5 - Math.abs(5 * (a - .5) * 2)
        }
        if (beginScreenVisible && 1e3 < Date.now() - lastNameChangeCheck && (lastNameValue != nameInput.value && (nameInputOnChange(),
            lastNameValue = nameInput.value),
            lastTeamNameValue != teamNameInput.value && (teamNameInputOnChange(),
                lastTeamNameValue = teamNameInput.value),
            lastNameChangeCheck = Date.now()),
            "true" == localStorage.drawDebug) {
            var O = "avg:" + Math.round(thisServerAvgPing) + " last:" + Math.round(thisServerLastPing) + " diff:" + Math.round(thisServerDiffPing);
            ctx.font = "14px Arial, Helvetica, sans-serif",
                ctx.fillStyle = colors.red.brighter;
            var N = ctx.measureText(O).width;
            ctx.fillText(O, ctx.canvas.width - N - 10, ctx.canvas.height - 10)
        }
        loopRetentionSamples(deltaTime),
            testAdBoxLoaded(),
            testAdBox2Loaded()
    }
    donePing || pingServers();
    var _ = Date.now() - lastMyPosSetClientSideTime
        , U = Date.now() - lastMyPosSetValidClientSideTime
        , W = Date.now() - lastMyPosServerSideTime;
    WAIT_FOR_DISCONNECTED_MS < U && WAIT_FOR_DISCONNECTED_MS < W - _ && !myPlayer.isDead ? connectionLostNotification || (connectionLostNotification = doTopNotification("It seems like you're disconnected. Please check your connection.")) : connectionLostNotification && (connectionLostNotification.animateOut(),
        connectionLostNotification = null);
    var H = waitingForPing ? 1e4 : 5e3;
    null !== ws && Date.now() - lastPingTime > H && (lastPingTime = Date.now(),
        wsSendMsg(sendAction.PING) && (waitingForPing = !0)),
        parseGamepads(),
        window.requestAnimationFrame(loop)
}
var currentGamepad, gamePadIsHonking = false, customMappings = [{
    name: "Generic USB Joystick",
    buttonMap: {
        0: 2,
        1: 1,
        2: 3,
        3: 0,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 13,
        13: 14,
        14: 15,
        15: 16
    },
    axesMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 4
    }
}, {
    name: "Bluetooth Gamepad",
    buttonMap: {
        0: 0,
        1: 1,
        2: 3,
        3: 4,
        4: 6,
        5: 7,
        6: 8,
        7: 9,
        8: 10,
        9: 11,
        10: 13,
        11: 14,
        12: 12,
        13: 13,
        14: 14,
        15: 15
    },
    axesMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 5
    }
}, {
    name: "USB DancePad",
    buttonMap: {
        0: 6,
        1: 7,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 0,
        13: 1,
        14: 2,
        15: 3
    },
    axesMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 4
    }
}], currentMap = {
    buttonMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15
    },
    axesMap: {
        0: 0,
        1: 1,
        2: 2,
        3: 3
    }
};
function getButton(e) {
    if (currentGamepad && currentGamepad.buttons) {
        var t = currentGamepad.buttons[currentMap.buttonMap[e]];
        if (t)
            return t.pressed
    }
    return !1
}
function getAxis(e) {
    if (currentGamepad && currentGamepad.axes) {
        var t = currentGamepad.axes[currentMap.axesMap[e]];
        if (void 0 !== t)
            return t
    }
    return 0
}
function parseGamepads() {
    if ("getGamepads" in navigator) {
        for (var e = navigator.getGamepads(), t = false, n = 0; n < e.length; n++)
            if (null != (currentGamepad = e[n])) {
                var a = !1;
                if ("standard" == currentGamepad.mapping)
                    currentMap = {
                        buttonMap: {
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7,
                            8: 8,
                            9: 9,
                            10: 10,
                            11: 11,
                            12: 12,
                            13: 13,
                            14: 14,
                            15: 15
                        },
                        axesMap: {
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3
                        }
                    },
                        a = !0;
                else
                    for (var i = 0; i < customMappings.length; i++)
                        0 <= currentGamepad.id.indexOf(customMappings[i].name) && (a = true,
                            currentMap = customMappings[i]);
                a && (getButton(12) && sendDir(3),
                    getButton(13) && sendDir(1),
                    getButton(14) && sendDir(2),
                    getButton(15) && sendDir(0),
                    getButton(0) && (t = !0),
                    getButton(1) && doSkipDeathTransition(),
                    getButton(9) && sendDir(4),
                    (getAxis(0) < -.9 || getAxis(2) < -.9) && sendDir(2),
                    (.9 < getAxis(0) || .9 < getAxis(2)) && sendDir(0),
                    (getAxis(1) < -.9 || getAxis(3) < -.9) && sendDir(3),
                    (.9 < getAxis(1) || .9 < getAxis(3)) && sendDir(1))
            }
        t ? beginScreenVisible ? connectWithTransition() : gamePadIsHonking || (gamePadIsHonking = true,
            honkStart()) : gamePadIsHonking && (gamePadIsHonking = false,
                honkEnd())
    }
}
function toUTF8Array(e) {
    for (var t = [], n = 0; n < e.length; n++) {
        var a = e.charCodeAt(n);
        a < 128 ? t.push(a) : a < 2048 ? t.push(192 | a >> 6, 128 | 63 & a) : a < 55296 || 57344 <= a ? t.push(224 | a >> 12, 128 | a >> 6 & 63, 128 | 63 & a) : (n++ ,
            a = 65536 + ((1023 & a) << 10 | 1023 & e.charCodeAt(n)),
            t.push(240 | a >> 18, 128 | a >> 12 & 63, 128 | a >> 6 & 63, 128 | 63 & a))
    }
    return t
}
function htmlEscape(e) {
    return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
var swearArr = "penis;fuck;anal;anus;shit;asshole;bitch;butthole;slut;bitch;gay;nigger;n1gger;nlgger;xhamster;cock;cunt;dick;porn;horny;pussy;f*ck".split(";")
    , swearRepl = "balaboo";
function filter(e) {
    for (var t = e.split(" "), n = 0; n < t.length; n++) {
        for (var a = t[n], i = a.toUpperCase() == a, o = 0; o < swearArr.length; o++) {
            var r = swearArr[o];
            0 <= a.toLowerCase().indexOf(r) && (a = a.length < r.length + 2 ? swearRepl : a.toLowerCase().replace(r, swearRepl))
        }
        i && (a = a.toUpperCase()),
            t[n] = a
    }
    return t.join(" ")
}
function Utf8ArrayToStr(e) {
    var t, n, a, i, o, r;
    for (t = "",
        a = e.length,
        n = 0; n < a;)
        switch ((i = e[n++]) >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t += String.fromCharCode(i);
                break;
            case 12:
            case 13:
                o = e[n++],
                    t += String.fromCharCode((31 & i) << 6 | 63 & o);
                break;
            case 14:
                o = e[n++],
                    r = e[n++],
                    t += String.fromCharCode((15 & i) << 12 | (63 & o) << 6 | (63 & r) << 0)
        }
    return t
}
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
function parseTimeToString(e) {
    var t = Math.floor(e / 3600)
        , n = Math.floor((e - 3600 * t) / 60);
    if (e = e - 3600 * t - 60 * n,
        t <= 0) {
        var a = 1 == e ? "" : "s";
        return n <= 0 ? e + " second" + a : n + " minute" + (1 == n ? "" : "s") + " and " + e + " second" + a
    }
    return t < 10 && (t = "0" + t),
        n < 10 && (n = "0" + n),
        e < 10 && (e = "0" + e),
        t + ":" + n + ":" + e
}
function parseQuery(e) {
    var t = e.indexOf("?");
    if (t < 0)
        return {};
    for (var n = e.substr(t + 1).split("&"), a = {}, i = 0; i < n.length; i++) {
        var o = n[i].split("=");
        2 == o.length && (a[o[0]] = o[1])
    }
    return a
}
