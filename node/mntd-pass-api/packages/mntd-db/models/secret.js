'use strict'
module.exports = (sequelize, DataTypes) => {
  const Secret = sequelize.define(
    'Secret',
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      value: DataTypes.STRING
      // TODO: ADD field category for visualize in a frontend
    },
    {
      underscored: true,
      tableName: 'secrets'
    }
  )
  Secret.associate = function (models) {
    Secret.belongsTo(models.User, {
      targetKey: 'username',
      foreignKey: 'username',
      as: 'user'
    })
  }
  return Secret
}
