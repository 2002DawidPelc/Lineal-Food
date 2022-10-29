import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import './Registre.css';
import swal from 'sweetalert';
import traduccions from '../traduccions.json';

export default class Register extends Component {
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
        console.log(this.state.email + " " + this.state.password)
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/usuaris', {
            method: 'POST',
            body: "email=" + this.state.email + "&password=" + this.state.password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(resposta => {
                console.log(resposta)
                return resposta.json();
            })
            .then(respostajson => {
                if (respostajson.status == "Creat") {
                    swal({
                        title: traduccions[sessionStorage.getItem("idioma_id")][0].registrefet,
                        text: traduccions[sessionStorage.getItem("idioma_id")][0].volsinises,
                        icon: "success",
                        buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].notnow, traduccions[sessionStorage.getItem("idioma_id")][0].ytkmh],
                        dangerMode: false,
                    })
                        .then((login) => {
                            if (login) {
                                window.location.assign("/login");
                            } else {
                                window.location.assign("/");
                            }
                        });
                } else {
                    if (respostajson.status == "duplicateemail") {
                        swal(traduccions[sessionStorage.getItem("idioma_id")][0].duplicateemail1, traduccions[sessionStorage.getItem("idioma_id")][0].duplicateemail2, "error");
                    } else {
                        swal(traduccions[sessionStorage.getItem("idioma_id")][0].errordesconegut, traduccions[sessionStorage.getItem("idioma_id")][0].torniaintentarho, "error");
                    }
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
        console.log(sessionStorage.getItem("registrat"));
        window.scrollTo(0, 0);
    }

    onSend = (e) => {
        window.location.assign("/login");
    }
    render() {
        return (<div className='divRegistre'>
            <Container className='containerRegistre' style={{ width: 600, fontSize: 25, marginTop: 100 }}>
                <h1 className='titolRegistre'>{traduccions[sessionStorage.getItem("idioma_id")][0].registrate}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label style={{ padding: 20 }}>{traduccions[sessionStorage.getItem("idioma_id")][0].ce}:</label>
                                <input type="text" className="form-control inputLogin inputEmail" name="email" onChange={this.onChange} placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].ce + "..."} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label style={{ padding: 20 }}>{traduccions[sessionStorage.getItem("idioma_id")][0].reset2}:</label>
                                <input type="password" className="form-control inputLogin inputPass" name="password" onChange={this.onChange} placeholder={traduccions[sessionStorage.getItem("idioma_id")][0].reset2 + "..."} />
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary botoRegistre"
                                    value={traduccions[sessionStorage.getItem("idioma_id")][0].registrarse} style={{ fontSize: 25, width: 200 }} />
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
        );
    }
}