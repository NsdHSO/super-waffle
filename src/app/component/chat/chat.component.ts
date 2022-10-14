import {Component, OnInit} from "@angular/core";
import {Message, WebsocketService} from "../../service/websocket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  messages : Message[] = [{content: 'asdasd', source:'dasdsa'}] as Message[];

  constructor(private readonly _websocket : WebsocketService) {}

  public ngOnInit() : void {
    this._websocket.messages$.subscribe(messages => {
      if(this.messages.length < 200) {
        this.messages = [...this.messages, messages];
      }
      else {
        this.messages.pop();
        this.messages = [...this.messages, messages];
      }
    });
  }
}
