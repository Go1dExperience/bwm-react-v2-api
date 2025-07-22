"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "rentals",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
        },
        title: {
          type: Sequelize.STRING,
        },
        city: {
          type: Sequelize.STRING,
        },
        street: {
          type: Sequelize.STRING,
        },
        category: {
          type: Sequelize.STRING,
        },
        image: {
          type: Sequelize.STRING,
        },
        bedrooms: {
          type: Sequelize.INTEGER,
        },
        description: {
          type: Sequelize.TEXT,
        },
        dailyRate: {
          type: Sequelize.INTEGER,
        },
        shared: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        userId: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        indexes: [
          {
            fields: ["userId"],
            name: "rentals_userId_idx",
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rentals");
  },
};
