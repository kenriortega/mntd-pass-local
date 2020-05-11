"use strict";
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { secretServices } = require("@mntd/services");
const { CLIError } = require("@oclif/errors");
const clipboardy = require("clipboardy");

class SecretsGetCommand extends Command {
  static args = [
    { name: "username", required: true },
    { name: "name", required: true },
  ];
  async run() {
    try {
      const { args, flags } = this.parse(SecretsGetCommand);
      const { username, name } = args;
      await this.config.runHook("authenticate", { username });

      const secret = await secretServices.getSecret(username, name);
      if (!secret) return this.log(`secret ${name} no encontrado`);
      if (flags.copy) {
        cli.action.start("Copying to clipboard");
        clipboardy.writeSync(secret.value);
        cli.action.stop("Copied to clipboard");
      } else {
        cli.table([secret], {
          name: {
            minWidth: 10,
          },
          value: {
            minWidth: 12,
          },
        });
      }
    } catch (err) {
      if (err instanceof CLIError) {
        throw err;
      } else {
        throw new CLIError("Cannot get secret");
      }
    }
  }
}

SecretsGetCommand.description = `Permite obtener el valor de un secret dado el usuario y el nombre del mismo
`;

SecretsGetCommand.flags = {
  copy: flags.boolean({ char: "c" }),
};

module.exports = SecretsGetCommand;
