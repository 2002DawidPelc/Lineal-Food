import { Component } from "react";
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import './Perfil.css';
import traduccions from '../traduccions.json';
import Select from "./Select";
import swal from 'sweetalert';
import svg from '../../Imatges/wave.png';
import FooterPage from "../Footer/FooterPage";

export default class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nom_llinatges: '',
            dni: '',
            telefon: '',
            adreca: '',
            email: '',
            adreca: '',
            idioma_fav: '',
            activitat_fisica: '',
            objectiu: '',
            objectiu_establert: '',
            sexe: '',
            altura: '',
            peso: '',
            edad: '',
            aconsumir: ''
        }
    }

    componentDidMount = () => {
        this.descarrega();
    }

    componentDidUpdate = () => {
        sessionStorage.setItem("aconsumir", this.state.aconsumir)
    }

    descarrega() {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/usuaris/' + sessionStorage.getItem("id"), {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                console.log(respostajson)
                this.setState({
                    id: respostajson.id,
                    nom_llinatges: respostajson.nom_llinatges,
                    dni: respostajson.dni,
                    telefon: respostajson.telefon,
                    adreca: respostajson.adreca,
                    email: respostajson.email,
                    adreca: respostajson.adreca,
                    idioma_fav: respostajson.idioma_fav,
                    activitat_fisica: respostajson.activitat_fisica_id,
                    objectiu: respostajson.objectiu_id,
                    objectiu_establert: respostajson.objectiu_establert,
                    sexe: respostajson.sexe,
                    altura: respostajson.altura,
                    peso: respostajson.peso,
                    edad: respostajson.edad

                });

                if (this.state.objectiu_establert == "si") {
                    document.getElementById("flexSwitchCheckChecked").checked = true;
                    this.onChangeDieta();
                } else {
                    this.onChangeDieta();
                }

                this.onchangeAconsumir();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeIdioma = (event) => {
        sessionStorage.setItem("idioma_id", event.target.value);
        if (sessionStorage.getItem("token") != null) {
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/usuaris/' + sessionStorage.getItem("id"), {
                method: 'PUT',
                body: "idioma_fav=" + sessionStorage.getItem("idioma_id"),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            window.location.reload();
        }
    }

    onChangeDieta = () => {
        this.setState({ sexe: "home" })
        let mostrar = document.getElementsByClassName("mostrarDades");
        if (document.getElementById("flexSwitchCheckChecked").checked) {
            for (let valor of mostrar) {
                valor.style.display = 'flex';
            }
            this.setState({ objectiu_establert: "si" });
        } else {
            for (let valor of mostrar) {
                valor.style.display = 'none';
            }
            this.setState({ objectiu_establert: "no" });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.onchangeAconsumir();
        });
    }

    onChangeActivitatFisica = (v) => {
        this.setState({ activitat_fisica: v }, () => {
            this.onchangeAconsumir();
        });
    }

    onChangeObjectiu = (v) => {
        this.setState({ objectiu: v }, () => {
            this.onchangeAconsumir();
        });
    }

    onChangeSexe = (v) => {
        this.setState({ sexe: v.target.value }, () => {
            this.onchangeAconsumir();
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.modificar();
    }

    onchangeAconsumir = () => {
        let bmr;
        if (this.state.activitat_fisica == 1) bmr = 1.2;
        if (this.state.activitat_fisica == 2) bmr = 1.375;
        if (this.state.activitat_fisica == 3) bmr = 1.550;
        if (this.state.activitat_fisica == 4) bmr = 1.725;
        if (this.state.activitat_fisica == 5) bmr = 1.9;

        let provisional;
        if (this.state.sexe == "home") {
            provisional = ((10 * this.state.peso) + (6.25 * this.state.altura) - (5 * this.state.edad) + 5) * bmr;
            if (this.state.objectiu == 1) provisional = provisional - 500;
            if (this.state.objectiu == 2) provisional = provisional - 250;
            if (this.state.objectiu == 4) provisional = provisional + 250;
            if (this.state.objectiu == 5) provisional = provisional + 500;
        }
        if (this.state.sexe == "dona") {
            provisional = ((10 * this.state.peso) + (6.25 * this.state.altura) - (5 * this.state.edad) - 161) * bmr;
            if (this.state.objectiu == 1) provisional = provisional - 500;
            if (this.state.objectiu == 2) provisional = provisional - 250;
            if (this.state.objectiu == 4) provisional = provisional + 250;
            if (this.state.objectiu == 5) provisional = provisional + 500;
        }

        this.setState({ aconsumir: provisional })

    }

    modificar = () => {
        sessionStorage.setItem("objectiu_establert", this.state.objectiu_establert)
        let adicional = "";
        if (this.state.objectiu_establert == "si") {
            adicional = "&sexe=" + this.state.sexe + "&altura="
                + this.state.altura + "&peso=" + this.state.peso + "&edad=" + this.state.edad + "&aconsumir=" + this.state.aconsumir;
            if (this.state.altura == null || this.state.altura === "") {
                alert(traduccions[sessionStorage.getItem("idioma_id")][0].nullaltura);
                return null;
            }
            if (this.state.peso == null || this.state.altura === "") {
                alert(traduccions[sessionStorage.getItem("idioma_id")][0].nullpes);
                return null;
            }
            if (this.state.edad == null || this.state.edad === "") {
                alert(traduccions[sessionStorage.getItem("idioma_id")][0].nulledat);
                return null;
            }
            if (this.state.sexe == null || this.state.sexe === "") {
                alert(traduccions[sessionStorage.getItem("idioma_id")][0].nullsexe);
                return null;
            }
        }
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/usuaris/' + this.state.id, {
            method: 'PUT',
            body: "nom_llinatges=" + this.state.nom_llinatges + "&dni=" + this.state.dni + "&adreca=" + this.state.adreca
                + "&idioma_fav=" + this.state.idioma_fav + "&activitat_fisica_id=" + this.state.activitat_fisica + "&telefon=" + this.state.telefon
                + "&objectiu_id=" + this.state.objectiu + "&email=" + this.state.email + "&objectiu_establert=" + this.state.objectiu_establert
                + adicional,

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                if (respostajson.status == "Modificar") {
                    swal(traduccions[sessionStorage.getItem("idioma_id")][0].canvisguardats, traduccions[sessionStorage.getItem("idioma_id")][0].etpshm, "success");
                } else {
                    swal(traduccions[sessionStorage.getItem("idioma_id")][0].hapassaterror, traduccions[sessionStorage.getItem("idioma_id")][0].revise, "success");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="extraPerfil">
                <div className="general generalPerfil">
                    <Container className="contenidor">
                        <form onSubmit={this.onSubmit} className='formperfil'>
                            <h1 className="sintop">{traduccions[sessionStorage.getItem("idioma_id")][0].dadespersonals}</h1>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].nl}</label>
                                        <input type="text" className="form-control" name="nom_llinatges" onChange={this.onChange} value={this.state.nom_llinatges} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].ce}</label>
                                        <input type="text" className="form-control" name="email" onChange={this.onChange} value={this.state.email} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].dni}</label>
                                        <input type="text" className="form-control" name="dni" onChange={this.onChange} value={this.state.dni} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].telefon}</label>
                                        <input type="text" className="form-control" name="telefon" onChange={this.onChange} value={this.state.telefon} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].dcpp}</label>
                                        <input type="text" className="form-control" name="adreca" onChange={this.onChange} value={this.state.adreca} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].idiomafav}</label>
                                        <select className="form-control senseborde" onChange={this.onChangeIdioma} value={sessionStorage.getItem("idioma_id")}>
                                            <option value="es">Español</option>
                                            <option value="ca">Català</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="form-switch">
                                        <label for="flexSwitchCheckChecked">{traduccions[sessionStorage.getItem("idioma_id")][0].df}</label>
                                        <label className="switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={this.onChangeDieta}></input>
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mostrarDades">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].nivellactivitat}</label>
                                        <Select canviar={this.onChangeActivitatFisica} valorinicial={this.state.activitat_fisica}
                                            url="https://fct.dawidpelc.com/MDFitness/public/api/activitat_fisica"
                                            clau="id" display={sessionStorage.getItem("idioma_id")} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mostrarDades">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].objectiu}</label>
                                        <Select canviar={this.onChangeObjectiu} valorinicial={this.state.objectiu}
                                            url="https://fct.dawidpelc.com/MDFitness/public/api/objectiu"
                                            clau="id" display={sessionStorage.getItem("idioma_id")} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mostrarDades">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].altura}</label>
                                        <input type="number" className="form-control" name="altura" onChange={this.onChange} value={this.state.altura} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].peso}</label>
                                        <input type="number" className="form-control" name="peso" onChange={this.onChange} value={this.state.peso} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].edad}</label>
                                        <input type="number" className="form-control" name="edad" onChange={this.onChange} value={this.state.edad} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].sexo}</label>
                                        <select className="form-control senseborde" onChange={this.onChangeSexe} value={this.state.sexe}>
                                            <option value="home">{traduccions[sessionStorage.getItem("idioma_id")][0].home}</option>
                                            <option value="dona">{traduccions[sessionStorage.getItem("idioma_id")][0].dona}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mostrarDades">
                                {(this.state.altura != null && this.state.altura != "") && (this.state.peso != null && this.state.peso != "")
                                    && (this.state.edad != null && this.state.edad != "") && (this.state.sexe != null && this.state.sexe != "") && (
                                        <p className="pperfilmargin">{traduccions[sessionStorage.getItem("idioma_id")][0].finalcalories} {(this.state.aconsumir * 1).toFixed(0)} {" "}
                                            {(traduccions[sessionStorage.getItem("idioma_id")][0].calories).toLowerCase()}</p>
                                    )}
                                {((this.state.altura == null || this.state.altura == "") || (this.state.peso == null || this.state.peso == "")
                                    || (this.state.edad == null || this.state.edad == "") || (this.state.sexe == null || this.state.sexe == "")) && (
                                        <p className="pperfilmargin">{traduccions[sessionStorage.getItem("idioma_id")][0].faltendades}</p>
                                    )}
                            </div>
                            <div className="row botons">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value={traduccions[sessionStorage.getItem("idioma_id")][0].desar} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="button" className="btn btn-danger" value={traduccions[sessionStorage.getItem("idioma_id")][0].cancelar} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
                <div className="extraPerfil2">
                    <Row className='waves'>
                        <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                    </Row>
                    <FooterPage />
                </div>
            </div >
        );
    }
}