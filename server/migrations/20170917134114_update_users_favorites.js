
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users_favorites', function(table){
      table.string('query');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users_favorites', function(table){
      table.dropColumn('query');
    })
  ])
};
