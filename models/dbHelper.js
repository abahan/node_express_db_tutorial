// where we write our knex queries
// const knex = require('knex');
// const config = require('../knexfile'); // this is the knexfile.js
// const db = knex(config.development); // this is the development part in knexfile.js

const db = require('../dbConfig');

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addMessage,
  findLessonMessages,
  removeMessage
};
// add, find, findById, update, remove

async function add(lesson) {
  // const id = await db('lessons').insert(lesson).returning('id');
  // return findById(id[0]);/// id alone will be an array

  return await db('lessons').insert(lesson,['id', 'name']);  
}

function find() {

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
function update(id, changes) {

  return (db('lessons')
    .where({ id: id })
    .update(changes)
    .then(() => {
      return findById(id);
    }));

}

function findMessageById(id) {

  return db('messages')
    .where({ id: id })
    .first();
}

async function addMessage(message, lesson_id) {
  // const id = await db('messages')
  //   .where({ lesson_id: lesson_id })
  //   .insert(message).returning('id');
  // return findMessageById(id[0]);/// id alone will be an array

  return await db('messages')
    .where({ lesson_id: lesson_id })
    .insert(message, ['id']);
  
}

function findLessonMessages(lesson_id) {
  return db('lessons as l')
  .join('messages as m', 'l.id', 'm.lesson_id')
  .select('l.id as LessonID',
   'l.name as LessonName',
    'm.id as MessageID',
    'm.sender',
    'm.text'
    ).where({lesson_id: lesson_id})
    
}

 function removeMessage(id) {
  return  db('messages')
    .where({ id: id })
    .del();
   
}
