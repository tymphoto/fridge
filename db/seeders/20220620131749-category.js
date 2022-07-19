module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Молочные продукты',
      },
      {
        name: 'Бакалей',
      },
      {
        name: 'Овощи',
      },
      {
        name: 'Фрукты',
      },
      {
        name: 'Сладости',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
