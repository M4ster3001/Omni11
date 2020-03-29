const express = require( 'express' );

const routes = express.Router();

//Controllers
const ongController = require( './controllers/ongController' );
const incidentsController = require( './controllers/incidentsController' );
const profileController = require( './controllers/profileController' );
const sessionController = require( './controllers/sessionController' );

//Session
routes.post( '/sessions', sessionController.create );

//Ongs
routes.get( '/ongs', ongController.index );
routes.post( '/ongs', ongController.create );

//Profile
routes.get( '/profiles', profileController.index );

//Incidents
routes.get( '/incidents', incidentsController.index );
routes.post( '/incidents', incidentsController.create );
routes.delete( '/incidents/:id', incidentsController.delete );

module.exports = routes; 
