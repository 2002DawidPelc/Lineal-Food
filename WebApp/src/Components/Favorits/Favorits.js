import React from 'react';
import { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import './Favorits.css'
import '../animate.js';
import traduccions from '../traduccions.json';
import FooterPage from '../Footer/FooterPage';
import svg from '../../Imatges/wave.png';

export default class Favorits extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorits: []
        }
    }

    componentDidMount() {
        this.descarrega(sessionStorage.getItem("id"));
    }

    descarrega = (id_usuari) => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/preferitsUsuari/' + id_usuari, {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({ favorits: respostajson.sort() });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    eliminar = (aliment_id) => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/preferits/' + sessionStorage.getItem("id") + '/' + aliment_id, {
            method: 'DELETE',
        })
            .then(resposta => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        console.log(this.state.favorits)
        return (
            <div className='fonsRestaurants222'>
                <Container className='container1'>
                    <Row>
                        <Col><div><p className='titolGran2'>{traduccions[sessionStorage.getItem("idioma_id")][0].alimentsfavorits}</p></div></Col>
                    </Row>
                    {this.state.favorits.length != 0 && (
                        <Row className='rowAliments'>
                            {this.state.favorits.map((valor, clau) => {
                                return (
                                    <Col className='colAlments2' id={'colAliments' + clau}>
                                        <div className='prova'>
                                            <img className='img1 img2' src={valor.detall_aliment.url_foto}>
                                            </img>
                                        </div>

                                        <div className='divGranIcones divGranIcones2' >

                                            <div>
                                                <div className='alinear'>
                                                    {sessionStorage.getItem("idioma_id") == "ca" && <p className='titol' >{valor.detall_aliment.ca}</p>}
                                                    {sessionStorage.getItem("idioma_id") == "es" && <p className='titol' >{valor.detall_aliment.es}</p>}
                                                    {sessionStorage.getItem("idioma_id") == "en" && <p className='titol' >{valor.detall_aliment.en}</p>}
                                                </div>
                                                <p className='infoAliment vermell' onClick={() => this.eliminar(valor.detall_aliment.id)}>
                                                    {traduccions[sessionStorage.getItem("idioma_id")][0].eliminardf}
                                                </p>
                                                <p className='infoAliment' onClick={() => { window.location.assign("/detall_aliment/" + valor.detall_aliment.id); }}>
                                                    {traduccions[sessionStorage.getItem("idioma_id")][0].cpm}
                                                </p>
                                            </div>
                                        </div>

                                    </Col>
                                )
                            })}
                        </Row>
                    )}
                    {this.state.favorits.length == 0 && (
                        <p className='vermell notens'>{traduccions[sessionStorage.getItem("idioma_id")][0].notensfavs}</p>
                    )}
                </Container>
                <Row className='waves'>
                    <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                </Row>
                <FooterPage />
            </div>
        )
    }
}