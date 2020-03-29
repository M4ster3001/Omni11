import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower ,FiPlusCircle, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const ongId = localStorage.getItem( 'id' );
    const ongName = localStorage.getItem( 'ongName' );
    const history = useHistory();

    const [incidents, setIncidents] = useState( [] );

    useEffect( () => {
        api.get( '/profiles?page=1&limit=3', { 
            headers: { Authorization: ongId } 
        } ).then( response => {
            setIncidents( response.data );
        } ) 
    }, [ongId] );

    async function handleDelete( id ){
        try {

            await api.delete( `/incidents/${ id }`, 
                {
                    headers: { Authorization: ongId } 
                }
            );

            setIncidents( incidents.filter( incident => incident.id !== id ) );

        } catch( er ) {

            alert( 'Erro ao deletar caso' );

        }
    }

    function handleLogout() {
        
        localStorage.clear();
        history.push( '/' );

    } 

    return (
        <div className="profile-container">
            <header>
                <Link to="/" exact="true" className="back-link-ini"><img src={ logoImg } alt="Be the Hero" /></Link>
                <span>Bem vinda, { ongName }</span>

                <Link to="/incidents/new" className="button btn-success" ><FiPlusCircle size={ 16 } /> Cadastrar novo caso</Link>
                <button type="button" onClick={ handleLogout }><FiPower size={ 18 } color="#e02041" /></button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                { 
                    incidents.map( incident => (
                        <li key={ incident.id }>
                            <strong>CASO: </strong>
                            <p>{ incident.title }</p>

                            <strong>DESCRIÇÃO: </strong>
                            <p>{ incident.description }</p>

                            <strong>VALOR:</strong>
                            <p>{ Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format( incident.value ) }</p>

                            <button onClick={ () => handleDelete( incident.id ) } ><FiTrash2 size={ 20 } color="#a8a8b3" /></button>
                        </li>  
                    ) ) 
                }                           
            </ul>
        </div>
    );

}