exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('users');
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.string('last_search');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
};
