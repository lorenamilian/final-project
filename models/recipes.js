//create a model for our class

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("Recipes", {
    //define columns of our table
    name: {
      type: DataTypes.STRING
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    ingredients: {
        type: DataTypes.STRING
      },
    imge: {
    type: DataTypes.STRING
    },
    userID: {
        type: DataTypes.STRING
    }
  });
  return Recipes;
};
