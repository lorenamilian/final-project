const bcrypt = require("bcryptjs");

//create a model for our class

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    //define columns of our table
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //create custome methods for our Users
  Users.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // hooks happens in specific scenerios

  //encripting users paswords
  Users.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return Users;
};
