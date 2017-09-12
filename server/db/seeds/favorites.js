
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
  .then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('favorites').insert([
        {latitude: 49.2757, longitude: 123.1281, name: 'Spin Society', address: "1332 Granville St, Vancouver, BC V6Z 1M7", city: "Vancouver", phone: '(604) 558-4509', country: "Canada"},
        {latitude: 49.282624, longitude: -123.109376, name: 'Meat & Bread', address: "370 Cambie St, Vancouver, BC V6B 1H7", city: "Vancouver", phone: '', country: "Canada"},
        {latitude: 49.282196, longitude: -123.108965, name: 'Eastwood', address: "154 W Hastings St, Vancouver, BC V6B", city: "Vancouver", phone: '+1 604-899-3278', country: "Canada"},
      ])
    ])
  });
};
