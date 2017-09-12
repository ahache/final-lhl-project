
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('users').insert([
        {first_name: 'Matt', last_name: 'Hunglow', email: 'hi@gmail.com', password: "hello", last_search: "Vancouver"},
        {first_name: 'Randy', last_name: 'Loose', email: 'randy@gmail.com', password: "randy", last_search: "Montreal"},
        {first_name: 'Billy', last_name: 'Bob', email: 'bob@gmail.com', password: "bob", last_search: "Saskatoon"}
      ])
    ])
  });
};
