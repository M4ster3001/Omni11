
exports.up = function(knex) {
  
    knex.schema.createTable( 'ongs', function( table ) {

        table.string( 'id' ).primary();
        table.string( 'nome' ).notNullable();
        table.string( 'email' ).notNullable();
        table.string( 'phone' ).notNullable();
        table.string( 'city' ).notNullable();
        table.string( 'uf' ).notNullable();

    } );

};

exports.down = function(knex) {

  return knex.schema.dropTable( 'ongs' );
  
};
