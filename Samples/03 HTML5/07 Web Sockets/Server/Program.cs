using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UsingWebSockets;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var server = new WebSocketServer("ws://localhost:8181");
            server.Start(socket =>
            {
                socket.OnOpen = () => 
                    {
                        Console.WriteLine("Open: " + socket.ConnectionInfo.Id);
                    };
                socket.OnClose = () => 
                    {
                        Console.WriteLine("Close: " + socket.ConnectionInfo.Id);

                        ChatServer.Instance.ClientLost(socket);
                    };
                socket.OnMessage = message =>
                {
                    Console.WriteLine("Message: " + socket.ConnectionInfo.Id);
                    Console.WriteLine("    " + message);

                    ChatServer.Instance.Accept(socket, message);
                };
            });

            Console.ReadLine();
        }
    }
}
