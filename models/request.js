"use strict"
module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        request_id: DataTypes.STRING,
        cookies: DataTypes.TEXT,
        headers: DataTypes.TEXT,
        remote_ip: DataTypes.STRING,
        schema: DataTypes.STRING,
        method: DataTypes.STRING,
        query: DataTypes.STRING
    }, {})
    Request.associate = function (models) {
        // associations can be defined here
    }
    return Request
}
