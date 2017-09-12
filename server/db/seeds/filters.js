
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('filters').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('filters').insert([
        {name: 'Beer'},
        {name: 'Sushi'},
        {name: 'Pizza'}
      ])
    ])
  });
};
