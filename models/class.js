// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models/");

// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
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
      key: 'userId'
    },

    // instructorFirstName: {
    //   type: DataTypes.STRING,
    //   references: db.user,
    //   key: 'firstName'
    // },

    // instructorLastName: {
    //   type: DataTypes.STRING,
    //   references: db.user,
    //   key: 'lastName'
    // },

    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    inventory: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    time: DataTypes.STRING,
    gradeRange: DataTypes.STRING
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "class"
    })


  // ASSOCIATIONS
  // ===============================================
  item.associate = (models) => {
    item.belongsToMany(models.cart, { through: 'classes_in_a_cart', onDelete: 'cascade' })
    item.belongsToMany(models.user, { through: 'users_in_a_class_table', onDelete: 'cascade' })
  };


  // RETURN
  // ===============================================
  return item;
}