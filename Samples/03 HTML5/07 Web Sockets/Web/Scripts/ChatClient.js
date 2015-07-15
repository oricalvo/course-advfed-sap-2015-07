/// <reference path="jquery-1.4.1-vsdoc.js" />
/// <reference path="microsoftajax.debug.js" />
/// <reference path="/chatservice.svc/jsdebug" />

var ChatClient = {
};

var State = {
    Disconnected: 1,
    Connecting: 2,
    Connected: 3
};

(function () {
    var _ws = null;
    var _clientName = null;
    var _clients = [];
    var _state;

    $.ajaxSetup({
        cache: false
    });

    $(function () {
        try {
            if (!("WebSocket" in window)) {
                throw "Browser does not support web sockets";
            }

            _state = State.Disconnected;
        }
        catch (err) {
            alert("Failed to initialize application: " + err);
        }
    });

    ChatClient.connected = $.Callbacks();
    ChatClient.disconnected = $.Callbacks();
    ChatClient.clientConnected = $.Callbacks();
    ChatClient.clientDisconnected = $.Callbacks();
    ChatClient.messageArrived = $.Callbacks();

    ChatClient.sendMessage = function (text) {
        var message = {
            Type: "Message",
            Command: JSON.stringify({
                Text: text,
                ClientName: _clientName
            })
        };

        var data = JSON.stringify(message);
        _ws.send(data);
    }

    ChatClient.getState = function () {
        return _state;
    }

    ChatClient.getClientName = function () {
        return _clientName;
    }

    ChatClient.connect = function (clientName) {
        _clientName = clientName;
        _state = State.Connecting;

        //_ws = new WebSocket("ws://localhost:1168/ChatServer.ashx");
        _ws = new WebSocket("ws://localhost:8181");
        _ws.onopen = onSocketOpen;
        _ws.onmessage = onSocketMessage;
        _ws.onclose = onSocketClose;
    }

    ChatClient.disconnect = function () {
        var message = {
            Type: "Disconnect",
            Command: JSON.stringify({
                ClientName: _clientName
            })
        };

        _state = State.Disconnected;

        ChatClient.disconnected.fire();

        var data = JSON.stringify(message);
        _ws.send(data);
    }

    function onConnected() {
        _state = State.Connected;

        ChatClient.connected.fire();
    }

    function onClientConnected() {
        ChatClient.clientConnected.fire();
    }

    function onClientDisconnected(msg) {
        ChatClient.clientDisconnected.fire();
    }

    function onSocketOpen() {
        var message = {
            Type: "Connect",
            Command: JSON.stringify({
                ClientName: _clientName
            })
        };

        var data = JSON.stringify(message);
        _ws.send(data);
    }

    function onSocketError() {
        alert("Socket error");
    }

    function onSocketClose() {
    }

    function onMessageArrived(msg) {
        var command = JSON.parse(msg.Command);

        ChatClient.messageArrived.fire(command.Sender, command.Text);
    }

    function onSocketMessage(evt) {
        var msg = JSON.parse(evt.data);
        if (msg.Error) {
            alert("Server reported an error: " + msg.Error);
        }
        else {
            if (msg.Type == "Connected") {
                onConnected(msg);
            }
            else if (msg.Type == "ClientConnected") {
                onClientConnected(msg);
            }
            else if (msg.Type == "ClientDisconnected") {
                onClientDisconnected(msg);
            }
            else if (msg.Type == "MessageArrived") {
                onMessageArrived(msg);
            }
            else {
                alert("Unknown command from server: " + msg.Type);
            }
        }
    }
})();
