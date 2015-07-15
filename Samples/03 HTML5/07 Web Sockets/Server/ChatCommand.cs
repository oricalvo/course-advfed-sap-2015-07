using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace UsingWebSockets
{
    public abstract class ChatCommand
    {
        private static Type GetCommandType(string commandName)
        {
            string typeName = "ChatCommand" + commandName;
            Type type = Type.GetType("UsingWebSockets.Commands." + typeName, true);
            return type;
        }

        public static ChatCommand Deserialize(ChatMessage message)
        {
            Type commandType = GetCommandType(message.Type);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            ChatCommand res = (ChatCommand)serializer.Deserialize(message.Command, commandType);
            return res;
        }

        public abstract ChatCommand Execute(IWebSocketConnection socket);

        public string GetName()
        {
            return this.GetType().Name.Substring(typeof(ChatCommand).Name.Length);
        }
    }
}