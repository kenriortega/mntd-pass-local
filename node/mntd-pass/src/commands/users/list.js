const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const { userServices } = require("@mntd/services");
const { CLIError } = require("@oclif/errors");

class UsersListCommand extends Command {
  async run() {
    try {
      const results = await userServices.listUsers();
      this.log(`Total: ${results.count}`);

      cli.table(
        results.rows,
        {
          username: {
            minWidth: 12,
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
      throw new CLIError("No puede listar los usuario");
    }
  }
}

UsersListCommand.description = "Permite listar todos los usuarios";
UsersListCommand.flags = {};

module.exports = UsersListCommand;
