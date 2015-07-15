using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets.Commands
{
    public class ChatCommandConnect : ChatCommand
    {
        public string ClientName { get; set; }

        public override ChatCommand Execute(IWebSocketConnection socket)
        {
            ChatServer.Instance.ClientConnected(this.ClientName, socket);

            ChatCommandConnected res = new ChatCommandConnected();
            return res;
        }
    }
}