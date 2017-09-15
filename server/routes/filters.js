const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (knex) => {

  const getFiltersPromise = (user_id) => {
    return new Promise((resolve, reject) => {
      knex('users_filters')
      .join('filters', 'filters.id', '=', 'users_filters.filter_id')
      .join('users', 'users.id', '=', 'users_filters.user_id')
      .select(['filters.id', 'filters.name'])
      .where('users.id', '=', user_id)
      .then((filters) => {
        resolve(filters);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  async function getFilters(user_id) {
    const filters = await getFiltersPromise(user_id);
    return filters;
  }

  const getFilterIdPromise = (filter) => {
    return new Promise((resolve, reject) => {
      knex('filters')
      .select('id')
      .where('name', '=', filter)
      .then((result) => {
        console.log("result in filterIdPromise ", result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      })
    });
  }

  async function getFilterId(filter) {
    const filter_id = await getFilterIdPromise(filter);
    return filter_id;
  }

  // const insertIntoFiltersPromise = (user_id, filter)=> {
  //   return new Promise((resolve, reject) => {
  //     knex('filters')
  //     .returning('id')
  //     .insert({name: filter})
  //     .then((id) => {
  //       resolve(id);
  //       filter_id = id[0];
  //       knex('users_filters')
  //       .insert({user_id: user_id, filter_id: filter_id})
  //       .then((results) => {
  //         resolve(results);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  //   });
  // }
  //
  // async function insertIntoFilters(user_id, filter) {
  //   const returned_id = await insertIntoFiltersPromise(user_id, filter);
  //   return returned_id;
  // }
  //
  // const insertIntoUserFiltersPromise = (user_id, filter, filter_id) => {
  //   return new Promise((resolve, reject) => {
  //     knex('users_filters')
  //     .insert({user_id: user_id, filter_id: filter_id})
  //     .then((results) => {
  //       resolve(results);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  //   });
  // }
  //
  // async function insertIntoUserFilters(user_id, filter, filter_id) {
  //   const returned_id = await insertIntoUserFiltersPromise(user_id, filter, filter_id);
  //   return returned_id;
  // }\

  router.delete('/:id', (req, res) => {
    const user_id = jwt.verify(req.body.user, 'CBFC').user;
    knex('users_filters').where('filter_id', req.params.id).andWhere('user_id', user_id).del()
    .then((results) => {
      knex('users_filters')
        .join('filters', 'filters.id', '=', 'users_filters.filter_id')
        .select('filters.name')
        .where('users_filters.user_id', user_id)
        .then((filters) => {
          res.json(filters);
        });
      // const filters = await getFilters(user_id);
      // res.json(filters);
    }).catch((error) => {
      console.log(error);
    });
  });


  router.get("/",  async (req, res) => {
    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user_id = decoded.user;

    const filters = await getFilters(user_id);
    res.json(filters);
  });

  router.post("/", async (req, res) => {

    const user_id = jwt.verify(req.body.user, 'CBFC').user;

    const filter = req.body.filter.toLowerCase();

    const id = await getFilterId(filter);
    console.log(id);

    // const retrievedId = await getFilterId(filter);
    //
    // if (retrievedId) {
    //   const filterInsert = await insertIntoUserFilters(user_id, filter, filter_id);
    // } else {
    //   const filterInsert = await insertIntoFilters(user_id, filter);
    // }

    // let filter_id;
    // if (filter) {

    //   knex('filters')
    //   .select('id')
    //   .where('name', '=', filter)
    //   .then((result) => {

    //     if (result.length === 0) {

    //       knex('filters')
    //       .returning('id')
    //       .insert({name: filter})
    //       .then((id) => {

    //         filter_id = id[0];

    //         knex('users_filters')
    //         .insert({user_id: user_id, filter_id: filter_id})
    //         .then((result) => res.json(filter_id))
    //         .catch(() => res.status(400).send("Failed to add filter for user"));
    //       })

    //       .catch(() => res.status(400).send("Failed to add filter"));
    //     } else {
    //       filter_id = result[0];
    //       knex('users_filters')
    //       .insert({user_id: user_id, filter_id: filter_id})
    //       .then(() => res.status(200).send("Added filter for user"))
    //       .catch(() => res.status(400).send("User already has filter"));
    //     }
    //   })
    //   .catch(() => res.status(400).send("Error accessing filters"))
    // } else {
    //   res.status(400).send("No filter in request");
    // }
  });

  return router;
}
