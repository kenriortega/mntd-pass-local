"use strict";
const { Command, flags } = require("@oclif/command");
class UsersCommand extends Command {
  async run() {}
}

UsersCommand.description = `Comando para la gestion de usuarios
`;

UsersCommand.flags = {};

module.exports = UsersCommand;
