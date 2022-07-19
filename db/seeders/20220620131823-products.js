module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Вафли',
        image: '/images/wafles.jpg',
        category_id: 5,
        user_id: 1,
      },
      {
        name: 'Молоко',
        image: '/images/moloko.png',
        category_id: 1,
        user_id: 1,
      },
      {
        name: 'Томаты',
        image: '/images/tomato.jpeg',
        category_id: 3,
        user_id: 2,
      },
      {
        name: 'Банан',
        image: '/images/banan.jpeg',
        category_id: 4,
        user_id: 2,
      },
      {
        name: 'Гречка',
        image: '/images/grechka.png',
        category_id: 2,
        user_id: 1,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
