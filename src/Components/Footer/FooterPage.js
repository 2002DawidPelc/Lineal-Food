import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';
import instagram from '../../Imatges/Icones/corazon.png';
import traduccions from '../traduccions.json';
import xarxessocials from '../../Imatges/xarxessocials.png';

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4 gran">
      <MDBContainer fluid className="text-center text-md-left seccio">
        <MDBRow>

          <MDBCol md="3">

            <ul>
              <li className="list-unstyled">
                <h5 className="title margear">{traduccions[sessionStorage.getItem("idioma_id")][0].socialmedia}</h5>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="aHover"><img className="imgXS" src={xarxessocials}></img></a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title titolfooter">Lineal Food</h5>
            <p className="resumfooter">
              {traduccions[sessionStorage.getItem("idioma_id")][0].intro}
            </p>
          </MDBCol>
          <MDBCol md="3">

            <ul>
              <li className="list-unstyled">
                <h5 className="title">LINKS</h5>
              </li>
              <li className="list-unstyled">
                <a href="/contribuir" className="aHover">{traduccions[sessionStorage.getItem("idioma_id")][0].contribuir}</a>
              </li>
              <li className="list-unstyled">
                <a href="/llistat_aliments" className="aHover">{traduccions[sessionStorage.getItem("idioma_id")][0].llistataliments}</a>
              </li>
              <li className="list-unstyled">
                <a href="/quisom" className="aHover">{traduccions[sessionStorage.getItem("idioma_id")][0].quisom}</a>
              </li>
            </ul>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 footerBaix">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://fct.dawidpelc.com"> fct.dawidpelc.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;