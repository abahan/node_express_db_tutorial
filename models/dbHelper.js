// where we write our knex queries
const knex = require('knex');
const config = require('../knexfile'); // this is the knexfile.js
const db = knex(config.development); // this is the development part in knexfile.js

module.exports = {
  add,
  find,
  findById,
  remove
};
// add, find, findById, update, remove

async function add(lesson) {
  const id = await db('lessons').insert(lesson).returning('id');
  return findById(id[0]);/// id alone will be an array
}

function find(lesson) {

  return db('lessons');
}

function findById(id) {

  return db('lessons')
    .where({ id: id })
    .first();
}

function remove(id) {

  return db('lessons')
    .where({ id: id })
    .del();
}