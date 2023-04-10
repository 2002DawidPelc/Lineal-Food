import { Col, Container, Row } from 'react-bootstrap';
import { Component } from "react";
import Cercador from './Cercador/Cercador';
import tipusaliment from '../Imatges/tipusaliments.png';
import cor from '../Imatges/cor.png';
import hidrats from '../Imatges/hidrats.png';
import proteines from '../Imatges/proteines.png';
import greixos from '../Imatges/greixos.png';
import traduccions from './traduccions.json';
import calendari from '../Imatges/calendario.jpg';
import FooterPage from './Footer/FooterPage';
import svg from '../Imatges/wave.png';

export default class Principal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aliments: [],
        }
    }

    componentDidMount() {
        this.descarrega();
    }

    descarrega = () => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                console.log(respostajson)
                this.setState({ aliments: respostajson });
                let inicial = document.querySelectorAll('.slideinLeftInici')
                for (var i = 0; i < inicial.length; i++) {
                    inicial[i].classList.add("salirIzquierda");
                    inicial[i].style.opacity = 1;
                }

                let titol = document.querySelectorAll('.divTitol');
                for (var i = 0; i < titol.length; i++) {
                    titol[i].classList.add("salirDerecha");
                    titol[i].style.opacity = 1;
                }

                let cols = document.querySelectorAll('.rowAliments');
                for (var i = 0; i < cols.length; i++) {
                    cols[i].classList.add("salirIzquierda");
                    cols[i].style.opacity = 1;
                }

                let animadosL = document.querySelectorAll('.slideinLeft');
                let animadosR = document.querySelectorAll('.slideinRight');
                let animadosT = document.querySelectorAll('.slideinTop');
                let animadosB = document.querySelectorAll('.slideinBottom');

                function aparecer() {
                    let scrollTop = document.documentElement.scrollTop;
                    for (var i = 0; i < animadosL.length; i++) {
                        let alturaAnimado = animadosL[i].offsetTop;
                        if (alturaAnimado - 800 < scrollTop) {
                            animadosL[i].style.opacity = 1;
                            animadosL[i].classList.add("salirIzquierda");
                        }
                    }
                    for (var i = 0; i < animadosR.length; i++) {
                        let alturaAnimado = animadosR[i].offsetTop;
                        if (alturaAnimado - 800 < scrollTop) {
                            animadosR[i].style.opacity = 1;
                            animadosR[i].classList.add("salirDerecha");
                        }
                    }
                    for (var i = 0; i < animadosT.length; i++) {
                        let alturaAnimado = animadosT[i].offsetTop;
                        if (alturaAnimado - 800 < scrollTop) {
                            animadosT[i].style.opacity = 1;
                            animadosT[i].classList.add("salirArriba");
                        }
                    }
                    for (var i = 0; i < animadosB.length; i++) {
                        let alturaAnimado = animadosB[i].offsetTop;
                        if (alturaAnimado - 800 < scrollTop) {
                            animadosB[i].style.opacity = 1;
                            animadosB[i].classList.add("salirAbajo");
                        }
                    }
                }
                window.addEventListener('scroll', aparecer);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (<div>
            <div className='FullWidth'>
                <div className='f2'>
                    <Container className='ocultar'>
                        <Row>
                            <Col className='blanc'>
                                <h1 className='h1principal'>{traduccions[sessionStorage.getItem("idioma_id")][0].clta}</h1>
                                <p className='reduir'>{traduccions[sessionStorage.getItem("idioma_id")][0].intro}</p>
                            </Col>
                            <Col>
                                <Cercador placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments}></Cercador>
                            </Col>
                        </Row>
                    </Container>
                    <Container className='mostrar'>
                        <Row>
                            <Col className='blanc'>
                                <h1>{traduccions[sessionStorage.getItem("idioma_id")][0].clta}</h1>
                                <p className='reduir'>{traduccions[sessionStorage.getItem("idioma_id")][0].intro}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Cercador placeholder={"Cercar un aliment..."} dades={this.state.aliments}></Cercador>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className='FullWidth slideinLeftInici'>
                <Container className='filaPlat'>
                    <Row className='filaPlatRow'>
                        <Col className='clasePlat' >
                            <div><img src={tipusaliment} className='plat'></img></div>
                        </Col>
                        <Col className='claseText'>
                            <h1>{traduccions[sessionStorage.getItem("idioma_id")][0].av}</h1>
                            <hr></hr>
                            <p className='reduir'>{traduccions[sessionStorage.getItem("idioma_id")][0].avtxt}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='FullWidth slideinRight'>
                <Container className='filaPlat'>
                    <Row className='filaPlatRow'>
                        <Col className='claseText'>
                            <h1>{traduccions[sessionStorage.getItem("idioma_id")][0].cetc}</h1>
                            <hr></hr>
                            <p className='reduir'>{traduccions[sessionStorage.getItem("idioma_id")][0].cetctxt}</p>
                        </Col>
                        <Col className='clasePlat' >
                            <div><img src={cor} className='plat'></img></div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='FullWidth'>
                <div className='f3'>
                    <Container>
                        <Row className='llibre'>
                            <Col xs={4}>
                                <div className="imgLoader"></div>
                                <div className="container">
                                    <div className="book">
                                        <div className="gap"></div>
                                        <div className="pages">
                                            <div className="page"></div>
                                            <div className="page"></div>
                                            <div className="page"></div>
                                            <div className="page"></div>
                                            <div className="page"></div>
                                            <div className="page"></div>
                                        </div>
                                        <div className="flips">
                                            <div className="flip flip1">
                                                <div className="flip flip2">
                                                    <div className="flip flip3">
                                                        <div className="flip flip4">
                                                            <div className="flip flip5">
                                                                <div className="flip flip6">
                                                                    <div className="flip flip7"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                            </Col>
                            <Col xs={7} className='claseText ssaass'>
                                <h1 className='aauuaauu'>{traduccions[sessionStorage.getItem("idioma_id")][0].tsdaea}</h1>
                                <p className='reduir'>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].alimentsferro}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className='FullWidth'>
                <div className='f4'>
                    <Container className='contenedorFruites'>
                        <Row className='rowFruites'>
                            <Col className='colFruites slideinTop'>
                                <div><img src={proteines} className='fruites'></img></div>
                                <div><h3>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes.toUpperCase()}</h3></div>
                                <div>
                                    <p>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].infoproteines}
                                    </p>
                                </div>
                            </Col>
                            <Col className='colFruites slideinBottom'>
                                <div><img src={greixos} className='fruites'></img></div>
                                <div><h3>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos.toUpperCase()}</h3></div>
                                <div>
                                    <p>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].infogreixos}
                                    </p>
                                </div>
                            </Col>
                            <Col className='colFruites slideinTop'>
                                <div><img src={hidrats} className='fruites'></img></div>
                                <div><h3>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats.toUpperCase()}</h3></div>
                                <div>
                                    <p>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].infohidrats}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Row className='waves'>
                        <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                    </Row>
                    <FooterPage />
                </div>
            </div>
        </div>
        )
    }


}