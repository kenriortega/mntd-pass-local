"use strict";
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { AUTHENTICATED, isAuthenticated, authenticate } = require("@mntd/auth");
const { secretServices } = require("@mntd/services");
const { CLIError } = require("@oclif/errors");

class SecretsUpdateCommand extends Command {
  static args = [
    { name: "username", required: true },
    { name: "name", required: true },
  ];
  async run() {
    try {
      const { args } = this.parse(SecretsUpdateCommand);
      const { username, name } = args;
      await this.config.runHook("authenticate", { username });

      const value = await cli.prompt("Ingrese su nuevo secret", {
        type: "mask",
      });
      await secretServices.updateSecret(username, name, value);
      this.log(`secret ${name} actualizado`);
    } catch (err) {
      if (err instanceof CLIError) {
        throw err;
      } else {
        throw new CLIError("Cannot delete secret");
      }
    }
  }
}

SecretsUpdateCommand.description = `Permite actualizar el secret`;

SecretsUpdateCommand.flags = {};

module.exports = SecretsUpdateCommand;
