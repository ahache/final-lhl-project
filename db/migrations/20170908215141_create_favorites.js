exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('favorites');
  return Promise.all([
    knex.schema.createTable('favorites', function (table) {
      table.increments('id');
      table.float('latitude');
      table.float('longitude');
      table.string('name');
      table.string('address');
      table.string('city');
      table.string('phone');
      table.string('country');
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('favorites');
};
