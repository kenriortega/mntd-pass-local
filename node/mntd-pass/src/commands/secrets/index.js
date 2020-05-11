"use strict";
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
class SecretsCommand extends Command {
  async run() {
    this._help();
  }
}

SecretsCommand.description = `Comando para la gestion de secrets
`;

SecretsCommand.flags = {};

module.exports = SecretsCommand;
