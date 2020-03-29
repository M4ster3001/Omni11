import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Incidents() {

    const [ title, setTitle ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ value, setValue ] = useState( '' );

    const history = useHistory();
    
    const ongId = localStorage.getItem( 'id' );

    async function handleRegisterIncident( e ) {
        e.preventDefault();

        
        const data = { title, description, value };
       
        try {

            const response = await api.post( 'incidents', { headers: { Authorization: ongId }, data } );
            alert( 'Incidente cadastro Nº.' + response.data.id );

            history.push( '/profiles' );

        }catch( er ) {

            alert( 'Erro ao cadastrar o incidente' );

        }

    }

    return (
    <div className="incidents-container">
       <div className="content">
            <section>
                <Link to="/" exact="true" className="back-link-ini"><img src={ logoImg } alt="Be the Hero" /></Link>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link to="/profile" className="back-link"><FiArrowLeft size={ 16 } color="#e02041" />Voltar para o inicio</Link>
            </section>
            <form onSubmit={ handleRegisterIncident }>
                <input placeholder="Título do caso" value={ title } onChange={ e => setTitle( e.target.value ) } />                
                <textarea placeholder="Descrição" value={ description } onChange={ e => setDescription( e.target.value ) }></textarea>
                <input type="number" placeholder="Valor em reais" value={ value } onChange={ e => setValue( e.target.value ) } />

                <div className="button-group">
                    <button className="button btn-cancel" type="submit">Cancelar</button>
                    <button className="button btn-success" type="submit">Cadastrar</button>
                </div>               
            </form>
        </div>
    </div>
    );
}