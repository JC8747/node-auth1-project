
exports.up = function(knex) {
    return knex.schema.createTable("users", users => {
        users.increments();
        users
          .string("username", 222)
          .notNullable()
          .unique();
        users.string("password", 222).notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
