
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favorites', function(table){
      table.string('query');
      table.dropColumn('city');
      table.dropColumn('phone');
      table.string('place_id');
      table.integer('price_level');
      table.decimal('rating');
      table.dropColumn('country');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favorites', function(table){
      table.dropColumn('query');
      table.string('city');
      table.string('phone');
      table.dropColumn('place_id');
      table.dropColumn('price_level');
      table.dropColumn('rating');
      table.string('country');
    })
  ])
};
