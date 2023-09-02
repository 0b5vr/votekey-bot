# cloud-run-discord-bot

A Discord bot using Google Cloud Run

![An icon of votekey-bot](votekey-bot.png)

### Motivation

**Votekey** is a key in a short text form required to register to the party system like [partymeister](https://github.com/partymeister) or [wuhu](http://wuhu.function.hu/).

Imagine that you're doing your demoparty and you're going to distribute votekeys via Discord.
Having a Discord channel named `#votekey-request` , you check the channel constantly, see if the requester is trustworthy enough, check the party system for an available votekey, and send them the key.
That's a lot of troublesome processes!

This bot is specialized to resolve this specific problem; it stores available votekeys and sends DM to dispense the keys as you order.

### Feature Summary

- It can store available votekeys.
- It can send a DM with a votekey to anyone in the server.
- Customizable DM footer. You might want to place a registration URL.

### Available Commands

- `/addkeys` : Add votekeys. The votekey list is specific to the server.
- `/clearkeys` : Clear the existing votekey list.
- `/countkeys` : Count currently registered votekeys.
- `/dmkey` : Send a votekey to the specified user via DM.
- `/footer` : Set the footer for messages sent via `/dmkey`.
- `/ping` : You'll expect "pong".

### Setup on Google Cloud

TODO. You basically need Cloud Run and Firestore.

### License

[MIT](./LICENSE)
