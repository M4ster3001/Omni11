const connection = require( '../database/connection' );

module.exports = {
    
    async index( request, response ) {

        const ong_id = request.headers.authorization;
        const { page = 1, limit = 5 } = request.query;

        const [qtd_tt_incidents] = await connection( 'incidents' ).where( 'ong_id', ong_id ).count();

        const incidents = await connection( 'incidents' )
        .join( 'ongs', 'ong_id', '=', 'incidents.ong_id' )
        .limit( limit )
        .offset( ( page - 1 ) * limit )
        .where( 'ong_id', ong_id )
        .select( [ 'incidents.*', 'ongs.name', 'ongs.email', 'ongs.phone', 'ongs.city', 'ongs.uf' ] );

        response.header( 'X-Total-incidents', qtd_tt_incidents['count(*)'] );

        return response.json( incidents );
 
    },

    async create( request, response ) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection( 'incidents' ).insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });

    },

    async delete( request, response ) {

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection( 'incidents' ).where( 'id', id ).select( 'ong_id' ).first();

        if( incidents.ong_id != ong_id ) {

            return response.status( 401 ).json( 'Operação não permitida' );

        }

        await connection( 'incidents' ).where( 'id', id ).delete();
        return response.status( 204 ).send();

    }

};