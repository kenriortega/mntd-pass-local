"use strict";

const db = require("@mntd/db");

module.exports = {
  /**
   * Permite crear un usuario dado los siguientes parametros
   *
   * @param {string} username
   * @param {string} password
   * @param {string} [fullName=""]
   * @returns {User} User
   */
  async createUser(username, password, fullName = "") {
    return db.User.create({
      username,
      password,
      fullName,
    });
  },

  /**
   * Lista los usuarios de la Base de datos
   *
   * @returns {Array<User>} Array<User>
   */
  listUsers() {
    return db.User.findAndCountAll();
  },
};
