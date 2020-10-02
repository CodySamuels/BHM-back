// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models/");

// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {


  // TABLE COLUMNS
  // ===============================================
  const item = sequelize.define("item", {


    // TABLE COLUMNS
    // ===============================================
    classId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    adminId: {
      type: DataTypes.UUID,
      references: db.user,
      key: 'id'
    },

    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    inventory: DataTypes.STRING,
    description: DataTypes.STRING,
    instructor: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "item"
    })


  // ASSOCIATIONS
  // ===============================================
  item.associate = (models) => {
    item.belongsToMany(models.cart, { through: "cartItems", onDelete: 'cascade' })
    item.belongsToMany(models.user, { through: 'userClassTable', onDelete: 'cascade' })
  };


  // RETURN
  // ===============================================
  return item;
}