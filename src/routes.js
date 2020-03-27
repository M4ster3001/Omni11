const express = require( 'express' );
const crypto = require( 'crypto' );
const connection = require( './database/connection' );

const routes = express.Router();

routes.get( '/', ( request, response ) => {
    return response.json( 'Hello World' );
} );

routes.post( '/ongs', async ( request, response ) => {    

    const { name, email, phone, city, uf } = request.body;

    const id = crypto.randomBytes( 4 ).toString( 'HEX' );

    await connection( 'ongs' ).insert({

        id,
        name,
        phone,
        email,
        city,
        uf,

    });

    return response.json();

});

module.exports = routes; 
