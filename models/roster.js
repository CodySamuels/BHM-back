// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
    const roster = sequelize.define("roster", {},


        // TABLE NAME
        // ===============================================
        {
            tableName: "roster"
        })


    // RETURN
    // ===============================================
    return roster;
}