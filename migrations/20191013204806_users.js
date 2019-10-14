exports.up = function(knex) {
  knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 64)
      .unique()
      .notNullable();

    tbl.string("password", 64).notNullable();
  });
};

exports.down = function(knex) {
  knex.scheme.dropTableIfExists("users");
};
