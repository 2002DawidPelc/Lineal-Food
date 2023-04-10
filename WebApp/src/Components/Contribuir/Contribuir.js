import { Component } from "react";
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import './Contribuir.css';
import traduccions from '../traduccions.json';
import Select from "./Select.js";
import SelectRestaurant from "./SelectRestaurant.js";
import svg from '../../Imatges/wave.png';
import FooterPage from "../Footer/FooterPage";
import swal from 'sweetalert';

export default class Contribuir extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calories100: '',
            proteines100: '',
            hidrats100: '',
            greixos100: '',
            sodi100: '',
            sucre100: '',
            fibra100: '',
            url_foto: '',
            tipus_id: 9,
            gramsPorcio: '',
            nutriScore: 'n',
            ca: '',
            es: '',
            en: '',
            id_marca_restaurant: 6,
            pujar: 'si',
            contribuidor: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeRadio = (e) => {
        if (e.target.value == "url") {
            document.getElementById("foto").style.display = "none";
            document.getElementById("mostrar1").style.display = "block";
            this.setState({ pujar: 'no' })
        } else {
            document.getElementById("foto").style.display = "block";
            document.getElementById("mostrar1").style.display = "none";
            this.setState({ pujar: 'si' })
        }
    }

    onChangeNutriScore = (e) => {
        this.setState({ nutriScore: e.target.value })
    }

    onChangeMarcaRestaurant = (v) => {
        this.setState({ id_marca_restaurant: v })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.modificar();
    }

    onChangeTipusAliment = (v) => {
        this.setState({ tipus_id: v })
    }

    onChangeFoto = (e) => {
        this.setState({ url_foto: e.target.value })
    }

    modificar = () => {
        console.log(this.state)
        const formData = new FormData();
        formData.append('calories100', this.state.calories100);
        formData.append('proteines100', this.state.proteines100);
        formData.append('greixos100', this.state.greixos100);
        formData.append('hidrats100', this.state.hidrats100);
        formData.append('sucre100', this.state.sucre100);
        formData.append('sodi100', this.state.sodi100);
        formData.append('fibra100', this.state.fibra100);
        formData.append('contribuidor', this.state.contribuidor);
        formData.append('id_marca_restaurant', this.state.id_marca_restaurant);
        if (this.state.pujar == "si") {
            formData.append('url_foto', document.getElementById("foto").files[0]);
        } else {
            formData.append('url_foto', this.state.url_foto);
        }

        formData.append('gramsPorcio', this.state.gramsPorcio);
        formData.append('nutriScore', this.state.nutriScore);
        formData.append('tipus_id', this.state.tipus_id);
        formData.append('es', this.state.es);
        formData.append('en', this.state.en);
        formData.append('ca', this.state.ca);
        formData.append('pujar', this.state.pujar);

        var dades = new XMLHttpRequest();
        dades.onreadystatechange = function () {
            if (dades.readyState === 4) {
                console.log(dades.responseText)
                let myArray = JSON.parse(dades.responseText);
                console.log(myArray)
                if (myArray.status == "Creat") {
                    window.location.assign("/creat");
                } else {
                    swal({
                        title: traduccions[sessionStorage.getItem("idioma_id")][0].hhueiea,
                        text: traduccions[sessionStorage.getItem("idioma_id")][0].varlcdf,
                        icon: "error",
                        buttons: {
                            confirm: { text: traduccions[sessionStorage.getItem("idioma_id")][0].tornaraintentar, className: 'swal-boto-blau' },
                        },
                    })
                }
            }
        }
        dades.open("POST", 'https://fct.dawidpelc.com/MDFitness/public/api/aliments', true);
        dades.send(formData);
    }

    render() {
        return (
            <div className="ojo">
                <div className="general generalContribuir">
                    <Container className="contenidor solicitud">
                        <form onSubmit={this.onSubmit} className='formaliment'>
                            <h1 className="sintop">{traduccions[sessionStorage.getItem("idioma_id")][0].auna}</h1>
                            <p className="diferenciat">{traduccions[sessionStorage.getItem("idioma_id")][0].politica}</p>
                            <p className="diferenciat">{traduccions[sessionStorage.getItem("idioma_id")][0].rlc}</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <p className="diferenciat2">{traduccions[sessionStorage.getItem("idioma_id")][0].dai}</p>
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].es}</label>
                                        <input type="text" className="form-control" name="es" onChange={this.onChange} value={this.state.es} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].ca}</label>
                                        <input type="text" className="form-control" name="ca" onChange={this.onChange} value={this.state.ca} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].en}</label>
                                        <input type="text" className="form-control" name="en" onChange={this.onChange} value={this.state.en} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <p className="parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].inc100g}</p>
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].calories+" / 100g"}</label>
                                        <input type="text" className="form-control" name="calories100" onChange={this.onChange} value={this.state.calories100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].greixos+" / 100g"}</label>
                                        <input type="text" className="form-control" name="greixos100" onChange={this.onChange} value={this.state.greixos100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].hidrats+" / 100g"}</label>
                                        <input type="text" className="form-control" name="hidrats100" onChange={this.onChange} value={this.state.hidrats100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes+" / 100g"}</label>
                                        <input type="text" className="form-control" name="proteines100" onChange={this.onChange} value={this.state.proteines100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].sodi+" / 100g"}</label>
                                        <input type="text" className="form-control" name="sodi100" onChange={this.onChange} value={this.state.sodi100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].sucre+" / 100g"}</label>
                                        <input type="text" className="form-control" name="sucre100" onChange={this.onChange} value={this.state.sucre100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].fibra+" / 100g"}</label>
                                        <input type="text" className="form-control" name="fibra100" onChange={this.onChange} value={this.state.fibra100} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].imgaliment}</label>
                                        <p className="parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].imatgepng}</p>
                                        <p className="sensePadding parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].url} <input type="radio" value="url" name="tipus" onChange={this.onChangeRadio} /></p>
                                        <p className="sensePadding parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].subir} <input type="radio" value="pujar" name="tipus" onChange={this.onChangeRadio} /></p>
                                        <input type="text" className="form-control" name="url_foto" onChange={this.onChange} value={this.state.nom_llinatges} id="mostrar1" style={{ display: 'none' }} />
                                        <input type="file" id="foto" name="url_foto" onChange={this.onChangeFoto}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="parraf">{traduccions[sessionStorage.getItem("idioma_id")][0].gp}</label>
                                        <input type="text" className="form-control" name="gramsPorcio" onChange={this.onChange} value={this.state.gramsPorcio} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>NutriScore ({traduccions[sessionStorage.getItem("idioma_id")][0].debsed}) <a className="link" href="https://www.beuc.eu/publications/beuc-x-2019-051_nutri-score_factsheet.pdf" target="_blank">{traduccions[sessionStorage.getItem("idioma_id")][0].wit}</a></label>
                                        <p className="parraf">
                                            <input type="radio" value="a" name="nutriScore" onChange={this.onChangeNutriScore} /> A&nbsp;&nbsp;&nbsp;<br className="brnsocult"></br>
                                            <input type="radio" value="b" name="nutriScore" onChange={this.onChangeNutriScore} /> B&nbsp;&nbsp;&nbsp;<br className="brnsocult"></br>
                                            <input type="radio" value="c" name="nutriScore" onChange={this.onChangeNutriScore} /> C&nbsp;&nbsp;&nbsp;<br className="brnsocult"></br>
                                            <input type="radio" value="d" name="nutriScore" onChange={this.onChangeNutriScore} /> D&nbsp;&nbsp;&nbsp;<br className="brnsocult"></br>
                                            <input type="radio" value="e" name="nutriScore" onChange={this.onChangeNutriScore} /> E&nbsp;&nbsp;&nbsp;<br className="brnsocult"></br>
                                            <input type="radio" value="n" name="nutriScore" onChange={this.onChangeNutriScore} /> {traduccions[sessionStorage.getItem("idioma_id")][0].ns}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].tipusaliment} ▼</label>
                                        <Select canviar={this.onChangeTipusAliment}
                                            url="https://fct.dawidpelc.com/MDFitness/public/api/tipus"
                                            clau="id" display={sessionStorage.getItem("idioma_id")} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].marcarestaurant} ▼</label>
                                        <SelectRestaurant canviar={this.onChangeMarcaRestaurant}
                                            url="https://fct.dawidpelc.com/MDFitness/public/api/marca_restaurant"
                                            clau="id" display="marca_restaurant" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>{traduccions[sessionStorage.getItem("idioma_id")][0].contribuidor}</label>
                                        <input type="text" className="form-control" name="contribuidor" onChange={this.onChange} value={this.state.contribuidor} />
                                    </div>
                                </div>
                            </div>
                            <div className="row botons">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value={traduccions[sessionStorage.getItem("idioma_id")][0].enviarproposta} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="button" className="btn btn-danger" value={traduccions[sessionStorage.getItem("idioma_id")][0].cancelar} onClick={() => window.location.assign('/')} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
                <Row className='waves'>
                    <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                </Row>
                <FooterPage></FooterPage>
            </div>
        )
    }
}