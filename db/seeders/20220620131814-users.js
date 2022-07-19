module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.ru',
        password: '$2b$10$XOTFKf12l0mPntbUzX734uUzUAow2R6zqtpE7FRHz02TNd6oJmg/C',
      },
      {
        email: 'bla@mail.ru',
        password: '$2b$10$XOTFKf12l0mPntbUzX734uUzUAow2R6zqtpE7FRHz02TNd6oJmg/C',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
