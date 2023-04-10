import { Component } from "react";
import { Col, Container, Form, NavDropdown, NavLink, Row, Table } from 'react-bootstrap';
import './Receptes.css';
import traduccions from '../traduccions.json';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleDown, FaArrowCircleUp, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import CercadorRecepta from "./CercadorRecepta";
import swal from 'sweetalert';
import notavailable from '../Detall_Aliment/notavailable.png';
import { CommentsDisabledRounded } from "@mui/icons-material";
import FooterPage from "../Footer/FooterPage";
import svg from '../../Imatges/wave.png';

export default class Receptes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            receptes: [],
            aliments: [],
            nom_recepta: '',
            descripciorecepta: '',
            foto_recepta: '',
            pujar: 'si',
        }
    }

    componentDidMount = () => {
        this.descarrega();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeFoto = (e) => {
        this.setState({ foto_recepta: e.target.value })
    }

    onChangeRadio = (e) => {
        if (e.target.value == "url") {
            document.getElementById("foto").style.display = "none";
            document.getElementById("mostrarfoto").style.display = "block";
            this.setState({ pujar: 'no' })
        } else {
            document.getElementById("foto").style.display = "block";
            document.getElementById("mostrarfoto").style.display = "none";
            this.setState({ pujar: 'si' })
        }
    }

    descarrega() {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/receptes/' + sessionStorage.getItem("id"), {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    receptes: respostajson
                });
                if (sessionStorage.getItem("alimentInserit") == "inserit") {
                    let mostrar = document.getElementsByClassName("ocult" + sessionStorage.getItem("numero"));
                    for (let valor of mostrar) {
                        console.log(valor);
                        valor.style.display = "flex";
                        document.getElementById("flextaabaix" + sessionStorage.getItem("numero")).style.display = "none";
                        document.getElementById("flextaadalt" + sessionStorage.getItem("numero")).style.display = "inline";
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    esborraAliment = (clau) => {
        let ingredient_id = clau.split(' ')[0];
        let recepta_id = clau.split(' ')[1];
        console.log('https://fct.dawidpelc.com/MDFitness/public/api/ingredient_recepta/' + ingredient_id + "/" + recepta_id)
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/ingredient_recepta/' + ingredient_id + "/" + recepta_id, {
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

    addFood = (id_recepta) => {
        sessionStorage.setItem("numero", id_recepta)
        let mostrar = document.getElementById("cercadorMostrar" + id_recepta);
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
            mostrar.style.display = "flex";
            mostrar.firstChild.lastChild.style.display = "block";
            mostrar.firstChild.firstChild.style.display = "none";
            mostrar.lastChild.firstChild.style.display = "none";
            document.getElementById("afegir" + id_recepta).style.display = "none";
            document.getElementById("mostrarmenys" + id_recepta).style.display = "inline";
        }
    }

    addExtra1 = (id_recepta) => {
        document.getElementById("afegir" + id_recepta).style.display = "inline";
        document.getElementById("mostrarmenys" + id_recepta).style.display = "none";
        let mostrar = document.getElementById("cercadorMostrar" + id_recepta);
        mostrar.style.display = "none";
    }

    mostrarLlistat = (recepta_id) => {
        let mostrar = document.getElementsByClassName("ocult" + recepta_id);
        let fletxa=document.getElementById("flextaabaix" + recepta_id);
        console.log(fletxa);
        for (let valor of mostrar) {
            if (valor.style.display == "none") {
                valor.style.display = "flex";
                document.getElementById("flextaabaix" + recepta_id).style.display = "none";
                document.getElementById("flextaadalt" + recepta_id).style.display = "inline";
            } else {
                valor.style.display = "none";
                document.getElementById("flextaabaix" + recepta_id).style.display = "inline";
                document.getElementById("flextaadalt" + recepta_id).style.display = "none";
            }
        }
    }

    mostrarformulari = () => {
        document.getElementById("primerapartatreceptes").style.display = "none";
        document.getElementById("formulario1").style.display = "block";
    }

    ocultarformulari = () => {
        document.getElementById("primerapartatreceptes").style.display = "flex";
        document.getElementById("formulario1").style.display = "none";
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.pujar)
        const formData = new FormData();
        formData.append('nom', this.state.nom_recepta);
        formData.append('descripcio', this.state.descripciorecepta);
        formData.append('usuari_id', sessionStorage.getItem("id"));
        if (this.state.pujar == "si") {
            formData.append('url_foto', document.getElementById("foto").files[0]);
        } else {
            formData.append('url_foto', this.state.url_foto);
        }
        formData.append('pujar', this.state.pujar);
        console.log(formData)

        var dades = new XMLHttpRequest();
        dades.onreadystatechange = function () {
            if (dades.readyState === 4) {
                console.log(dades.responseText)
                let myArray = JSON.parse(dades.responseText);
                console.log(myArray)
                if (myArray.status == "Creat") {
                    window.location.reload();
                } else {
                    alert("ERROR")
                }
            }
        }
        dades.open("POST", 'https://fct.dawidpelc.com/MDFitness/public/api/receptes', true);
        dades.send(formData);
    }

    eliminarrecepta = (recepta_id) => {
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].espera1m,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].estassegur2,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].nodenegar, traduccions[sessionStorage.getItem("idioma_id")][0].sieliminarreceta],
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch('https://fct.dawidpelc.com/MDFitness/public/api/receptes/' + recepta_id, {
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
            });
    }

    afegirDiari = (recepta_id) => {
        let menjar_del_dia = document.getElementById("inseriralDiariA" + recepta_id).value;
        let receptabona;
        for (let valor of this.state.receptes) {
            if (valor.id == recepta_id) {
                receptabona = valor;
            }
        }
        let contador = 0;
        let total = 0;
        for (let aliment of receptabona.llistat_aliments) {
            total++;
        }
        var today = new Date(),
            date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);



        for (let aliment of receptabona.llistat_aliments) {
            contador++;
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliment_diari', {
                method: 'POST',
                body: "aliment_id=" + aliment.aliment_id + "&diari_id=" + sessionStorage.getItem("id") +
                    "&menjar_del_dia=" + menjar_del_dia + "&data_diari=" + date
                    + "&quantitat=" + aliment.quantitat,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    if (respostajson.status == "Creat") {
                        if (contador == total) {
                            swal({
                                title: traduccions[sessionStorage.getItem("idioma_id")][0].recetagefida1 + receptabona.nom + traduccions[sessionStorage.getItem("idioma_id")][0].recetagefida2,
                                text: traduccions[sessionStorage.getItem("idioma_id")][0].qaatda,
                                icon: "success",
                                buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].notnow, traduccions[sessionStorage.getItem("idioma_id")][0].ytkmh],
                                dangerMode: false,
                            })
                                .then((diari) => {
                                    if (diari) {
                                        window.location.assign("/diari");
                                    }
                                });
                        }
                    } else {
                        swal(traduccions[sessionStorage.getItem("idioma_id")][0].nspaea, traduccions[sessionStorage.getItem("idioma_id")][0].npadaamm, "error");
                    }
                })
                .catch(function (error) {
                    swal(traduccions[sessionStorage.getItem("idioma_id")][0].nspaea, traduccions[sessionStorage.getItem("idioma_id")][0].npadaamm, "error");
                })
        }
    }

    render() {
        return (
            <div className="generaldiari generalrecepta">
                <br></br><br></br><br></br>
                <Container>
                    <Row id="primerapartatreceptes">
                        <Col>
                            <h1 className="sintop">{traduccions[sessionStorage.getItem("idioma_id")][0].receptes}</h1>
                        </Col>
                        <Col>
                            <h1 className="sintop" onClick={this.mostrarformulari}>{traduccions[sessionStorage.getItem("idioma_id")][0].crearnovarecepta}</h1>
                        </Col>
                    </Row>
                </Container>
                <Container className="diari linies" xs={4} id="formulario1" style={{ display: 'none' }}>
                    <Row className="gris">
                        <form onSubmit={this.onSubmit} className="formafegirrecepta">
                            <h1 className="sintop">{traduccions[sessionStorage.getItem("idioma_id")][0].crearnovarecepta}</h1>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].nomrecepta}</label>
                                        <input type="text" className="form-control" name="nom_recepta" onChange={this.onChange} value={this.state.nom_llinatges} />
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].descripciorecepta}</label>
                                        <textarea type="text" className="form-control" name="descripciorecepta" onChange={this.onChange} value={this.state.nom_llinatges} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group lletradiferent">
                                        <label className="tmb">{traduccions[sessionStorage.getItem("idioma_id")][0].imatgerepresentativarecepta}</label>
                                        <p className="sensePadding parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].url} <input type="radio" value="url" name="tipus" onChange={this.onChangeRadio} /></p>
                                        <p className="sensePadding parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].subir} <input type="radio" value="pujar" name="tipus" onChange={this.onChangeRadio} /></p>
                                        <input type="text" className="form-control" name="url_foto" onChange={this.onChange} value={this.state.nom_llinatges} id="mostrarfoto" style={{ display: 'none' }} />
                                        <input type="file" id="foto" name="url_foto" onChange={this.onChangeFoto}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row botons">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value={traduccions[sessionStorage.getItem("idioma_id")][0].confnuerec} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="button" onClick={this.ocultarformulari} className="btn btn-danger" value={traduccions[sessionStorage.getItem("idioma_id")][0].cancelar} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Row>
                </Container>
                {
                    this.state.receptes.map((valor, clau) => {
                        return <Container className="diari linies">
                            <Row className="gris tal">
                                <Col xs={5}>
                                    {valor.foto_recepta == null && <img className="imgrecepta senseborderecepta" src={notavailable}></img>}
                                    {valor.foto_recepta != null && <img className='imgrecepta' src={valor.foto_recepta}></img>}
                                    <div>
                                        <p className="text-align-left afegiraliment" id={"principalmostraraliment" + valor.id}>
                                            <FaPlusCircle onClick={() => { this.addFood(valor.id) }} id={"afegir" + valor.id} />
                                            <FaMinusCircle onClick={() => { this.addExtra1(valor.id) }} id={"mostrarmenys" + valor.id} style={{ display: 'none' }} />
                                            &nbsp;
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].afegiraliment}
                                        </p>
                                        <p id={"confirmaciofinal" + valor.id} style={{ display: 'none' }} className="width100">
                                            <input type="submit" className="btn btn-primary" value={traduccions[sessionStorage.getItem("idioma_id")][0].afegiraliment} id={"aaa" + valor.id} />
                                            <input type="button" className="btn btn-danger" value={traduccions[sessionStorage.getItem("idioma_id")][0].cancelar} id={"bbb" + valor.id} />
                                        </p>
                                    </div>
                                </Col>
                                <Col className="noOcultar noOcultarImp" xs={7}>
                                    <p className="text-align-left capital">{valor.nom}</p>
                                    <p className="text-align-left descripciorecepta">{valor.descripcio}</p>
                                    <input type="button" onClick={() => { this.eliminarrecepta(valor.id) }} className="btn btn-danger nou" value={traduccions[sessionStorage.getItem("idioma_id")][0].eliminarrecepta} />
                                    <Form.Select aria-label="Default select example" onChange={() => this.afegirDiari(valor.id)} id={"inseriralDiariA" + valor.id} className="nou2 inseriralDiariA">
                                        <option hidden>{traduccions[sessionStorage.getItem("idioma_id")][0].afegiradiari}</option>
                                        <option value="esmorzar">{traduccions[sessionStorage.getItem("idioma_id")][0].menjar1}</option>
                                        <option value="dinar">{traduccions[sessionStorage.getItem("idioma_id")][0].menjar2}</option>
                                        <option value="berenar">{traduccions[sessionStorage.getItem("idioma_id")][0].menjar3}</option>
                                        <option value="sopar">{traduccions[sessionStorage.getItem("idioma_id")][0].menjar4}</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row id={"cercadorMostrar" + valor.id} style={{ display: 'none' }} className="negre">
                                <Col>
                                    <p style={{ display: 'none' }} className="afegint"></p>
                                    <CercadorRecepta placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].cua} dades={this.state.aliments} descarrega={this.descarrega.bind(this)}></CercadorRecepta>
                                </Col>
                                <Col>
                                    <p style={{ display: 'none' }} className="afegint dreta" id="paragraf1">
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].quantitat} <input type="number" className="inputcurt" id={"inputquantitat" + valor.id}></input> g
                                    </p>
                                </Col>
                            </Row>
                            {valor.detalls_recepta != null && (
                                <Row className="gris">
                                    <Col xs={3}></Col>
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
                                        <p>{traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                                    </Col>
                                    <Col className="colblanc">
                                        <FaArrowCircleDown id={"flextaabaix" + valor.id} onClick={() => { this.mostrarLlistat(valor.id) }} />
                                        <FaArrowCircleUp id={"flextaadalt" + valor.id} style={{ display: 'none' }} onClick={() => { this.mostrarLlistat(valor.id) }} />
                                    </Col>
                                </Row>
                            )}
                            {valor.detalls_recepta == null && (
                                <Row className="gris">
                                    <Col>
                                        <p>{traduccions[sessionStorage.getItem("idioma_id")][0].receptavacia}</p>
                                    </Col>
                                </Row>
                            )}
                            {valor.detalls_recepta != null && (
                                <Row className="gris">
                                    <Col xs={3}>
                                        <p>Total</p>
                                    </Col>
                                    <Col xs={3}>
                                    </Col>
                                    <Col>
                                        <p>{parseFloat(valor.detalls_recepta.greixos).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{parseFloat(valor.detalls_recepta.hidrats).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{parseFloat(valor.detalls_recepta.proteines).toFixed(2)} g</p>
                                    </Col>
                                    <Col>
                                        <p>{parseFloat(valor.detalls_recepta.calories).toFixed(2)}</p>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            )}
                            {
                                valor.llistat_aliments.map((aliment, clau) => {
                                    if (valor.detalls_recepta != null) {
                                        return <Row className={"ocult" + valor.id + " fila gris"} style={{ display: 'none' }}>
                                            <Col xs={3} className="text-align-center">
                                                <img className="aliment_recepta" src={aliment.detall_aliment.url_foto} onClick={() => { window.location.assign('detall_aliment/' + aliment.aliment_id) }}>
                                                </img>
                                            </Col>
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
                                                <p>{parseFloat(aliment.greixos).toFixed(2)} g</p>
                                            </Col>
                                            <Col>
                                                <p>{parseFloat(aliment.hidrats).toFixed(2)} g</p>
                                            </Col>
                                            <Col>
                                                <p>{parseFloat(aliment.proteines).toFixed(2)} g</p>
                                            </Col>
                                            <Col>
                                                <p>{parseFloat(aliment.calories).toFixed(2)}</p>
                                            </Col>
                                            <Col className="crosseliminar" onClick={() => this.esborraAliment(aliment.aliment_id + " " + aliment.recepta_id)}>
                                                <ImCross className="mida1" />
                                            </Col>
                                        </Row>
                                    }
                                })
                            }
                        </Container>
                    })
                }
                <Row className='waves'>
                    <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                </Row>
                <FooterPage />
                <br></br><br></br><br></br>
            </div >
        );
    }
}