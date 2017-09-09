exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('users_favorites');
  return Promise.all([
    knex.schema.createTable('users_favorites', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('favorite_id').unsigned().references('id').inTable('favorites');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_favorites');
};
