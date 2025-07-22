const { v4: uuidv4 } = require('uuid');
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "rentals",
      [
        {
          id: uuidv4(),
          title: "Nice view on ocean",
          city: "San Francisco",
          street: "Main street",
          category: "condo",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 4,
          shared: false,
          description: "Very nice apartment in center of the city.",
          dailyRate: 43,
          userId: "65d7164b-522b-4c6e-b968-814f2a1fef0f", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "Modern apartment in center",
          city: "New York",
          street: "Time Square",
          category: "apartment",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 1,
          shared: true,
          description: "Very nice apartment in center of the city.",
          dailyRate: 11,
          userId: "503fbfaf-a126-4591-b1e2-43dc4327017c", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "Old house in nature",
          city: "Spisska Nova Ves",
          street: "Banicka 1",
          category: "house",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 5,
          shared: false,
          description: "Very nice apartment in center of the city.",
          dailyRate: 23,
          userId: "65d7164b-522b-4c6e-b968-814f2a1fef0f", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "Amazing modern place",
          city: "San Francisco",
          street: "Green street",
          category: "house",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 2,
          shared: false,
          description: "Hiking routes 10 min walking away",
          dailyRate: 140,
          userId: "65d7164b-522b-4c6e-b968-814f2a1fef0f", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "Apartment In China Town",
          city: "San Francisco",
          street: "Union Street",
          category: "apartment",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 3,
          shared: false,
          description: "Very nice apartment in China Town",
          dailyRate: 89,
          userId: "503fbfaf-a126-4591-b1e2-43dc4327017c", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "House with Garden",
          city: "New York",
          street: "Long Island, Queens",
          category: "house",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 6,
          shared: false,
          description: "Very nice house in Long Island with garden",
          dailyRate: 189,
          userId: "503fbfaf-a126-4591-b1e2-43dc4327017c", // Assuming this user ID exists from the demo user seeder
        },
        {
          id: uuidv4(),
          title: "Cozy modern Condo",
          city: "New York",
          street: "Penn Station",
          category: "condo",
          image:
            "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 3,
          shared: true,
          description: "Building close to Penn Station",
          dailyRate: 68,
          userId: "503fbfaf-a126-4591-b1e2-43dc4327017c", // Assuming this user ID exists from the demo user seeder
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rentals", null, {});
  },
};
