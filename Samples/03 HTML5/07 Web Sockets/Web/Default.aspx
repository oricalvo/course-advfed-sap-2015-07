<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="UsingWebSockets._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="section client">
        <div class="title">
            Name:
        </div>
        <div class="content">
            <input type="text" id="textName" />
            <input type="button" value="Connect" id="buttonConnect" />
        </div>
    </div>

    <fieldset id="fields">
        <div class="section message">
            <div class="title">
                Message
            </div>
            <div class="content">
                <input type="text" id="textMessage" />
                <input type="button" value="Send" id="buttonSend" />
            </div>
        </div>

        <div class="section history">
            <div class="title">
                History
            </div>
            <div id="history">

            </div>
         </div>
    </fieldset>

</asp:Content>
