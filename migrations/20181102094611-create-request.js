"use strict"
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Requests", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            request_id: {
                type: Sequelize.STRING
            },
            cookies:{
                type: Sequelize.TEXT
            },
            headers:{
                type: Sequelize.TEXT
            },
            remote_ip:{
                type: Sequelize.STRING
            },
            schema:{
                type: Sequelize.STRING
            },
            method:{
                type: Sequelize.STRING
            },
            query:{
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Requests")
    }
}
