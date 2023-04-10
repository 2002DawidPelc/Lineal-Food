import React from 'react';
import { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import svg from '../../Imatges/wave.png';
import './Aliments.css';
import './TotsAliments.css';
import '../animate.js';
import traduccions from '../traduccions.json';
import FooterPage from '../Footer/FooterPage';
import Select from "../Contribuir/Select.js";
import SelectRestaurant from '../Contribuir/SelectRestaurant';
import { FaArrowCircleUp } from 'react-icons/fa';

export default class TotsAliments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filtrat: [],
      original: [],
      descarregant: true
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
        this.setState({
          original: respostajson.reverse(),
          filtrat: respostajson
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

  orderByCalories = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(a.calories100) - parseFloat(b.calories100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByCaloriesContrari = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(b.calories100) - parseFloat(a.calories100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByNombre = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      if (sessionStorage.getItem("idioma_id") == "es") { return a.es.localeCompare(b.es) }
      if (sessionStorage.getItem("idioma_id") == "ca") { return a.ca.localeCompare(b.ca) }
      if (sessionStorage.getItem("idioma_id") == "en") { return a.en.localeCompare(b.en) }
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByNombreContrari = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      if (sessionStorage.getItem("idioma_id") == "es") { return b.es.localeCompare(a.es) }
      if (sessionStorage.getItem("idioma_id") == "ca") { return b.ca.localeCompare(a.ca) }
      if (sessionStorage.getItem("idioma_id") == "en") { return b.en.localeCompare(a.en) }
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByGreixosMenor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(a.greixos100) - parseFloat(b.greixos100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByGreixosMajor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(b.greixos100) - parseFloat(a.greixos100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByHidratsMenor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(a.hidrats100) - parseFloat(b.hidrats100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByHidratsMajor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(b.hidrats100) - parseFloat(a.hidrats100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByProteinesMenor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(a.proteines100) - parseFloat(b.proteines100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  orderByProteinesMajor = (e) => {
    let ordenat = this.state.original.sort(function (a, b) {
      return parseFloat(b.proteines100) - parseFloat(a.proteines100);
    });
    this.setState({ filtrat: ordenat });
    this.canviarColors(e);
  }

  onChangeMarcaRestaurant = (v) => {
    let ordenat = this.state.original.filter(aliment => aliment.marca_restaurant.id == v)
    this.setState({ filtrat: ordenat });
    document.getElementsByClassName("form-control")[2].style.background = "radial-gradient(circle, rgba(193,249,0,1) 0%, rgba(51,204,51,1) 200%)";
    document.getElementsByClassName("form-control")[1].style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    let botons = document.getElementsByClassName("canviaColor");
    for (let valor of botons) {
      valor.style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    }
    this.scroll();
  }

  onChangeTipusAliment = (v) => {
    let ordenat = this.state.original.filter(aliment => aliment.tipus_id == v)
    this.setState({ filtrat: ordenat });
    document.getElementsByClassName("form-control")[1].style.background = "radial-gradient(circle, rgba(193,249,0,1) 0%, rgba(51,204,51,1) 200%)";
    document.getElementsByClassName("form-control")[2].style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    let botons = document.getElementsByClassName("canviaColor");
    for (let valor of botons) {
      valor.style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    }
    this.scroll();
  }

  canviarColors = (e) => {
    let botons = document.getElementsByClassName("canviaColor");
    for (let valor of botons) {
      valor.style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    }
    e.target.style.background = "radial-gradient(circle, rgba(193,249,0,1) 0%, rgba(51,204,51,1) 200%)";
    document.getElementsByClassName("form-control")[2].style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    document.getElementsByClassName("form-control")[1].style.background = "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(114, 250, 255) 200%)";
    this.scroll();
  }

  scroll = () => {
    if (window.innerWidth <= 768 && window.innerWidth > 425) {
      window.scrollTo(0, window.innerHeight + 540);
    } else {
      if (window.innerWidth <= 425 & window.innerWidth > 375) {
        window.scrollTo(0, window.innerHeight + 1400);
      } else {
        if (window.innerWidth <= 375 & window.innerWidth > 325) {
          window.scrollTo(0, window.innerHeight + 1520);
        } else {
          if (window.innerWidth <= 325) {
            window.scrollTo(0, window.innerHeight + 1400);
          } else {
            window.scrollTo(0, window.innerHeight + 250);
          }
        }
      }
    }
  }



  render() {
    return (
      <div className='fonsFiltre'>
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
        {
          this.state.descarregant == false &&
          <Container className='container1'>
            <span id='ir-arriba' onClick={() => {
              if (window.innerWidth <= 768 && window.innerWidth > 425) {
                window.scrollTo(0, 320);
              } else {
                if (window.innerWidth <= 425 & window.innerWidth > 375) {
                  window.scrollTo(0, 200);
                } else {
                  if (window.innerWidth <= 375) {
                    window.scrollTo(0, 250);
                  } else {
                    if (window.innerWidth <= 1540 && window.innerWidth > 768) {
                      window.scrollTo(0, 336);
                    } else {

                      window.scrollTo(0, 370);
                    }
                  }
                }
              }
            }}>
              <FaArrowCircleUp></FaArrowCircleUp> {traduccions[sessionStorage.getItem("idioma_id")][0].arrowup}
            </span>
            <Row>
              <Col>
                <h1 className='titolFiltre'>{traduccions[sessionStorage.getItem("idioma_id")][0].llistataliments}</h1>
                <p id="adalt" className='subtitolFiltre'>{traduccions[sessionStorage.getItem("idioma_id")][0].descllistaaliments}</p>
              </Col>
            </Row>
            <Row>
              <Col className='interfazFiltro marginTopFiltre'>
                <span></span>
                <label></label>
                <button className='canviaColor' onClick={this.orderByNombre} href="#avall">{traduccions[sessionStorage.getItem("idioma_id")][0].filtrealfabet}</button>
              </Col>
              <Col className='interfazFiltro marginTopFiltre'>
                <label></label>
                <button className='canviaColor' onClick={this.orderByNombreContrari} >{traduccions[sessionStorage.getItem("idioma_id")][0].filtrealfabetcontrari}</button>
              </Col>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtretipus} ▼</label>
                <Select canviar={this.onChangeTipusAliment} className='canviaColor'
                  url="https://fct.dawidpelc.com/MDFitness/public/api/tipus"
                  clau="id" display={sessionStorage.getItem("idioma_id")} />
              </Col>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtrerestaurant} ▼</label>
                <SelectRestaurant canviar={this.onChangeMarcaRestaurant} className='canviaColor'
                  url="https://fct.dawidpelc.com/MDFitness/public/api/marca_restaurant"
                  clau="id" display={"marca_restaurant"} />
              </Col>
            </Row>

            <Row>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtrecalories}</label>
                <button className='canviaColor' onClick={this.orderByCaloriesContrari} >{traduccions[sessionStorage.getItem("idioma_id")][0].demajoramenor}</button>
                <button className='canviaColor' onClick={this.orderByCalories} >{traduccions[sessionStorage.getItem("idioma_id")][0].demenoramajor}</button>
              </Col>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtregreixos}</label>
                <button className='canviaColor' onClick={this.orderByGreixosMajor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demajoramenor}</button>
                <button className='canviaColor' onClick={this.orderByGreixosMenor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demenoramajor}</button>
              </Col>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtrehidrats}</label>
                <button className='canviaColor' onClick={this.orderByHidratsMajor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demajoramenor}</button>
                <button className='canviaColor' onClick={this.orderByHidratsMenor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demenoramajor}</button>
              </Col>
              <Col className='interfazFiltro'>
                <label>{traduccions[sessionStorage.getItem("idioma_id")][0].filtreproteines}</label>
                <button className='canviaColor' onClick={this.orderByProteinesMajor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demajoramenor}</button>
                <button className='canviaColor' onClick={this.orderByProteinesMenor} >{traduccions[sessionStorage.getItem("idioma_id")][0].demenoramajor}</button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className='subtitolFiltre' id="offsetTopAliments">{traduccions[sessionStorage.getItem("idioma_id")][0].lainfoesper100g}</p>
              </Col>
            </Row>
            <Row className='rowAliments filtre22' id="iWantToScrollHere">
              {this.state.filtrat.map((valor, clau) => {
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


                        <p className='infoAliment'>{parseFloat(valor.calories100).toFixed(0)} {traduccions[sessionStorage.getItem("idioma_id")][0].calories}</p>

                        <p className='infoAliment'>
                          {traduccions[sessionStorage.getItem("idioma_id")][0].cpm}
                        </p>
                      </div>

                      <div id={'mostrar' + clau} className='divInfoNegre' ><p></p><p className='infoNegre'>

                        {parseFloat(valor.greixos100).toFixed(2)}g {traduccions[sessionStorage.getItem("idioma_id")][0].greixos} &nbsp; {parseFloat(valor.hidrats100).toFixed(2)}g {traduccions[sessionStorage.getItem("idioma_id")][0].hidrats}
                      </p><p className='infoNegre'>{parseFloat(valor.proteines100).toFixed(2)}g {traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes}</p></div>
                    </div>

                  </Col>
                )
              })}
            </Row>
          </Container>
        }
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