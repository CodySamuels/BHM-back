// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {

  const cart = sequelize.define("cart", {})


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