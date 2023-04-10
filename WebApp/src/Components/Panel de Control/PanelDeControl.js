import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PanelDeControl.css';
import { Col, Container, Row, Button } from 'react-bootstrap';
import traduccions from '../traduccions.json';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import swal from 'sweetalert';

export default class PanelDeControl extends Component {
    constructor(props) {
        super(props);

        const pintabotoaprovar = (params) => {
            return <div>
                <Button color="primary" size="lg" className='botoSolicitud'
                    onClick={() => { this.aprovar(params.data) }}>
                    {traduccions[sessionStorage.getItem("idioma_id")][0].aprovaraliment}</Button>
            </div>
        }

        const pintaboreprovar = (params) => {
            return <div>
                <Button variant="danger" size="lg" className='botoSolicitud'
                    onClick={() => { this.delete(params.data.id) }}>
                    {traduccions[sessionStorage.getItem("idioma_id")][0].reprovaraliment}</Button>
            </div>
        }

        const pintabotoeditar = (params) => {
            return <div>
                <Button variant="primary" size="lg" className='botoSolicitud'
                    onClick={() => { this.aprovar2(params.data) }}>
                    {traduccions[sessionStorage.getItem("idioma_id")][0].editaraliment}</Button>
            </div>
        }

        const pintabotoesborrar = (params) => {
            return <div>
                <Button variant="danger" size="lg" className='botoSolicitud'
                    onClick={() => { this.delete2(params.data.id) }}>
                    {traduccions[sessionStorage.getItem("idioma_id")][0].eliminaraliment}</Button>
            </div>
        }

        const pintaFoto = (params) => {
            return <div className='divFotoPanel'>
                <img src={params.data.url_foto} style={{height: 60}}></img>
            </div>
        }


        this.state = {
            solicituds: [],
            aliments: [],
            columnes: [
                { field: '', cellRendererFramework: pintabotoaprovar, width: 160 },
                { field: '', cellRendererFramework: pintaboreprovar, width: 160 },
                { field: 'es', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].es, minWidth: 400, resizable: true, editable: true },
                { field: 'ca', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].ca, minWidth: 400, resizable: true, editable: true },
                { field: 'en', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].en, minWidth: 400, resizable: true, editable: true },
                { field: 'calories100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].calories, width: 140, editable: true },
                { field: 'greixos100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].greixos, width: 140, editable: true },
                { field: 'hidrats100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].hidrats, width: 140, editable: true },
                { field: 'proteines100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes, width: 140, editable: true },
                { field: 'sodi100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].sodi, width: 140, editable: true },
                { field: 'sucre100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].sucre, width: 140, editable: true },
                { field: 'fibra100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].fibra, width: 140, editable: true },
                { field: 'url_foto', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].fotografia, editable: true },
                { field: '', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].previs, cellRendererFramework: pintaFoto, width: 160 },
                { field: 'nutriScore', headerName: 'NutriScore' },
                { field: 'gramsPorcio', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].gramsporcio, editable: true }
                
            ],
            columnes2: [
                { field: '', cellRendererFramework: pintabotoeditar, width: 160 },
                { field: '', cellRendererFramework: pintabotoesborrar, width: 160 },
                { field: 'es', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].es, minWidth: 400, resizable: true, editable: true, filter: true },
                { field: 'ca', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].ca, minWidth: 400, resizable: true, editable: true, filter: true },
                { field: 'en', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].en, minWidth: 400, resizable: true, editable: true, filter: true },
                { field: 'calories100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].calories, width: 140, editable: true },
                { field: 'greixos100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].greixos, width: 140, editable: true },
                { field: 'hidrats100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].hidrats, width: 140, editable: true },
                { field: 'proteines100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].proteïnes, width: 140, editable: true },
                { field: 'sodi100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].sodi, width: 140, editable: true },
                { field: 'sucre100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].sucre, width: 140, editable: true },
                { field: 'fibra100', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].fibra, width: 140, editable: true },
                { field: 'url_foto', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].fotografia, editable: true },
                { field: '', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].previs, cellRendererFramework: pintaFoto, width: 160 },
                { field: 'nutriScore', headerName: 'NutriScore' },
                { field: 'gramsPorcio', headerName: traduccions[sessionStorage.getItem("idioma_id")][0].gramsporcio, editable: true }
            ]
        }
    }
    componentDidMount = () => {
        this.descarrega();
    }

    descarrega = () => {
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/solicituds', {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    solicituds: respostajson
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments', {
            method: 'GET',
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    aliments: respostajson
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    aprovar = (data) => {
        console.log(data)
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].aceptarsolicitud1,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].aceptarsolicitud2,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].noaceptar, traduccions[sessionStorage.getItem("idioma_id")][0].siaceptar],
            dangerMode: false,
        })
            .then((willDeny) => {
                if (willDeny) {
                    let contriv = data.contribuidor;
                    if (contriv == null) {
                        contriv = ""
                    }
                    fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/' + data.id, {
                        method: 'PUT',
                        body: "calories100=" + data.calories100 + "&greixos100=" + data.greixos100 + "&hidrats100=" + data.hidrats100 + "&proteines100=" + data.proteines100 +
                            "&sodi100=" + data.sodi100 + "&sucre100=" + data.sucre100 + "&fibra100=" + data.fibra100 + "&tipus_id=" + data.tipus_id
                            + "&id_marca_restaurant=" + data.marca_restaurant.id + "&ca=" + data.ca + "&es=" + data.es + "&en=" + data.en + "&nutriScore=" + data.nutriScore
                            + "&url_foto=" + data.url_foto + "&contribuidor=" + contriv + "&aprovat=" + 1,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    })
                        .then(resposta => {
                            return resposta.json()
                        })
                        .then(respostajson => {
                            if (respostajson.status == "Modificar") {
                                window.location.reload();
                            } else {
                                alert("Error");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
    }

    aprovar2 = (data) => {
        console.log(data)
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].modificardadesaliment1,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].modificardadesaliment2,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].nodenegar, traduccions[sessionStorage.getItem("idioma_id")][0].siadelante],
            dangerMode: false,
        })
            .then((willDeny) => {
                if (willDeny) {
                    let contriv = data.contribuidor;
                    if (contriv == null) {
                        contriv = ""
                    }
                    fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/' + data.id, {
                        method: 'PUT',
                        body: "calories100=" + data.calories100 + "&greixos100=" + data.greixos100 + "&hidrats100=" + data.hidrats100 + "&proteines100=" + data.proteines100 +
                            "&sodi100=" + data.sodi100 + "&sucre100=" + data.sucre100 + "&fibra100=" + data.fibra100 + "&tipus_id=" + data.tipus_id
                            + "&id_marca_restaurant=" + data.marca_restaurant.id + "&ca=" + data.ca + "&es=" + data.es + "&en=" + data.en + "&nutriScore=" + data.nutriScore
                            + "&url_foto=" + data.url_foto + "&contribuidor=" + contriv + "&aprovat=" + 1,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    })
                        .then(resposta => {
                            return resposta.json()
                        })
                        .then(respostajson => {
                            if (respostajson.status == "Modificar") {
                                window.location.reload();
                            } else {
                                alert("Error");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
    }

    delete = (id) => {
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].denegarsolicitud1,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].denegarsolicitud2,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].sidenegar, traduccions[sessionStorage.getItem("idioma_id")][0].nodenegar],
            dangerMode: false,
        })
            .then((willDeny) => {
                if (willDeny) {
                    alert("aaa")
                    fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/' + id, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    })
                        .then(resposta => {
                            return resposta.json()
                        })
                        .then(respostajson => {
                            if (respostajson.status == "Borrat Correctament") {
                                window.location.reload();
                            } else {
                                alert("Error");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
    }

    delete2 = (id) => {
        swal({
            title: traduccions[sessionStorage.getItem("idioma_id")][0].eliminaraliment1,
            text: traduccions[sessionStorage.getItem("idioma_id")][0].eliminaraliment2,
            icon: "warning",
            buttons: [traduccions[sessionStorage.getItem("idioma_id")][0].noeliminar, traduccions[sessionStorage.getItem("idioma_id")][0].sieliminar],
            dangerMode: false,
        })
            .then((willDeny) => {
                if (willDeny) {
                    fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliments/' + id, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    })
                        .then(resposta => {
                            return resposta.json()
                        })
                        .then(respostajson => {
                            if (respostajson.status == "Borrat Correctament") {
                                window.location.reload();
                            } else {
                                alert("Error");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
    }

    render() {
        return (<div className='fullWidth altura generalpanell'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='sintop'>{traduccions[sessionStorage.getItem("idioma_id")][0].titulopanel}</h1>
                        <p className='subtitolpanell'>{traduccions[sessionStorage.getItem("idioma_id")][0].descripcionpanel}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='subtitolpanell aabbcc'>{traduccions[sessionStorage.getItem("idioma_id")][0].sdlupa}</p>
                        {this.state.solicituds.length > 0 && (
                            <div className="ag-theme-alpine" style={{
                                height: 'auto', width: '100%', margin: 'auto',
                                marginTop: 50, marginBottom: 50, fontSize: 25
                            }}>
                                <AgGridReact
                                    rowData={this.state.solicituds}
                                    columnDefs={this.state.columnes}
                                    pagination={false}
                                    paginationPageSize={10}
                                    domLayout='autoHeight'
                                    rowHeight={70}>
                                </AgGridReact>
                            </div>
                        )}
                        {this.state.solicituds.length == 0 && (
                            <h1 className='red'>{traduccions[sessionStorage.getItem("idioma_id")][0].nhhc}</h1>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='subtitolpanell aabbcc'>{traduccions[sessionStorage.getItem("idioma_id")][0].adelbdd}</p>
                        {this.state.aliments.length > 0 && (
                            <div className="ag-theme-alpine" style={{
                                height: 480, width: '100%', margin: 'auto',
                                marginTop: 50, marginBottom: 50, fontSize: 25
                            }}>
                                <AgGridReact
                                    rowData={this.state.aliments}
                                    columnDefs={this.state.columnes2}
                                    pagination={true}
                                    paginationPageSize={5}
                                    rowHeight={70}>
                                </AgGridReact>
                            </div>
                        )}
                        {this.state.aliments.length == 0 && (
                            <h1 className='red'>{traduccions[sessionStorage.getItem("idioma_id")][0].nhhc}</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}