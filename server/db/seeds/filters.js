
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('filters').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('filters').insert([
        {id: 1, name: 'Spin'},
        {id: 2, name: 'Meat'},
        {id: 3, name: 'Bread'}
      ])
    ])
  });
};
