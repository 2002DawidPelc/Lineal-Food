import React from 'react';
import { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import './Aliments.css';
import '../animate.js';
import traduccions from '../traduccions.json';
import FooterPage from '../Footer/FooterPage';
import fons from '../../Imatges/fondoRestaurante.jpg';
import svg from '../../Imatges/wave.png';

export default class Aliments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aliments: [],
      marca_restaurant: decodeURI(this.props.restaurant),
      descarregant: true
    }
  }

  componentDidMount() {
    this.descarrega(decodeURI(this.props.restaurant));
  }

  descarrega = (marca_restaurant) => {
    fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/perMarcaRestaurant/' + marca_restaurant, {
      method: 'GET',
    })
      .then(resposta => {
        return resposta.json()
      })
      .then(respostajson => {
        this.setState({
          aliments: respostajson.sort(),
        });
        setTimeout(() => {
          this.setState({
            descarregant: false,
          });
        }, 1000)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className='fonsRestaurants' id='fonsLoader1'>
        {
          this.state.descarregant == true &&
          <div className='contenidorloader'>
            <div className="loader">
              <div className="face">
                <div className="circle"></div>
              </div>
              <div className="face">
                <div className="circle"></div>
              </div>
            </div>
            <h1>{traduccions[sessionStorage.getItem("idioma_id")][0].loading}</h1>
          </div>
        }

        <Container className='container1 animaciomodificada'>
          <Row>
            {this.state.marca_restaurant == "Mc Donalds" && (
              <Col><div className='divTitol mcdonalds'><p className='titolGran'>{this.state.marca_restaurant}</p></div></Col>
            )}
            {this.state.marca_restaurant == "KFC" && (
              <Col><div className='divTitol kfc'><p className='titolGran'>{this.state.marca_restaurant}</p></div></Col>
            )}
            {this.state.marca_restaurant == "Burger King" && (
              <Col><div className='divTitol burgerking'><p className='titolGran'>{this.state.marca_restaurant}</p></div></Col>
            )}
          </Row>
          {this.state.descarregant == false &&
            <Row className='rowAliments'>
              {this.state.aliments.map((valor, clau) => {
                return (
                  <Col className='colAlments' id={'colAliments' + clau}
                    onClick={() => { window.location.assign("/detall_aliment/" + valor.id); }}
                    onMouseEnter={(e) => {
                      document.getElementById('mostrar' + clau).style.display = 'block';
                      document.getElementById('colAliments' + clau).style.marginBottom = "180px";
                    }}
                    onMouseLeave={(e) => {
                      document.getElementById('mostrar' + clau).style.display = 'none';
                      document.getElementById('colAliments' + clau).style.marginBottom = "80px";
                    }}>
                    <div className='prova'>
                      <img className='img1' src={valor.url_foto}>
                      </img>
                    </div>

                    <div className='divGranIcones' >

                      <div>
                        <div className='alinear'>
                          {sessionStorage.getItem("idioma_id") == "ca" && <p className='titol' >{valor.ca}</p>}
                          {sessionStorage.getItem("idioma_id") == "es" && <p className='titol' >{valor.es}</p>}
                          {sessionStorage.getItem("idioma_id") == "en" && <p className='titol' >{valor.en}</p>}
                        </div>
                        <p className='infoAliment'>{parseFloat(valor.calories100 * valor.gramsPorcio / 100).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>
                        <p className='infoAliment'>
                          {traduccions[sessionStorage.getItem("idioma_id")][0].cpm}
                        </p>
                      </div>

                      <div id={'mostrar' + clau} className='divInfoNegre' ><p></p><p className='infoNegre'>
                        {parseFloat(valor.greixos100 * valor.gramsPorcio / 100).toFixed(0)}g {traduccions[sessionStorage.getItem("idioma_id")][0].greixos} &nbsp; {parseFloat(valor.hidrats100 * valor.gramsPorcio / 100).toFixed(0)}g {traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}
                      </p><p className='infoNegre'>{parseFloat(valor.proteines100 * valor.gramsPorcio / 100).toFixed(0)}g {traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p></div>
                    </div>

                  </Col>
                )
              })}
            </Row>
          }
        </Container>
        {
          this.state.descarregant == false &&
          <Row className='waves'>
                    <Col className='wavesColImg'><p><img className='wavesImg' src={svg}></img></p></Col>
                </Row>
        }
        {
          this.state.descarregant == false &&
          <FooterPage></FooterPage>
        }
      </div>
    )
  }
}