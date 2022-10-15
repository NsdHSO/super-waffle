import {animate, state, style, transition, trigger} from "@angular/animations";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {interval, throttle} from "rxjs";
import {Message, WebsocketService} from "../../service/websocket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  messages : Message[] = [] as Message[];

  constructor(private readonly _websocket : WebsocketService, private readonly _activatedRoute : ActivatedRoute) {
  }

  public ngOnInit() : void {
    this._activatedRoute.paramMap.subscribe(r =>
      this._websocket.pushChannel(String(r.get("id"))),
    );
    this._websocket.messages$.pipe(throttle(() => interval(500))).subscribe(messages => {
      if(this.messages.length < 200) {
        this.messages = [...this.messages, messages];
      }
      else {
        this.messages.shift();
        this.messages = [...this.messages, messages];
      }
    });
    interval(100000)
      .subscribe(() => {
        this.messages.shift();
        console.log("POP");
      });
  }
}
