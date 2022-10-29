import { Component } from "react";
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import './Contribuir.css';
import traduccions from '../traduccions.json';
import Select from "./Select.js";
import SelectRestaurant from "./SelectRestaurant.js";

export default class Creat extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        document.getElementById("boto1").onclick=function(){
            window.location.assign("/contribuir");
        }
    }

    render() {
        return (
            <div className="general">
                <Container className="contenidor solicitud">
                    <form onSubmit={this.onSubmit} className='formaliment'>
                        <h1 className="sintop">{traduccions[sessionStorage.getItem("idioma_id")][0].gptc}</h1>
                        <p>{traduccions[sessionStorage.getItem("idioma_id")][0].serarevisat}</p>
                        <div className="row">
                            <div className="col-md-12">
                            <input type="button" id="boto1" className="btn btn-primary" value={traduccions[sessionStorage.getItem("idioma_id")][0].hoa} style={{fontSize: '6vw'}}/>
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        );
    }
}