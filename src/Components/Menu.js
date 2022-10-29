import { Component } from "react";
import { Nav, Navbar, Container, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Detall_Aliment from "./Detall_Aliment/Detall_Aliment";
import Principal from "./Principal";
import Aliments from './Aliments/Aliments.js';
import Login from './Login/Login.js';
import Register from './Registre/Registre.js';
import traduccions from './traduccions.json';
import swal from 'sweetalert';
import Perfil from "./Perfil/Perfil";
import Diari from "./Diari/Diari";
import Contribuir from "./Contribuir/Contribuir.js";
import Creat from "./Contribuir/Creat.js";
import PanelDeControl from "./Panel de Control/PanelDeControl";
import logo from "./logo.png"
import Favorits from "./Favorits/Favorits";
import TotsAliments from "./Aliments/TotsAliments";
import Receptes from "./Receptes/Receptes";
import Quisom from "./Quisom/Quisom";

export default class Menu extends Component {
    onChange = (event) => {
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

    componentDidMount=()=>{
        if(window.location.pathname != "/login" && window.location.pathname != "/register")
        sessionStorage.setItem("pathactual",window.location.pathname);
    }

    logout() {
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].espera1m,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].estassegur,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].no, traduccions[sessionStorage.getItem("idioma_id")][0].si],
            dangerMode: false,
        })
            .then((willLogoOut) => {
                if (willLogoOut) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("admin");
                    sessionStorage.setItem("idioma_id", "es");
                    sessionStorage.removeItem("registrat");
                    window.location.assign("/");
                }
            });
    }

    render() {
        console.log(new Array(4).join(Number('y tho') + 'a')+' Batman!');
        if(window.location.pathname != "/diari"){
            var today = new Date(),
            date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);
            sessionStorage.setItem("dataactual", date);
        }
        if(window.location.pathname != "/diari" && window.location.pathname != "/receptes"){
            sessionStorage.removeItem("alimentInserit");
        }
        if (sessionStorage.getItem("idioma_id") === null) {
            sessionStorage.setItem("idioma_id", "es");
        }
        return (
            <BrowserRouter >
                <Navbar bg="light" expand="xl" className="barraNavegacio">
                    <Container fluid>
                        <Navbar.Brand><a href="/" className="nohover"><img src={logo} style={{ height: 50 }} /></a></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '150px' }}
                                navbarScroll
                            >
                                <NavLink className={` ${window.location.pathname == '/' ? 'nav-link actiu' : 'nav-link'}`} href='/'>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].inici}
                                </NavLink>
                                <NavDropdown title={traduccions[sessionStorage.getItem("idioma_id")][0].restaurants} id="navbarScrollingDropdown"
                                className={` ${window.location.pathname == '/aliments/Mc%20Donalds' || window.location.pathname == '//aliments/Burger%20King' || window.location.pathname == '/aliments/KFC' ? 'dropdown-saludable actiu' : 'dropdown-saludable'}`}>
                                    <NavLink className={` ${window.location.pathname == '/aliments/Mc%20Donalds' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/aliments/Mc Donalds" >Mc Donalds</NavLink>
                                    <NavLink className={` ${window.location.pathname == '/aliments/Burger%20King' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/aliments/Burger King" >Burger King</NavLink>
                                    <NavLink className={` ${window.location.pathname == '/aliments/KFC' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/aliments/KFC" >KFC</NavLink>
                                </NavDropdown>
                                {sessionStorage.getItem("token") != null && (
                                    <NavDropdown title={traduccions[sessionStorage.getItem("idioma_id")][0].perfil} id="navbarScrollingDropdown"
                                    className={` ${window.location.pathname == '/diari' || window.location.pathname == '/perfil' || window.location.pathname == '/favorits' || window.location.pathname == '/receptes' ? 'dropdown-saludable actiu' : 'dropdown-saludable'}`}>
                                        <NavLink className={` ${window.location.pathname == '/diari' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/diari" >
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].diari}
                                        </NavLink>
                                        <NavLink className={` ${window.location.pathname == '/perfil' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/perfil" >
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].dadespersonals}
                                        </NavLink>
                                        <NavLink className={` ${window.location.pathname == '/favorits' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/favorits" >
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].alimentsfavorits}
                                        </NavLink>
                                        <NavLink className={` ${window.location.pathname == '/receptes' ? 'nav-link presonalitzat actiu' : 'nav-link presonalitzat'}`} href="/receptes" >
                                            {traduccions[sessionStorage.getItem("idioma_id")][0].receptes}
                                        </NavLink>
                                    </NavDropdown>
                                )}
                                {sessionStorage.getItem("admin") == true &&
                                    <NavLink className={` ${window.location.pathname == '/admin' ? 'nav-link actiu' : 'nav-link'}`} href='/admin'>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].pdc}
                                    </NavLink>
                                }
                                <NavLink className={` ${window.location.pathname == '/contribuir' ? 'nav-link actiu' : 'nav-link'}`} href='/contribuir'>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].contribuir}
                                </NavLink>
                                <NavLink className={` ${window.location.pathname == '/llistat_aliments' ? 'nav-link actiu' : 'nav-link'}`} href='/llistat_aliments'>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].llistataliments}
                                </NavLink>
                                <NavLink className={` ${window.location.pathname == '/quisom' ? 'nav-link actiu' : 'nav-link'}`} href='/quisom'>
                                    {traduccions[sessionStorage.getItem("idioma_id")][0].quisom}
                                </NavLink>
                                {sessionStorage.getItem("token") == null &&
                                    <NavLink className={` ${window.location.pathname == '/login' ? 'nav-link actiu' : 'nav-link'}`} href='/login'>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].iniciarsessio}
                                    </NavLink>
                                }
                                {sessionStorage.getItem("token") == null &&
                                    <NavLink className={` ${window.location.pathname == '/register' ? 'nav-link actiu' : 'nav-link'}`} href='/register'>
                                        {traduccions[sessionStorage.getItem("idioma_id")][0].registrarse}
                                    </NavLink>
                                }
                                {sessionStorage.getItem("token") != null &&
                                    <Nav.Link onClick={this.logout}>{traduccions[sessionStorage.getItem("idioma_id")][0].tancarsessio}</Nav.Link>
                                }
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Link className="idiomaSelect">
                                    <select className="form-control" onChange={this.onChange} value={sessionStorage.getItem("idioma_id")}>
                                        <option value="es">Español</option>
                                        <option value="ca">Català</option>
                                        <option value="en">English</option>
                                    </select>
                                </Nav.Link>
                                <Nav.Link>
                                    <img id="bandera" src={traduccions[sessionStorage.getItem("idioma_id")][0].bandera}></img>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/diari" element={<Diari />} />
                    <Route path="/favorits" element={<Favorits />} />
                    <Route path="/contribuir" element={<Contribuir />} />
                    <Route path="/creat" element={<Creat />} />
                    <Route path="/receptes" element={<Receptes />} />
                    <Route path="/" element={<Principal />} />
                    <Route path="/admin" element={<PanelDeControl />} />
                    <Route path="/llistat_aliments" element={<TotsAliments />} />
                    <Route path="/detall_aliment/:id" element={<CridaDetall_Aliment />} />
                    <Route path="/quisom" element={<Quisom />} />
                    <Route path="/aliments/:restaurant" element={<CridaRestaurant />} />
                    <Route path="/" element={<Principal />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

function CridaDetall_Aliment() {
    let params = useParams();
    return <Detall_Aliment id={params.id} />
}

function CridaRestaurant() {
    let params = useParams();
    return <Aliments restaurant={params.restaurant} />
}