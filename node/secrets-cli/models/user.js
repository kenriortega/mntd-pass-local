'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      randomkey: DataTypes.STRING,
      fullName: {
        type: DataTypes.STRING
        // field: 'fullName'
      }
    },
    {
      underscored: true,
      tableName: 'users'
      // hooks: {
      //   beforeCreate: async (user, options) => {
      //     user.password = await hashPassword(user.password)
      //     user.randomKey = await generateRandomKey()
      //   }
      // }
    }
  )
  User.associate = function(models) {
    User.hasMany(models.Secret, {
      sourceKey: 'username',
      foreignKey: 'username',
      as: 'secrets'
    })
  }
  return User
}
