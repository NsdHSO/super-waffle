import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ChatRoutingModule} from "./chat-routing.module";
import {ChatComponent} from "./chat.component";
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    ChatComponent,
    TweetComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
  ],
})
export class ChatModule {}
