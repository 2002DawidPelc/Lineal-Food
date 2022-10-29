import { Component } from "react";
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import traduccions from '../traduccions.json';
import swal from 'sweetalert';
import Empresarios from '../../Imatges/Empresarios.png';
import './Quisom.css';
import FooterPage from '../Footer/FooterPage.js';
import svg from '../../Imatges/wave.png';
import mateu from '../../Imatges/mateu.jpeg';
import dawid from '../../Imatges/dawid.jpg';

export default class Quisom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="general generalQuisom">
                <Container className='llarg'>
                    <Row className="presentacio">
                        <Col>
                            <h1 className="titolQuiSom">{traduccions[sessionStorage.getItem("idioma_id")][0].quisom}</h1>
                            <p className="paragrafQuiSom">{traduccions[sessionStorage.getItem("idioma_id")][0].paragrafQuiSom}</p>
                        </Col>
                        <Col className="heightcol">
                            <img src={Empresarios}></img>
                        </Col>
                    </Row>
                    <div className="fonsblau">
                        <Row className="presentacio2">
                            <Col className="colimatge">
                                <img src={mateu}></img>
                            </Col>
                            <Col xs={8}>
                                <h1 className="titolQuiSom">Mateu Hernández Vich</h1>
                                <p className="paragrafQuiSom mgt">{traduccions[sessionStorage.getItem("idioma_id")][0].perfilmateu1}</p>
                            </Col>
                        </Row>
                        <Row className="presentacio2">
                            <Col xs={8}>
                                <h1 className="titolQuiSom">Dawid Pelc</h1>
                                <p className="paragrafQuiSom mgt">{traduccions[sessionStorage.getItem("idioma_id")][0].perfildawid1}</p>
                            </Col>
                            <Col className="colimatge">
                                <img src={dawid}></img>
                            </Col>
                        </Row>
                    </div>
                    <Row className='waves'>
                        <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                    </Row>
                    <FooterPage></FooterPage>
                </Container>
            </div>
        );
    }
}