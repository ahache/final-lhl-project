
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_filters').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
       knex('users_filters').insert([
        {id: 1, user_id: 1, filter_id: 2},
        {id: 2, user_id: 1, filter_id: 3},
        {id: 3, user_id: 2, filter_id: 1},
        {id: 4, user_id: 2, filter_id: 2},
        {id: 5, user_id: 3, filter_id: 1},
      ])
    ])
  });
};
