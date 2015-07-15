using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets.Commands
{
    public class ChatCommandMessage : ChatCommand
    {
        public string ClientName { get; set; }
        public string Text { get; set; }

        public override ChatCommand Execute(IWebSocketConnection socket)
        {
            ChatServer.Instance.MessageArrived(this.ClientName, this.Text);

            return null;
        }
    }
}