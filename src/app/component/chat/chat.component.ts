import {Component, OnInit} from "@angular/core";
import {interval} from "rxjs";
import {Message, WebsocketService} from "../../service/websocket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  messages : Message[] = [] as Message[];

  constructor(private readonly _websocket : WebsocketService) {}

  public ngOnInit() : void {
    this._websocket.messages$.subscribe(messages => {
      if(this.messages.length < 200) {
        this.messages = [...this.messages, messages];
      }
      else {
        this.messages.shift();
        this.messages = [...this.messages, messages];
      }
    });

    interval(100000).subscribe(() => {this.messages.shift(); console.log("POP")})
  }
}
