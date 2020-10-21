// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models");


// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
  const cart = sequelize.define("cart", {


    // TABLE COLUMNS
    // ===============================================
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      references: db.user,
      key: 'userId'
    },
  })


  // ASSOCIATIONS
  // ===============================================
  cart.associate = (models) => {
    cart.belongsTo(models.user, { onDelete: 'cascade' });
    cart.belongsToMany(models.item, { through: "classes_in_a_cart" })
  };


  // RETURN
  // ===============================================
  return cart;
}