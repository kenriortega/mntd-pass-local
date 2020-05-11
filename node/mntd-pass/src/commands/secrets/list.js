"use strict";
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { secretServices } = require("@mntd/services");
const { CLIError } = require("@oclif/errors");

class SecretsListCommand extends Command {
  static args = [{ name: "username", required: true }];
  async run() {
    try {
      const { args } = this.parse(SecretsListCommand);
      const { username } = args;
      await this.config.runHook("authenticate", { username });

      const secrets = await secretServices.listSecrets(username);
      this.log(`Total: ${secrets.count}`);

      cli.table(
        secrets.rows,
        {
          username: {
            minWidth: 12,
          },
          name: {
            header: "Secret",
            minWidth: 20,
          },
          createdAt: {
            header: "Fecha",
            minWidth: 20,
          },
        },
        {
          printLine: this.log,
        }
      );
    } catch (err) {
      if (err instanceof CLIError) {
        throw err;
      } else {
        throw new CLIError("Cannot list secrets");
      }
    }
  }
}

SecretsListCommand.description = `Permite listar los secrets asociados a un usuario
`;

SecretsListCommand.flags = {};

module.exports = SecretsListCommand;
