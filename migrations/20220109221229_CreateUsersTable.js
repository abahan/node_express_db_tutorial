
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
      
        table.text('username', 128).notNullable().unique().index();
        table.text('password', 255).notNullable();
        table.increments(); // auto-incrementing 'id' column

    });
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
  
};
