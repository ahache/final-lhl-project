exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('users_filters');
  return Promise.all([
    knex.schema.createTable('users_filters', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('filter_id').unsigned().references('id').inTable('filters').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_filters')
  ])
};
