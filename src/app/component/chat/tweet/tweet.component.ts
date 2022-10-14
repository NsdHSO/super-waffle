import {Component, Input} from "@angular/core";
import {Message} from "../../../service/websocket.service";

@Component({
  selector: "app-tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.scss"],
})
export class TweetComponent {
  @Input()
  message = {} as Message;
}
