using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets.Commands
{
    public class ChatCommandMessageArrived : ChatCommand
    {
        public string Sender { get; set; }
        public string Text { get; set; }

        public override ChatCommand Execute(IWebSocketConnection socket)
        {
            throw new NotImplementedException();
        }
    }
}