exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('users_filters');
  return Promise.all([
    knex.schema.createTable('users_filters', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('filter_id').unsigned().references('id').inTable('filters');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_filters');
};
