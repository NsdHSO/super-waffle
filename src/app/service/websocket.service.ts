import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as tmi from "tmi.js";

const opts = {
  channels: [
    "nsdhso",
  ],
};

export interface Message {
  source : string;
  content : string;
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  client : tmi.Client            = tmi.Client(opts);
  messages$ : Subject<Message> = new Subject<Message>();

  constructor() {
// Connect to Twitch:
    this.client.connect();
    this.client.on("message",
      this.onMessageHandler.bind(this));
    this.client.on("connected",
      this.onConnectedHandler);
  }

  public async ngOnInit() {
    this.client.on("message",
      (msg) => {console.log(msg);});
  }

// Called every time a message comes in
  onMessageHandler(target : any, context : any, msg : any, self : any) {
    if(self) { return; } // Ignore messages from the bot
    const user = {
      source: context.username,
      content: msg,
    } as Message;

    // Remove whitespace from chat message
    const commandName = msg.trim();
    // If the command is known, let's execute it
    if(commandName === "!dice") {
      const num = this.rollDice();
      this.client.say(target,
        `You rolled a ${num}`)
        .catch(err => console.log(err));
      console.log(`* Executed ${commandName} command`);
    }
    else {
      console.log(`${context.username} ${commandName} `);
    }
    this.messages$.next(user);
  }

// Function called when the "dice" command is issued
  rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }

// Called every time the bot connects to Twitch chat
  onConnectedHandler(addr : any, port : any) {
    console.log(`* Connected to ${addr}:${port}`);
  }
}
