using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using UsingWebSockets.Commands;

namespace UsingWebSockets
{
    public class ChatServer
    {
        private List<ChatClient> clients;
        private static ChatServer instance;

        private ChatServer()
        {
            this.clients = new List<ChatClient>();
        }

        private void SendAll(ChatCommand command)
        {
            foreach (ChatClient client in this.clients.ToArray())
            {
                SendCommand(client.Socket, command);
            }
        }

        public void ClientLost(IWebSocketConnection socket)
        {
            int index = this.clients.FindIndex((c) => c.Socket == socket);
            if (index != -1)
            {
                ChatClient client = this.clients[index];
                this.clients.RemoveAt(index);

                SendAll(new ChatCommandClientDisconnected()
                {
                    ClientName = client.Name
                });
            }
        }

        public void ClientConnected(string name, IWebSocketConnection socket)
        {
            this.clients.Add(new ChatClient(name, socket));

            SendAll(new ChatCommandClientConnected()
            {
                ClientName = name
            });
        }

        public void ClientDisconnected(string name)
        {
            int index = this.clients.FindIndex((client) => client.Name == name);
            if (index != -1)
            {
                this.clients.RemoveAt(index);

                SendAll(new ChatCommandClientDisconnected()
                    {
                        ClientName = name
                    });
            }            
        }

        public void MessageArrived(string clientName, string text)
        {
            SendAll(new ChatCommandMessageArrived()
                {
                    Sender = clientName,
                    Text = text
                });
        }

        public void SendCommand(IWebSocketConnection socket, ChatCommand response)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            ChatMessage message = new ChatMessage()
            {
                Type = response.GetName(),
                Command = serializer.Serialize(response),
            };

            string str = serializer.Serialize(message);
            socket.Send(str);
        }

        public static ChatServer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new ChatServer();
                }

                return instance;
            }
        }

        public void Accept(IWebSocketConnection socket, string message)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            ChatMessage chatMessage = serializer.Deserialize<ChatMessage>(message);
            ChatCommand command = ChatCommand.Deserialize(chatMessage);

            ChatCommand response = command.Execute(socket);
            if (response != null)
            {
                SendCommand(socket, response);
            }
        }

        public ChatClient[] GetClients()
        {
            return this.clients.ToArray();
        }
    }

    public class ChatMessage
    {
        public string Type { get; set; }
        public string Command { get; set; }
    }
}
