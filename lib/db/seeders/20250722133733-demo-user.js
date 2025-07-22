"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: "65d7164b-522b-4c6e-b968-814f2a1fef0f",
          email: "john.doe@example.com",
          username: "John Doe",
          password: "hashed_password",
        },
        {
          id: "503fbfaf-a126-4591-b1e2-43dc4327017c",
          email: "jane.doe@example.com",
          username: "Jane Doe",
          password: "hashed_password",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:20250722134413-demo-user
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
