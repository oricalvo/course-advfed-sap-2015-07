using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsingWebSockets
{
    public class ChatClient
    {
        private string name;
        private IWebSocketConnection socket;

        public ChatClient(string name, IWebSocketConnection socket)
        {
            this.name = name;
            this.socket = socket;
        }

        public string Name
        {
            get
            {
                return this.name;
            }
        }

        public IWebSocketConnection Socket
        {
            get
            {
                return this.socket;
            }
        }
    }
}
