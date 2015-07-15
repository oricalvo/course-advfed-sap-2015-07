/// <reference path="jquery-1.4.1-vsdoc.js" />
/// <reference path="chatclient.js" />

(function () {
    var _buttonConnect = null;
    var _textName = null;
    var _textMessage = null;
    var _history = null;
    var _buttonSend = null;
    var _fields = null;

    $(function () {
        try {
            _buttonConnect = getElement("#buttonConnect");
            _buttonConnect.click(buttonConnect_Click);

            _textName = getElement("#textName");
            _textName.keypress(function (evt) {
                if (evt.which == 13) {
                    buttonConnect_Click();

                    evt.preventDefault();
                }
            });
            _textName.focus();

            _textMessage = getElement("#textMessage");
            _textMessage.keypress(function (evt) {
                if (evt.which == 13) {
                    sendMessage();

                    evt.preventDefault();
                }
            });

            _buttonSend = getElement("#buttonSend");
            _buttonSend.click(sendMessage);

            _history = getElement("#history");

            _fields = getElement("#fields");

            ChatClient.connected.add(chat_Connected);
            ChatClient.disconnected.add(chat_Disconnected);
            ChatClient.clientConnected.add(chat_ClientConnected);
            ChatClient.clientDisconnected.add(chat_ClientDisconnected);
            ChatClient.messageArrived.add(chat_MessageArrived);
        }
        catch (err) {
            alert("Failed to initialize application: " + err);
        }
    });

    function chat_Connected() {
        try {
            updateUI();

            _textMessage.focus();
        }
        catch (err) {
            errorMessage("Failed to handle incoming message from server", err);
        }
    }

    function chat_Disconnected() {
        try {
            updateUI();
        }
        catch (err) {
            errorMessage("Failed to handle incoming message from server", err);
        }
    }

    function chat_ClientConnected() {
        try {
        }
        catch (err) {
            errorMessage("Failed to handle incoming message from server", err);
        }
    }

    function chat_ClientDisconnected() {
        try {
        }
        catch (err) {
            errorMessage("Failed to handle incoming message from server", err);
        }
    }

    function chat_MessageArrived(sender, message) {
        try {
            addMessage(sender, message);
        }
        catch (err) {
            errorMessage("Failed to handle incoming message from server", err);
        }
    }

    function sendMessage() {
        try {
            var text = _textMessage.val();
            if (!text) {
                alert("Please specify non empty message");
                return;
            }

            ChatClient.sendMessage(text);

            _textMessage.select();
        }
        catch (err) {
            errorMessage("Failed to send message to server", err);
        }
    }

    function updateUI() {
        var state = ChatClient.getState();

        if (state == State.Disconnected) {
            _textName.removeAttr("disabled", "disabled");
            _textName.val("");
            _buttonConnect.val("Connect");

            _fields.css("visibility", "hidden");
        }
        else {
            _textName.attr("disabled", "disabled");

            if (state == State.Connected) {
                _textName.val("Connected as \"" + ChatClient.getClientName() + "\"");
            }
            else {
                _textName.val("Connecting ...");
            }

            _buttonConnect.val("Disconnect");

            if (state == State.Connected) {
                _fields.css("visibility", "visible");
            }
        }
    }

    function addMessage(sender, text) {
        var item = $("<div />");
        item.html("<span class='sender'>" + sender + "</span>" + ": " + text);

        _history.append(item);

        item[0].scrollIntoView();
    }

    function connect() {
        try {
            var clientName = _textName.val();
            if (!clientName) {
                alert("Please specify a name");

                return;
            }

            ChatClient.connect(clientName);
        }
        catch (err) {
            errorMessage("Failed to connect to server", err);
        }
    }

    function disconnect() {
        try {
            ChatClient.disconnect();
        }
        catch (err) {
            //
            //  Ignore errors
            //
        }
    }

    function buttonConnect_Click() {
        if (_buttonConnect.val() == "Connect") {
            connect();
        }
        else {
            disconnect();
        }
    }

    function errorMessage(message, err) {
        alert(message + "\n\nError is: " + err);
    }

    function getElement(selector, context) {
        var element = $(selector, context);
        if (!element.length) {
            throw "Element was not found: " + selector;
        }

        return element;
    }
})();
