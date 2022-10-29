import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import './Login.css';
import swal from 'sweetalert';
import traduccions from '../traduccions.json';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount=()=>{
        document.body.style.backgroundImage = "url('https://fct.dawidpelc.com/MDFitness/public/imatges/aliments/aliment_1654288193.jpg')";
        document.body.style.backgroundPosition = "center";
    }

    onSubmit = (e) => {
        e.preventDefault();

        fetch('https://fct.dawidpelc.com/MDFitness/public/api/login', {
            method: 'POST',
            body: "email=" + this.state.email + "&password=" + this.state.password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                if (respostajson.status == "Login OK") {
                    sessionStorage.setItem("token", respostajson.result);
                    sessionStorage.setItem("id", respostajson.ID);
                    sessionStorage.setItem("admin", respostajson.Admin);
                    sessionStorage.setItem("aconsumir", respostajson.aconsumir);
                    sessionStorage.setItem("objectiu_establert", respostajson.objectiu_establert);
                    if (respostajson.Idioma != null) {
                        sessionStorage.setItem("idioma_id", respostajson.Idioma);
                    }
                    swal({
                        title: traduccions[sessionStorage.getItem("idioma_id")][0].sesini,
                        text: traduccions[sessionStorage.getItem("idioma_id")][0].hola,
                        icon: "success",
                        buttons: {
                            confirm: { text: 'OK', className: 'swal-boto-verd' },
                        },
                    })
                        .then(() => {
                            window.location.assign(sessionStorage.getItem("pathactual"));
                        });
                } else {
                    swal({
                        title: traduccions[sessionStorage.getItem("idioma_id")][0].nshpis,
                        text: traduccions[sessionStorage.getItem("idioma_id")][0].upfail,
                        icon: "error",
                        buttons: {
                            confirm: { text: traduccions[sessionStorage.getItem("idioma_id")][0].tornaraintentar, className: 'swal-boto-blau' },
                        },
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        sessionStorage.setItem("registrat", "incorrecte");
        window.scrollTo(0, 0);
    }

    render() {
        return (<div className='divLogin'>
            <Container className='containerLogin' style={{ width: 600, fontSize: 25, marginTop: 100 }}>
                <h1 className='titolIniciarSessio'>{traduccions[sessionStorage.getItem("idioma_id")][0].iniciarsessio.toUpperCase()}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label style={{ padding: 20 }}>{traduccions[sessionStorage.getItem("idioma_id")][0].ce}:</label>
                                <input type="text" className="form-control inputLogin inputEmail" name="email" onChange={this.onChange} placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].ce+"..."} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label style={{ padding: 20 }}>{traduccions[sessionStorage.getItem("idioma_id")][0].reset2}:</label>
                                <input type="password" className="form-control inputLogin inputPass" name="password" onChange={this.onChange} placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].reset2+"..."} />
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary botoLogin"
                                    value={traduccions[sessionStorage.getItem("idioma_id")][0].iniciarsessio} style={{ fontSize: 25, width: 200 }} />
                            </div>
                        </div>
                    </div>
                    <div className='divDireccioRegistre'><p>{traduccions[sessionStorage.getItem("idioma_id")][0].notienescuenta} <a href='/register'>{traduccions[sessionStorage.getItem("idioma_id")][0].registrate}</a></p></div>
                </form>
            </Container>
        </div>

        );
    }
}