# Puppetmaster

Enables create-unit and change-control for spectators, which can act as puppet-masters over the poor players. Intended as spectator donate-for-unit during the [Community AbleGamers Tournament](https://forums.uberent.com/threads/community-ablegamers-tournament.61966/), but I expect it will be usable for other random silliness.

## Requirements

Sandbox game option required.  Players will be prevented from using paste-unit, and the Devmode UI is turned off.

PAMM is required in order to set up the server mod hooks.

[Video Thread](https://forums.uberent.com/threads/puppetmaster-videos.62581/)

Spectators may use the 'toggle puppetmaster' keybind, which is by default alt+ctrl+shift+p. The binding should be configurable if you visit Settings while in a modded game.

From there, select a player and a unit in the extra panels, and then you can use the standard paste keybinding, ctrl+v, and an additional paste-10, shift+ctrl+v, which can be rebound from in-game settings.

### Companion server mods

- [Preloaded Nukes](https://forums.uberent.com/threads/rel-server-preloaded-nukes.70389/) - allows gifting of immediately usable missiles

### Recommended client mods for puppetmaster:

- [Chat With Player](https://forums.uberent.com/threads/rel-chat-with-player.70434/) - allows automatic private chat messages to be sent to players recieving a gift.
- [Sandbox Unit Organizer](https://forums.uberent.com/threads/rel-sandbox-unit-organizer.62310/)
- [Bulk Create Units](https://forums.uberent.com/threads/rel-bulk-create-units.62492/)
- [Improved Player Control](https://forums.uberent.com/threads/rel-improved-player-control.62472/)

### ...For special events

- [Sandbox Unit Menu](https://forums.uberent.com/threads/wip-sandbox-unit-menu-ablegamers.62461/)
- [Donation Panel](https://forums.uberent.com/threads/wip-donation-panel.62576/)

### Other Notes:

- Since you have to change control to give a player units, the mod also allows the puppet-master to give unit orders, including self-destruct. (It's up to the puppet-master's discretion to allow donate-for-troll)
- As discovered in the video, extra commanders don't change the losing conditions - only original coms count for assassination.
- Controlling a player stops army stat updates; the mod clears control flags when the spectator panel opened, but it can be easy to forget you need to re-select a player in order to paste.
- Drop pods trigger combat alerts; it has the uber/avatar icon but may be lost in existing combats

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- proc - modify nuke and antinuke units to preloaded versions
- copy:mod - copy the mod files into server_mods
- copy:back - copy puppetmaster.js back from the execution directory, to allow streamlined development
- default: proc, copy:mod
