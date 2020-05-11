"use strict";
const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const { Sequelize } = require("@mntd/db");
const { userServices } = require("@mntd/services");
const { CLIError } = require("@oclif/errors");

class UsersCreateCommand extends Command {
  static args = [{ name: "username", required: true }];

  async run() {
    const { args } = this.parse(UsersCreateCommand);
    const { username } = args;
    const fullName = await cli.prompt("Ingrese su full name");
    const password = await cli.prompt("Ingrese su password: ", {
      type: "hide",
    });
    try {
      const newUser = await userServices.createUser(username, password);
      this.log(`${newUser.username} creado con id: ${newUser.id}`);
    } catch (err) {
      if (err instanceof Sequelize.UniqueConstraintError) {
        throw new CLIError("Usuario ya existe");
      } else {
        throw new CLIError("No puede crear el usuario");
      }
    }
  }
}

UsersCreateCommand.description = `Permite crear un usuario`;

UsersCreateCommand.flags = {};

module.exports = UsersCreateCommand;
