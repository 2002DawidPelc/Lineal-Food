import { Component } from "react";
import { Col, Container, Form, NavDropdown, NavLink, Row, Table } from 'react-bootstrap';
import './Diari.css';
import traduccions from '../traduccions.json';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleDown, FaArrowCircleUp, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import CercadorDiari from "./CercadorDiari";
import swal from 'sweetalert';
import FooterPage from "../Footer/FooterPage";
import svg from '../../Imatges/wave.png';
import {
    // main component
    Chart,
    // graphs
    Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
    // wrappers
    Layer, Animate, Transform, Handlers,
    // helpers
    helpers, DropShadow, Gradient
} from 'rumble-charts';

export default class Diari extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);

        this.state = {
            avui: date,
            actual: date,
            llista: [],
            esmorzar: [],
            dinar: [],
            berenar: [],
            sopar: [],
            totalcalories: [],
            aliments: [],
            caloriesGrafic: [],
            datesGrafic: []
        }

    }

    componentDidMount = () => {
        if (sessionStorage.getItem("dataactual") != this.state.actual) {
            this.setState({ actual: sessionStorage.getItem("dataactual") }, () => {
                this.descarrega();
            })
        } else {
            this.descarrega();
        }
        sessionStorage.setItem("dataactual", this.state.actual);
    }

    /*componentDidUpdate = (prevState) => {
        if((parseFloat(sessionStorage.getItem("aconsumir")) - (this.state.totalcalories.calories)) < 0){
            console.log(prevState)
            
            swal(traduccions[sessionStorage.getItem("idioma_id")][0].thp, traduccions[sessionStorage.getItem("idioma_id")][0].hcmcdlc, "error");
        
        }
    }*/

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.descarrega();
        });
    }

    descarrega() {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliment_diari/' + sessionStorage.getItem("id") + '/' + this.state.actual, {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    llista: respostajson
                });
                let esmorzar = { "greixos": 0, "hidrats": 0, "proteines": 0, "sodi": 0, "sucre": 0, "fibra": 0, "calories": 0 };
                let dinar = { "greixos": 0, "hidrats": 0, "proteines": 0, "sodi": 0, "sucre": 0, "fibra": 0, "calories": 0 };
                let berenar = { "greixos": 0, "hidrats": 0, "proteines": 0, "sodi": 0, "sucre": 0, "fibra": 0, "calories": 0 };
                let sopar = { "greixos": 0, "hidrats": 0, "proteines": 0, "sodi": 0, "sucre": 0, "fibra": 0, "calories": 0 };
                let totalcalories = { "greixos": 0, "hidrats": 0, "proteines": 0, "sodi": 0, "sucre": 0, "fibra": 0, "calories": 0 };
                let c1 = 0;
                let c2 = 0;
                let c3 = 0;
                let c4 = 0;
                for (let valor of respostajson) {
                    if (valor.menjar_del_dia == "esmorzar") {
                        c1++;
                        esmorzar["greixos"] += valor.greixos == null ? 0 : parseFloat(valor.greixos);
                        esmorzar["hidrats"] += valor.hidrats == null ? 0 : parseFloat(valor.hidrats);
                        esmorzar["proteines"] += valor.proteines == null ? 0 : parseFloat(valor.proteines);
                        esmorzar["sucre"] += valor.sucre == null ? 0 : parseFloat(valor.sucre);
                        esmorzar["sodi"] += valor.sodi == null ? 0 : parseFloat(valor.sodi);
                        esmorzar["fibra"] += valor.fibra == null ? 0 : parseFloat(valor.fibra);
                        esmorzar["calories"] += valor.calories == null ? 0 : parseFloat(valor.calories);
                    }
                    if (valor.menjar_del_dia == "dinar") {
                        c2++;
                        dinar["greixos"] += valor.greixos == null ? 0 : parseFloat(valor.greixos);
                        dinar["hidrats"] += valor.hidrats == null ? 0 : parseFloat(valor.hidrats);
                        dinar["proteines"] += valor.proteines == null ? 0 : parseFloat(valor.proteines);
                        dinar["sucre"] += valor.sucre == null ? 0 : parseFloat(valor.sucre);
                        dinar["sodi"] += valor.sodi == null ? 0 : parseFloat(valor.sodi);
                        dinar["fibra"] += valor.fibra == null ? 0 : parseFloat(valor.fibra);
                        dinar["calories"] += valor.calories == null ? 0 : parseFloat(valor.calories);
                    }
                    if (valor.menjar_del_dia == "berenar") {
                        c3++;
                        berenar["greixos"] += valor.greixos == null ? 0 : parseFloat(valor.greixos);
                        berenar["hidrats"] += valor.hidrats == null ? 0 : parseFloat(valor.hidrats);
                        berenar["proteines"] += valor.proteines == null ? 0 : parseFloat(valor.proteines);
                        berenar["sucre"] += valor.sucre == null ? 0 : parseFloat(valor.sucre);
                        berenar["sodi"] += valor.sodi == null ? 0 : parseFloat(valor.sodi);
                        berenar["fibra"] += valor.fibra == null ? 0 : parseFloat(valor.fibra);
                        berenar["calories"] += valor.calories == null ? 0 : parseFloat(valor.calories);
                    }
                    if (valor.menjar_del_dia == "sopar") {
                        c4++;
                        sopar["greixos"] += valor.greixos == null ? 0 : parseFloat(valor.greixos);
                        sopar["hidrats"] += valor.hidrats == null ? 0 : parseFloat(valor.hidrats);
                        sopar["proteines"] += valor.proteines == null ? 0 : parseFloat(valor.proteines);
                        sopar["sucre"] += valor.sucre == null ? 0 : parseFloat(valor.sucre);
                        sopar["sodi"] += valor.sodi == null ? 0 : parseFloat(valor.sodi);
                        sopar["fibra"] += valor.fibra == null ? 0 : parseFloat(valor.fibra);
                        sopar["calories"] += valor.calories == null ? 0 : parseFloat(valor.calories);
                    }
                    totalcalories["greixos"] += valor.greixos == null ? 0 : parseFloat(valor.greixos);
                    totalcalories["hidrats"] += valor.hidrats == null ? 0 : parseFloat(valor.hidrats);
                    totalcalories["proteines"] += valor.proteines == null ? 0 : parseFloat(valor.proteines);
                    totalcalories["sucre"] += valor.sucre == null ? 0 : parseFloat(valor.sucre);
                    totalcalories["sodi"] += valor.sodi == null ? 0 : parseFloat(valor.sodi);
                    totalcalories["fibra"] += valor.fibra == null ? 0 : parseFloat(valor.fibra);
                    totalcalories["calories"] += valor.calories == null ? 0 : parseFloat(valor.calories);
                }
                this.setState({
                    esmorzar: esmorzar,
                    dinar: dinar,
                    berenar: berenar,
                    sopar: sopar,
                    totalcalories: totalcalories
                })
                if (c1 == 0) {
                    document.getElementById("flextaabaix1").style.display = "none";
                    document.getElementById("flextaadalt1").style.display = "none";
                }
                if (c2 == 0) {
                    document.getElementById("flextaabaix2").style.display = "none";
                    document.getElementById("flextaadalt2").style.display = "none";
                }
                if (c3 == 0) {
                    document.getElementById("flextaabaix3").style.display = "none";
                    document.getElementById("flextaadalt3").style.display = "none";
                }
                if (c4 == 0) {
                    document.getElementById("flextaabaix4").style.display = "none";
                    document.getElementById("flextaadalt4").style.display = "none";
                }

                if (sessionStorage.getItem("alimentInserit") == "inserit") {
                    let mostrar = document.getElementsByClassName("ocult" + sessionStorage.getItem("numero"));
                    for (let valor of mostrar) {
                        console.log(valor);
                        valor.style.display = "flex";
                        document.getElementById("flextaabaix" + sessionStorage.getItem("numero")).style.display = "none";
                        document.getElementById("flextaadalt" + sessionStorage.getItem("numero")).style.display = "inline";
                    }
                }
                this.descarregaGrafic();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    descarregaGrafic() {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/grafic/' + sessionStorage.getItem("id"), {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                let caloriesGrafic = [];
                let diesGrafic = [];
                let titolsGraficCalories = [];
                let contador = 0;
                for (let valor of respostajson.reverse()) {
                    caloriesGrafic.push(parseInt(valor['sum(calories)']));
                    diesGrafic.push({
                        label: valor.data_diari,
                        x: contador
                    })
                    titolsGraficCalories.push({
                        label: parseInt(valor['sum(calories)']),
                        x: contador
                    })
                    contador++;
                }
                this.setState({
                    caloriesGrafic: caloriesGrafic,
                    datesGrafic: diesGrafic,
                    titolsGraficCalories: titolsGraficCalories
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    anterior = () => {
        let actual = new Date(this.state.actual)
        actual.setDate(actual.getDate() - 1);
        this.setState({ actual: actual.getFullYear() + '-' + ("0" + (actual.getMonth() + 1)).slice(-2) + '-' + ("0" + (actual.getDate())).slice(-2) }, () => {
            this.descarrega();
            sessionStorage.setItem("dataactual", this.state.actual);
        });
    }

    seguent = () => {
        let actual = new Date(this.state.actual)
        actual.setDate(actual.getDate() + 1);
        this.setState({ actual: actual.getFullYear() + '-' + ("0" + (actual.getMonth() + 1)).slice(-2) + '-' + ("0" + (actual.getDate())).slice(-2) }, () => {
            this.descarrega();
            sessionStorage.setItem("dataactual", this.state.actual);
        });
    }

    onClick1 = () => {
        let mostrar = document.getElementsByClassName("ocult1");
        for (let valor of mostrar) {
            if (valor.style.display == "none") {
                valor.style.display = "flex";
                document.getElementById("flextaabaix1").style.display = "none";
                document.getElementById("flextaadalt1").style.display = "inline";
            } else {
                valor.style.display = "none";
                document.getElementById("flextaabaix1").style.display = "inline";
                document.getElementById("flextaadalt1").style.display = "none";
            }
        }
    }

    onClick2 = () => {
        let mostrar = document.getElementsByClassName("ocult2");
        for (let valor of mostrar) {
            if (valor.style.display == "none") {
                valor.style.display = "flex";
                document.getElementById("flextaabaix2").style.display = "none";
                document.getElementById("flextaadalt2").style.display = "inline";
            } else {
                valor.style.display = "none";
                document.getElementById("flextaabaix2").style.display = "inline";
                document.getElementById("flextaadalt2").style.display = "none";
            }
        }
    }

    onClick3 = () => {
        let mostrar = document.getElementsByClassName("ocult3");
        for (let valor of mostrar) {
            if (valor.style.display == "none") {
                valor.style.display = "flex";
                document.getElementById("flextaabaix3").style.display = "none";
                document.getElementById("flextaadalt3").style.display = "inline";
            } else {
                valor.style.display = "none";
                document.getElementById("flextaabaix3").style.display = "inline";
                document.getElementById("flextaadalt3").style.display = "none";
            }
        }
    }

    onClick4 = () => {
        let mostrar = document.getElementsByClassName("ocult4");
        for (let valor of mostrar) {
            if (valor.style.display == "none") {
                valor.style.display = "flex";
                document.getElementById("flextaabaix4").style.display = "none";
                document.getElementById("flextaadalt4").style.display = "inline";
            } else {
                valor.style.display = "none";
                document.getElementById("flextaabaix4").style.display = "inline";
                document.getElementById("flextaadalt4").style.display = "none";
            }
        }
    }

    add1 = () => {
        sessionStorage.setItem("numero", "1")
        if (document.getElementById("tancar1").style.display == "none") {
            document.getElementById("afegir1").style.display = "none";
            document.getElementById("tancar1").style.display = "inline";
        } else {
            document.getElementById("afegir1").style.display = "inline";
            document.getElementById("tancar1").style.display = "none";
        }
        let mostrar = document.getElementById("cercadorMostrar1");
        if (mostrar.style.display == "none") {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
                method: 'GET',
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    this.setState({ aliments: respostajson });
                })
                .catch(function (error) {
                    console.log(error);
                })
            let general = document.getElementById("cercadorMostrar1");
            general.style.display = "flex";
            general.firstChild.lastChild.style.display = "block";
            general.firstChild.firstChild.style.display = "none";
            general.lastChild.firstChild.style.display = "none";

        } else {
            document.getElementById("cercadorMostrar1").style.display = "none";
        }
    }

    add2 = () => {
        sessionStorage.setItem("numero", "2")
        if (document.getElementById("tancar2").style.display == "none") {
            document.getElementById("afegir2").style.display = "none";
            document.getElementById("tancar2").style.display = "inline";
        } else {
            document.getElementById("afegir2").style.display = "inline";
            document.getElementById("tancar2").style.display = "none";
        }
        let mostrar = document.getElementById("cercadorMostrar2");
        if (mostrar.style.display == "none") {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
                method: 'GET',
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    this.setState({ aliments: respostajson });
                })
                .catch(function (error) {
                    console.log(error);
                })
            let general = document.getElementById("cercadorMostrar2");
            console.log(general)
            general.style.display = "flex";
            general.firstChild.lastChild.style.display = "block";
            general.firstChild.firstChild.style.display = "none";
            general.lastChild.firstChild.style.display = "none";

        } else {
            document.getElementById("cercadorMostrar2").style.display = "none";
        }
    }

    add3 = () => {
        sessionStorage.setItem("numero", "3")
        if (document.getElementById("tancar3").style.display == "none") {
            document.getElementById("afegir3").style.display = "none";
            document.getElementById("tancar3").style.display = "inline";
        } else {
            document.getElementById("afegir3").style.display = "inline";
            document.getElementById("tancar3").style.display = "none";
        }
        let mostrar = document.getElementById("cercadorMostrar3");
        if (mostrar.style.display == "none") {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
                method: 'GET',
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    this.setState({ aliments: respostajson });
                })
                .catch(function (error) {
                    console.log(error);
                })
            let general = document.getElementById("cercadorMostrar3");
            console.log(general)
            general.style.display = "flex";
            general.firstChild.lastChild.style.display = "block";
            general.firstChild.firstChild.style.display = "none";
            general.lastChild.firstChild.style.display = "none";

        } else {
            document.getElementById("cercadorMostrar3").style.display = "none";
        }
    }

    add4 = () => {
        sessionStorage.setItem("numero", "4")
        if (document.getElementById("tancar4").style.display == "none") {
            document.getElementById("afegir4").style.display = "none";
            document.getElementById("tancar4").style.display = "inline";
        } else {
            document.getElementById("afegir4").style.display = "inline";
            document.getElementById("tancar4").style.display = "none";
        }
        let mostrar = document.getElementById("cercadorMostrar4");
        if (mostrar.style.display == "none") {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
                method: 'GET',
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    this.setState({ aliments: respostajson });
                })
                .catch(function (error) {
                    console.log(error);
                })
            let general = document.getElementById("cercadorMostrar4");
            console.log(general)
            general.style.display = "flex";
            general.firstChild.lastChild.style.display = "block";
            general.firstChild.firstChild.style.display = "none";
            general.lastChild.firstChild.style.display = "none";

        } else {
            document.getElementById("cercadorMostrar4").style.display = "none";
        }
    }

    esborraAliment = (clau) => {
        let mdd = clau.split(' ')[0];
        let ida = clau.split(' ')[1];
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliment_diari/' + ida + "/" + sessionStorage.getItem("id") + "/" + mdd + "/" + this.state.actual, {
            method: 'DELETE',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                if (respostajson.status == "eliminat") {
                    this.descarrega();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const series = [{
            data: [1, 2, 3]
        }];

        return (
            <div className="generaldiari">
                <br></br><br></br><br></br>
                <Container className="diari">
                    <Row className="gris">
                        <Col xs={6} className="columna6cercador">
                            <p>
                                <FaArrowCircleLeft className="sobre" onClick={this.anterior} />&nbsp;
                                <input name="actual" className="inputdiari" type="date" id="avui" value={this.state.actual} onChange={this.onChange}></input>
                                &nbsp;<FaArrowCircleRight className="sobre" onClick={this.seguent} />
                            </p>
                        </Col>
                        {sessionStorage.getItem("objectiu_establert") == "si" && (
                            <Col className="colObjectiu lineheight">
                                <p className="obj1">{traduccions[sessionStorage.getItem("idioma_id")][0].objectiu}</p>
                                <p>{traduccions[sessionStorage.getItem("idioma_id")][0].consumir} {parseFloat(sessionStorage.getItem("aconsumir")).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].calories.toLowerCase()}</p>
                            </Col>
                        )}
                        {sessionStorage.getItem("objectiu_establert") == "no" && (
                            <Col className="colObjectiu lineheight">
                                <p className="obj1">{traduccions[sessionStorage.getItem("idioma_id")][0].objectiu_noes1}</p>
                                <p>{traduccions[sessionStorage.getItem("idioma_id")][0].objectiu_noes2}</p>
                            </Col>
                        )}
                    </Row>
                    {sessionStorage.getItem("objectiu_establert") == "si" && (
                        <Row className="gris lineheight">
                            <Col>
                                <p>{(parseFloat(this.state.totalcalories.calories)).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].consumides}</p>
                            </Col>

                            <Col>
                                {(parseFloat(sessionStorage.getItem("aconsumir")) - (this.state.totalcalories.calories)) >= 0 && (
                                    <p className="verd">{(parseFloat(sessionStorage.getItem("aconsumir")) - (this.state.totalcalories.calories)).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].restants}</p>
                                )}
                                {(parseFloat(sessionStorage.getItem("aconsumir")) - (this.state.totalcalories.calories)) < 0 && (
                                    <p className="vermell">{(parseFloat(sessionStorage.getItem("aconsumir")) - (this.state.totalcalories.calories)).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].restants}</p>
                                )}
                            </Col>
                        </Row>
                    )}
                    {sessionStorage.getItem("objectiu_establert") == "no" && (
                        <Row className="gris lineheight">
                            <Col>
                                <p>{(parseFloat(this.state.totalcalories.calories)).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].calories.toLowerCase()} {traduccions[sessionStorage.getItem("idioma_id")][0].consumides}</p>
                            </Col>
                        </Row>
                    )}
                    <Row className="resum gris lineheight">
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        </Col>
                    </Row>
                    <Row className="resum gris lineheight">
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.greixos).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.hidrats).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.proteines).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.sucre).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.sodi).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.fibra).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.totalcalories.calories).toFixed(2)}</p>
                        </Col>
                    </Row>
                </Container>

                <Container className="diari linies">
                    <Row className="gris">
                        <Col className="noOcultar noOcultarImp">
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].menjar1}</p>
                        </Col>
                        <Col>
                            <p>
                                <FaArrowCircleDown id="flextaabaix1" onClick={this.onClick1} />
                                <FaArrowCircleUp id="flextaadalt1" style={{ display: 'none' }} onClick={this.onClick1} />&nbsp;
                                <FaPlusCircle onClick={this.add1} id="afegir1" />
                                <FaMinusCircle onClick={this.add1} id="tancar1" style={{ display: 'none' }} />
                                <ImCross id='creu1' style={{ display: 'none' }} className="mida1 crosseliminar" />
                                <TiTick id="accept1" style={{ fontSize: 160, display: 'none' }} className="mida2 verdclar" />
                            </p>
                        </Col>
                    </Row>
                    <Row id="cercadorMostrar1" style={{ display: 'none' }} className="negre">
                        <Col>
                            <p style={{ display: 'none' }} className="afegint"></p>
                            <CercadorDiari placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments} descarrega={this.descarrega.bind(this)}></CercadorDiari>
                        </Col>
                        <Col>
                            <p style={{ display: 'none' }} className="afegint dreta" id="paragraf1">
                                {traduccions[sessionStorage.getItem("idioma_id")][0].quantitat} <input type="number" className="inputcurt" id="inputquantitat1"></input> g
                            </p>
                        </Col>
                    </Row>
                    <Row className="gris especial">
                        <Col xs={3}></Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="gris">
                        <Col xs={3}>
                            <p>Total</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.greixos).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.hidrats).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.proteines).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.sucre).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.sodi).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.fibra).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.esmorzar.calories).toFixed(2)}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    {
                        this.state.llista.map((aliment, clau) => {
                            if (aliment.menjar_del_dia == "esmorzar")
                                return <Row className="ocult1 fila gris" style={{ display: 'none' }}>
                                    <Col xs={3}>
                                        {sessionStorage.getItem("idioma_id") == "ca" && (
                                            <p onClick={() => { window.location.assign('detall_aliment/' + aliment.aliment_id) }}>{aliment.detall_aliment.ca}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "es" && (
                                            <p onClick={() => { window.location.assign('detall_aliment/' + aliment.aliment_id) }}>{aliment.detall_aliment.es}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "en" && (
                                            <p onClick={() => { window.location.assign('detall_aliment/' + aliment.aliment_id) }}>{aliment.detall_aliment.en}<br></br>{aliment.quantitat} g</p>
                                        )}
                                    </Col>
                                    <Col>
                                        <p>{aliment.greixos == null ? 0 : parseFloat(aliment.greixos).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.hidrats == null ? 0 : parseFloat(aliment.hidrats).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.proteines == null ? 0 : parseFloat(aliment.proteines).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sucre == null ? 0 : parseFloat(aliment.sucre).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sodi == null ? 0 : parseFloat(aliment.sodi).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.fibra == null ? 0 : parseFloat(aliment.fibra).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.calories == null ? 0 : parseFloat(aliment.calories).toFixed(2)}</p>
                                    </Col>
                                    <Col className="crosseliminar" onClick={() => this.esborraAliment("esmorzar " + aliment.aliment_id)}>
                                        <ImCross className="mida1 crosseliminar" />
                                    </Col>
                                </Row>
                        })
                    }
                </Container>

                <Container className="diari linies">
                    <Row className="gris">
                        <Col className="noOcultar noOcultarImp">
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].menjar2}</p>
                        </Col>
                        <Col>
                            <p>
                                <FaArrowCircleDown id="flextaabaix2" onClick={this.onClick2} />
                                <FaArrowCircleUp id="flextaadalt2" style={{ display: 'none' }} onClick={this.onClick2} />&nbsp;
                                <FaPlusCircle onClick={this.add2} id="afegir2" />
                                <FaMinusCircle onClick={this.add2} id="tancar2" style={{ display: 'none' }} />
                                <ImCross id='creu2' style={{ display: 'none' }} className="mida1 crosseliminar" />
                                <TiTick id="accept2" style={{ fontSize: 160, display: 'none' }} className="mida2 verdclar" />
                            </p>
                        </Col>
                    </Row>
                    <Row id="cercadorMostrar2" style={{ display: 'none' }} className="negre">
                        <Col>
                            <p style={{ display: 'none' }} className="afegint"></p>
                            <CercadorDiari placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments} descarrega={this.descarrega.bind(this)}></CercadorDiari>
                        </Col>
                        <Col>
                            <p style={{ display: 'none' }} className="afegint dreta" id="paragraf2">
                                {traduccions[sessionStorage.getItem("idioma_id")][0].quantitat} <input type="number" className="inputcurt" id="inputquantitat2"></input> g
                            </p>
                        </Col>
                    </Row>
                    <Row className="gris especial">
                        <Col xs={3}></Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="gris">
                        <Col xs={3}>
                            <p>Total</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.greixos).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.hidrats).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.proteines).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.sucre).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.sodi).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.fibra).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.dinar.calories).toFixed(2)}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    {
                        this.state.llista.map((aliment, clau) => {
                            if (aliment.menjar_del_dia == "dinar")
                                return <Row className="ocult2 fila gris" style={{ display: 'none' }}>
                                    <Col xs={3}>
                                        {sessionStorage.getItem("idioma_id") == "ca" && (
                                            <p>{aliment.detall_aliment.ca}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "es" && (
                                            <p>{aliment.detall_aliment.es}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "en" && (
                                            <p>{aliment.detall_aliment.en}<br></br>{aliment.quantitat} g</p>
                                        )}
                                    </Col>
                                    <Col>
                                        <p>{aliment.greixos == null ? 0 : parseFloat(aliment.greixos + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.hidrats == null ? 0 : parseFloat(aliment.hidrats + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.proteines == null ? 0 : parseFloat(aliment.proteines + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sucre == null ? 0 : parseFloat(aliment.sucre + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sodi == null ? 0 : parseFloat(aliment.sodi + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.fibra == null ? 0 : parseFloat(aliment.fibra + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.calories == null ? 0 : parseFloat(aliment.calories + 0).toFixed(2)}</p>
                                    </Col>
                                    <Col className="crosseliminar" onClick={() => this.esborraAliment("dinar " + aliment.aliment_id)}>
                                        <ImCross className="mida1 crosseliminar" />
                                    </Col>
                                </Row>
                        })
                    }
                </Container>

                <Container className="diari linies">
                    <Row className="gris">
                        <Col className="noOcultar noOcultarImp">
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].menjar3}</p>
                        </Col>
                        <Col>
                            <p>
                                <FaArrowCircleDown id="flextaabaix3" onClick={this.onClick3} />
                                <FaArrowCircleUp id="flextaadalt3" style={{ display: 'none' }} onClick={this.onClick3} />&nbsp;
                                <FaPlusCircle onClick={this.add3} id="afegir3" />
                                <FaMinusCircle onClick={this.add3} id="tancar3" style={{ display: 'none' }} />
                                <ImCross id='creu3' style={{ display: 'none' }} className="mida1 crosseliminar" />
                                <TiTick id="accept3" style={{ fontSize: 160, display: 'none' }} className="mida2 verdclar" />
                            </p>
                        </Col>
                    </Row>
                    <Row id="cercadorMostrar3" style={{ display: 'none' }} className="negre">
                        <Col>
                            <p style={{ display: 'none' }} className="afegint"></p>
                            <CercadorDiari placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments} descarrega={this.descarrega.bind(this)}></CercadorDiari>
                        </Col>
                        <Col>
                            <p style={{ display: 'none' }} className="afegint dreta" id="paragraf3">
                                {traduccions[sessionStorage.getItem("idioma_id")][0].quantitat} <input type="number" className="inputcurt" id="inputquantitat3"></input> g
                            </p>
                        </Col>
                    </Row>
                    <Row className="gris especial">
                        <Col xs={3}></Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="gris">
                        <Col xs={3}>
                            <p>Total</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.greixos).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.hidrats).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.proteines).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.sucre).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.sodi).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.fibra).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.berenar.calories).toFixed(2)}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    {
                        this.state.llista.map((aliment, clau) => {
                            if (aliment.menjar_del_dia == "berenar")
                                return <Row className="ocult3 fila gris" style={{ display: 'none' }}>
                                    <Col xs={3}>
                                        {sessionStorage.getItem("idioma_id") == "ca" && (
                                            <p>{aliment.detall_aliment.ca}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "es" && (
                                            <p>{aliment.detall_aliment.es}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "en" && (
                                            <p>{aliment.detall_aliment.en}<br></br>{aliment.quantitat} g</p>
                                        )}
                                    </Col>
                                    <Col>
                                        <p>{aliment.greixos == null ? 0 : parseFloat(aliment.greixos + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.hidrats == null ? 0 : parseFloat(aliment.hidrats + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.proteines == null ? 0 : parseFloat(aliment.proteines + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sucre == null ? 0 : parseFloat(aliment.sucre + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sodi == null ? 0 : parseFloat(aliment.sodi + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.fibra == null ? 0 : parseFloat(aliment.fibra + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.calories == null ? 0 : parseFloat(aliment.calories + 0).toFixed(2)}</p>
                                    </Col>
                                    <Col className="crosseliminar" onClick={() => this.esborraAliment("berenar " + aliment.aliment_id)}>
                                        <ImCross className="mida1 crosseliminar" />
                                    </Col>
                                </Row>
                        })
                    }
                </Container>

                <Container className="diari linies">
                    <Row className="gris">
                        <Col className="noOcultar noOcultarImp">
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].menjar4}</p>
                        </Col>
                        <Col>
                            <p>
                                <FaArrowCircleDown id="flextaabaix4" onClick={this.onClick4} />
                                <FaArrowCircleUp id="flextaadalt4" style={{ display: 'none' }} onClick={this.onClick4} />&nbsp;
                                <FaPlusCircle onClick={this.add4} id="afegir4" />
                                <FaMinusCircle onClick={this.add4} id="tancar4" style={{ display: 'none' }} />
                                <ImCross id='creu4' style={{ display: 'none' }} className="mida1 crosseliminar" />
                                <TiTick id="accept4" style={{ fontSize: 160, display: 'none' }} className="mida2 verdclar" />
                            </p>
                        </Col>
                    </Row>
                    <Row id="cercadorMostrar4" style={{ display: 'none' }} className="negre">
                        <Col>
                            <p style={{ display: 'none' }} className="afegint"></p>
                            <CercadorDiari placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments} descarrega={this.descarrega.bind(this)}></CercadorDiari>
                        </Col>
                        <Col>
                            <p style={{ display: 'none' }} className="afegint dreta" id="paragraf4">
                                {traduccions[sessionStorage.getItem("idioma_id")][0].quantitat} <input type="number" className="inputcurt" id="inputquantitat4"></input> g
                            </p>
                        </Col>
                    </Row>
                    <Row className="gris especial">
                        <Col xs={3}></Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</p>
                        </Col>
                        <Col>
                            <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="gris">
                        <Col xs={3}>
                            <p>Total</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.greixos).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.hidrats).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.proteines).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.sucre).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.sodi).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.fibra).toFixed(2)} g</p>
                        </Col>
                        <Col>
                            <p>{parseFloat(this.state.sopar.calories).toFixed(2)}</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    {
                        this.state.llista.map((aliment, clau) => {
                            if (aliment.menjar_del_dia == "sopar")
                                return <Row className="ocult4 fila gris" style={{ display: 'none' }}>
                                    <Col xs={3}>
                                        {sessionStorage.getItem("idioma_id") == "ca" && (
                                            <p>{aliment.detall_aliment.ca}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "es" && (
                                            <p>{aliment.detall_aliment.es}<br></br>{aliment.quantitat} g</p>
                                        )}
                                        {sessionStorage.getItem("idioma_id") == "en" && (
                                            <p>{aliment.detall_aliment.en}<br></br>{aliment.quantitat} g</p>
                                        )}
                                    </Col>
                                    <Col>
                                        <p>{aliment.greixos == null ? 0 : parseFloat(aliment.greixos + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.hidrats == null ? 0 : parseFloat(aliment.hidrats + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.proteines == null ? 0 : parseFloat(aliment.proteines + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sucre == null ? 0 : parseFloat(aliment.sucre + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.sodi == null ? 0 : parseFloat(aliment.sodi + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.fibra == null ? 0 : parseFloat(aliment.fibra + 0).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{aliment.calories == null ? 0 : parseFloat(aliment.calories + 0).toFixed(2)}</p>
                                    </Col>
                                    <Col className="crosseliminar" onClick={() => this.esborraAliment("sopar " + aliment.aliment_id)}>
                                        <ImCross className="mida1 crosseliminar" />
                                    </Col>
                                </Row>
                        })
                    }
                </Container>
                <Row>
                    <h1 className="titolGrafic">{traduccions[sessionStorage.getItem("idioma_id")][0].calroies10dies}</h1>
                    <Chart
                        series={[
                            {
                                data: this.state.caloriesGrafic
                            }
                        ]}
                        viewBox="0 0 300 150"
                        minY={0}
                    >
                        <Handlers
                            distance="x"
                            onMouseLeave={function noRefCheck() { }}
                            onMouseMove={function noRefCheck() { }}
                        >
                            <Layer
                                height="40%"
                                position="middle center"
                                width="80%"
                            >
                                <Ticks
                                    axis="y"
                                    lineLength="100%"
                                    lineVisible
                                    lineStyle={{
                                        stroke: 'lightgray'
                                    }}
                                    labelStyle={{
                                        dominantBaseline: 'middle',
                                        fill: 'lightgray',
                                        textAnchor: 'end',
                                        fontSize: 4,
                                    }}
                                    labelAttributes={{
                                        x: -5
                                    }}
                                />
                                <Ticks
                                    axis="x"
                                    labelAttributes={{
                                        y: '-16em'
                                    }}
                                    labelStyle={{
                                        dominantBaseline: 'text-after-edge',
                                        fill: '#fff',
                                        fontFamily: 'sans-serif',
                                        fontSize: 4,
                                        fontWeight: 'normal',
                                        textAnchor: 'middle'
                                    }}
                                    ticks={this.state.titolsGraficCalories}
                                />
                                <Ticks
                                    axis="x"
                                    labelAttributes={{
                                        y: '4em'
                                    }}
                                    labelStyle={{
                                        dominantBaseline: 'text-after-edge',
                                        fill: '#fff',
                                        fontFamily: 'sans-serif',
                                        fontSize: 3.5,
                                        fontWeight: 'normal',
                                        textAnchor: 'middle'
                                    }}
                                    ticks={this.state.datesGrafic}
                                />
                                <Bars groupPadding="1%" innerPadding="0.5%" />
                            </Layer>
                        </Handlers>
                    </Chart>
                </Row>
                <Row className='waves'>
                    <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                </Row>
                <FooterPage />
                <br></br><br></br><br></br>
            </div >
        );
    }
}