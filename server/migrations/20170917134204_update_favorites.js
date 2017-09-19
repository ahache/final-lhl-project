
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favorites', function(table){
      table.dropColumn('query');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favorites', function(table){
      table.string('query');
    })
  ])
};
