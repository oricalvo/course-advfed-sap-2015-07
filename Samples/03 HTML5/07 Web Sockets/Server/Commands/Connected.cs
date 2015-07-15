using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets.Commands
{
    public class ChatCommandConnected : ChatCommand
    {
        public override ChatCommand Execute(IWebSocketConnection socket)
        {
            throw new NotImplementedException();
        }
    }
}
