using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets.Commands
{
    public class ChatCommandDisconnect : ChatCommand
    {
        public string ClientName { get; set; }

        public override ChatCommand Execute(IWebSocketConnection socket)
        {
            ChatServer.Instance.ClientDisconnected(this.ClientName);

            return null;
        }
    }
}