
exports.up = function (knex) {
  return knex.schema
    .createTable('lessons', table => {
      table.increments(); // auto-incrementing 'id' column
      table.text('name', 128).notNullable();
      table.timestamps(true, true);
    })
    .createTable('messages', table => {
      table.increments();
      table.string('sender')
        .notNullable()
        .index();
      table.text('text').notNullable();
      table.timestamps(true, true);

      // Foreign key info to lessons table
      table
        .integer('lesson_id')
        .unsigned()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons');

};
