// DO YOUR MAGIC
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cars', tbl =>{
        tbl.increments('id');
        tbl.string('vin', 17).unique().notNullable();
        tbl.string('make', 128).notNullable();
        tbl.string('model', 128).notNullable();
        tbl.decimal('mileage').notNullable();
        tbl.string('title', 128);
        tbl.string('transmission', 128);
    })
}

exports.down = function(knex, Promise){
    return knex.schema.dropTableIfExists('cars');
}
