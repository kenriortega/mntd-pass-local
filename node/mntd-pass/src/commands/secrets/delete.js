"use strict";
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { CLIError } = require("@oclif/errors");
const { secretServices } = require("@mntd/services");

class SecretsDeleteCommand extends Command {
  static args = [
    { name: "username", required: true },
    { name: "name", required: true },
  ];
  async run() {
    try {
      const { args } = this.parse(SecretsDeleteCommand);
      const { username, name } = args;
      await this.config.runHook("authenticate", { username });

      await secretServices.deleteSecret(username, name);
      this.log(`secret ${name} eliminado`);
    } catch (err) {
      if (err instanceof CLIError) {
        throw err;
      } else {
        throw new CLIError("Cannot delete secret");
      }
    }
  }
}

SecretsDeleteCommand.description = `Permite eliminar un secret dado el usuario y el nombre del mismo
`;

SecretsDeleteCommand.flags = {};

module.exports = SecretsDeleteCommand;
