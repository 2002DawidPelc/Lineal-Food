import { Component } from "react";
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import './Detall_Aliment.css';
import traduccions from '../traduccions.json';
import NutriScoreA from './NutriScoreA.png';
import NutriScoreB from './NutriScoreB.png';
import NutriScoreC from './NutriScoreC.png';
import NutriScoreD from './NutriScoreD.png';
import NutriScoreE from './NutriScoreE.png';
import Corazon from '../../Imatges/Icones/corazon.png';
import CorazonRojo from '../../Imatges/Icones/corazon_vermell.png';
import GuardarBuid from '../../Imatges/Icones/guardarB.png';
import NutriScoreU from './NutriScoreU.svg';
import notavailable from './notavailable.png';
import swal from 'sweetalert';

export default class Detall_Aliment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nom: '',
            calories100: '',
            proteines100: '',
            hidrats100: '',
            greixos100: '',
            sodi100: '',
            sucre100: '',
            fibra100: '',
            url_foto: '',
            tipus_id: '',
            gramsPorcio: '',
            quantitat: '100',
            totalGrams: '100',
            tipus: '',
            logo_marca: '',
            nutriScore: '',
            contribuidor: '',
            favorit: 'no'
        }
    }

    componentDidMount() {
        this.descarrega(this.props.id);
        this.setState({ id: this.props.id });
    }

    descarrega(id) {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/' + id, {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    calories100: respostajson.calories100,
                    proteines100: respostajson.proteines100,
                    hidrats100: respostajson.hidrats100,
                    greixos100: respostajson.greixos100,
                    sodi100: respostajson.sodi100,
                    sucre100: respostajson.sucre100,
                    fibra100: respostajson.fibra100,
                    url_foto: respostajson.url_foto,
                    tipus_id: respostajson.tipus_id,
                    gramsPorcio: respostajson.gramsPorcio,
                    logo_marca: respostajson.marca_restaurant.logo,
                    nutriScore: respostajson.nutriScore,
                    contribuidor: respostajson.contribuidor
                });

                if (sessionStorage.getItem("idioma_id") == "es") {
                    this.setState({ nom: respostajson.es });
                }
                if (sessionStorage.getItem("idioma_id") == "ca") {
                    this.setState({ nom: respostajson.ca });
                }
                if (sessionStorage.getItem("idioma_id") == "en") {
                    this.setState({ nom: respostajson.en });
                }

                if (respostajson.url_foto == null) {
                    this.setState({ url_foto: "http://www.dawidpelc.com/fct/MDFitness/public/imatges/aliments/aliment_22.jpg" })
                }

                if (this.state.tipus_id != 8) {
                    this.setState({ tipus: 'grams' })
                }
                if (this.state.tipus_id == 8 || (this.state.gramsPorcio != 0 && this.state.gramsPorcio != null)) {
                    document.getElementById("fotoAliment").classList.add("restaurant");
                    this.setState({ tipus: 'porcio' })
                    this.setState({ quantitat: 1 })
                    this.setState({ totalGrams: this.state.gramsPorcio * 1 })
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        if (sessionStorage.getItem("token") != null) {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/preferitsUsuari/' + sessionStorage.getItem("id"), {
                method: 'GET',
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    respostajson.map((valor, clau) => {
                        if (valor.detall_aliment.id == this.state.id) {
                            this.setState({ favorit: 'si' })
                        }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    onchangeQuantitat = (e) => {
        this.setState({ quantitat: e.target.value })
        this.setState({ totalGrams: e.target.value })
        if (this.state.tipus == "porcio") {
            this.setState({ totalGrams: (e.target.value * this.state.gramsPorcio) })
        }
    }

    onchangeTipusQuantitat = (e) => {
        if (e.target.value == "porcio") {
            this.setState({ totalGrams: (this.state.gramsPorcio * this.state.quantitat) })
            this.setState({ tipus: 'porcio' })
        } else {
            this.setState({ totalGrams: (this.state.quantitat) })
            this.setState({ tipus: 'grams' })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addFav = () => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/preferits', {
            method: 'POST',
            body: "usuari_id=" + sessionStorage.getItem("id") + "&aliment_id=" + this.state.id,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                swal(traduccions[sessionStorage.getItem("idioma_id")][0].sehaafegit + " " + this.state.nom + " " + traduccions[sessionStorage.getItem("idioma_id")][0].aetaf, 
                traduccions[sessionStorage.getItem("idioma_id")][0].uuuaaa, "success")
                        .then(() => {
                            window.location.reload();
                        });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    removeFav = () => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/preferits/' + sessionStorage.getItem("id") + '/' + this.state.id, {
            method: 'DELETE',
        })
            .then(resposta => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    alertSwal = () => {
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].enis,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].volsinises,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].notnow, traduccions[sessionStorage.getItem("idioma_id")][0].ytkmh],
            dangerMode: false,
        })
            .then((login) => {
                if (login) {
                    window.location.assign("/login");
                }
            });
    }

    render() {
        console.log(this.state)
        return <div className="divAliments">
            <Container className="containerTitol">
                <Row className="textCentre colTitol">
                    <Col>
                        <h1 className="sintop">{this.state.nom}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered className="taulaCalories">
                            <tbody>
                                <tr>
                                    <td>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].calories}<br></br>
                                        {(this.state.calories100 * this.state.totalGrams / 100).toFixed(2)}</td>
                                    <td className="gris">{traduccions[sessionStorage.getItem("idioma_id")][0].greixos}
                                        <br></br>{(this.state.greixos100 * this.state.totalGrams / 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="gris">{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}<br></br>
                                        {(this.state.hidrats100 * this.state.totalGrams / 100).toFixed(2)}</td>
                                    <td>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}
                                        <br></br>{(this.state.proteines100 * this.state.totalGrams / 100).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} style={{ textAlign: 'center' }} className="containerFoto">
                        <img id="fotoAliment" className="imgDetallAliment" src={this.state.url_foto}></img>
                    </Col>
                    <Col xs={12} md={6} className="textEsquerra containerTaula">
                        <div id="quantitat">
                            <h3>{traduccions[sessionStorage.getItem("idioma_id")][0].inp} <br className="ocult"></br>
                                <input className={"infonutri"} type="number" value={this.state.quantitat} onChange={this.onchangeQuantitat} />
                                <Form.Select aria-label="Default select example" onChange={this.onchangeTipusQuantitat} value={this.state.tipus} className="porcions">
                                    <option value={"grams"}>{traduccions[sessionStorage.getItem("idioma_id")][0].grams}</option>
                                    {(this.state.tipus_id == 8 || (this.state.gramsPorcio != 0 && this.state.gramsPorcio != null)) && (
                                        <option value={"porcio"}>
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].porcio} ({this.state.gramsPorcio} {traduccions[sessionStorage.getItem("idioma_id")][0].grams})
                                        </option>
                                    )}
                                </Form.Select>
                            </h3>
                        </div>
                        <hr className="hrnegre"></hr>
                        <table>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].energia}</td>
                                <td className="numero">{(this.state.calories100 * this.state.totalGrams / 100).toFixed(2)} kcal</td>
                            </tr>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].gt}</td>
                                <td className="numero">{(this.state.greixos100 * this.state.totalGrams / 100).toFixed(2)} g</td>
                            </tr>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].hdc}<br></br>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].dqs}</td>
                                <td className="numero">{(this.state.hidrats100 * this.state.totalGrams / 100).toFixed(2)} g<br></br>
                                    {(this.state.sucre100 * this.state.totalGrams / 100).toFixed(2)} g</td>
                            </tr>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].fibra}</td>
                                <td className="numero">{(this.state.fibra100 * this.state.totalGrams / 100).toFixed(2)} g</td>
                            </tr>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</td>
                                <td className="numero">{(this.state.proteines100 * this.state.totalGrams / 100).toFixed(2)} g</td>
                            </tr>
                            <tr>
                                <td className="text">{traduccions[sessionStorage.getItem("idioma_id")][0].sodi}</td>
                                <td className="numero">{(this.state.sodi100 * this.state.totalGrams / 100).toFixed(2)} g</td>
                            </tr>
                        </table>
                    </Col>
                </Row>
                <Row>
                    <Col className="allargar">
                        <h1 className="centrat sintop negre">{traduccions[sessionStorage.getItem("idioma_id")][0].marcaaliment}</h1>
                        <div className="abaix">
                            {this.state.logo_marca == null && <img className="logo" src={notavailable}></img>}
                            <img className="logo" src={this.state.logo_marca}></img>
                        </div>
                    </Col>
                    <Col className="allargar">
                        <h1 className="centrat sintop negre">NutriScore</h1>
                        <div className="abaix">
                            {this.state.nutriScore == "a" && <img className="nutriScore" src={NutriScoreA}></img>}
                            {this.state.nutriScore == "b" && <img className="nutriScore" src={NutriScoreB}></img>}
                            {this.state.nutriScore == "c" && <img className="nutriScore" src={NutriScoreC}></img>}
                            {this.state.nutriScore == "d" && <img className="nutriScore" src={NutriScoreD}></img>}
                            {this.state.nutriScore == "e" && <img className="nutriScore" src={NutriScoreE}></img>}
                            {(this.state.nutriScore == null || this.state.nutriScore == "n") && <img className="nutriScore" src={NutriScoreU}></img>}
                        </div>
                    </Col>
                    <Col className="allargar encoger">
                        <div>
                            <h1 className="centrat sintop negre">{traduccions[sessionStorage.getItem("idioma_id")][0].favs}</h1>
                        </div>
                        <div className="abaix">
                            {this.state.favorit == 'si' && (
                                <img className='iconaFav' src={CorazonRojo} title={traduccions[sessionStorage.getItem("idioma_id")][0].edf}
                                    onMouseOver={e => (e.currentTarget.src = require("../../Imatges/Icones/corazon.png"))}
                                    onMouseLeave={e => (e.currentTarget.src = require("../../Imatges/Icones/corazon_vermell.png"))}
                                    onClick={() => {
                                        if (sessionStorage.getItem("token") != null) {
                                            this.removeFav();
                                        } else {
                                            this.alertSwal();
                                        }
                                    }}></img>
                            )}
                            {this.state.favorit == 'no' && (
                                <img className='iconaFav' src={Corazon} title={traduccions[sessionStorage.getItem("idioma_id")][0].aaf}
                                    onMouseOver={e => (e.currentTarget.src = require("../../Imatges/Icones/corazon_vermell.png"))}
                                    onMouseLeave={e => (e.currentTarget.src = require("../../Imatges/Icones/corazon.png"))}
                                    onClick={() => {
                                        console.log(sessionStorage.getItem("token"))
                                        if (sessionStorage.getItem("token") != null) {
                                            this.addFav();
                                        } else {
                                            this.alertSwal();
                                        }
                                    }}></img>
                            )}
                        </div>
                    </Col>
                    <Col className="allargar encoger">
                        <div>
                            <h1 className="centrat sintop negre">{traduccions[sessionStorage.getItem("idioma_id")][0].save}</h1>
                        </div>
                        <div className="abaix">
                            {sessionStorage.getItem("token") != null && (
                                <img className='iconaGuardar' src={GuardarBuid}
                                    onMouseOver={e => (e.currentTarget.src = require("../../Imatges/Icones/guardar.png"))}
                                    onMouseLeave={e => (e.currentTarget.src = require("../../Imatges/Icones/guardarB.png"))}
                                    onClick={() => window.location.assign("/diari")}>
                                </img>
                            )}
                            {sessionStorage.getItem("token") == null && (
                                <img className='iconaGuardar' src={GuardarBuid}
                                    onMouseOver={e => (e.currentTarget.src = require("../../Imatges/Icones/guardar.png"))}
                                    onMouseLeave={e => (e.currentTarget.src = require("../../Imatges/Icones/guardarB.png"))}
                                    onClick={this.alertSwal}>
                                </img>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {(this.state.contribuidor != null && this.state.contribuidor != "") &&
                            <h1 className="contribuidor">{traduccions[sessionStorage.getItem("idioma_id")][0].inseritper} {this.state.contribuidor}</h1>
                        }
                        {(this.state.contribuidor == null || this.state.contribuidor == "") &&
                            <h1 className="contribuidor">{traduccions[sessionStorage.getItem("idioma_id")][0].sensecontribuidor}</h1>
                        }
                    </Col>
                </Row>
            </Container >
        </div >
    }
}