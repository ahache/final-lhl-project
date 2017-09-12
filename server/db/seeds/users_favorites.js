
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_favorites').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('users_favorites').insert([
        {user_id: 1, favorite_id: 2},
        {user_id: 1, favorite_id: 3},
        {user_id: 2, favorite_id: 1},
      ])
    ])
  });
};
