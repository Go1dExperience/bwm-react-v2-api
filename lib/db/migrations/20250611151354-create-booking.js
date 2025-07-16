"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "bookings",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
        },
        endAt: {
          type: Sequelize.DATE,
        },
        startAt: {
          type: Sequelize.DATE,
        },
        totalPrice: {
          type: Sequelize.INTEGER,
        },
        days: {
          type: Sequelize.INTEGER,
        },
        guests: {
          type: Sequelize.INTEGER,
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
        rentalId: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "rentals",
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        indexes: [
          {
            fields: ["userId"],
            name: "bookings_userId_idx",
          },
          {
            fields: ["rentalId"],
            name: "bookings_rentalId_idx",
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
