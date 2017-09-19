exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('filters');
  return Promise.all([
    knex.schema.createTable('filters', function (table) {
      table.increments('id');
      table.string('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('filters')
  ])
};
