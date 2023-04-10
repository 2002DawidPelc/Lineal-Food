import React, { useState } from 'react'
import './CercadorDiari.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import traduccions from '../traduccions.json';
import swal from 'sweetalert';

function CercadorDiari({ placeholder, dades, descarrega }) {

    const [dadesFiltrades, setDadesFiltrades] = useState([]);
    const [paraulaIntroduida, setParaulaIntroduida] = useState("");

    const handleFiltre = (event) => {
        const paraulaFiltrar = event.target.value;
        setParaulaIntroduida(paraulaFiltrar);
        const nouFiltre = dades.filter((valor) => {
            if (sessionStorage.getItem("idioma_id") == "es") { return valor.es.toLowerCase().includes(paraulaFiltrar.toLowerCase()); }
            if (sessionStorage.getItem("idioma_id") == "ca") { return valor.ca.toLowerCase().includes(paraulaFiltrar.toLowerCase()); }
            if (sessionStorage.getItem("idioma_id") == "en") { return valor.en.toLowerCase().includes(paraulaFiltrar.toLowerCase()); }
        });

        if (paraulaFiltrar === "") {
            setDadesFiltrades([])
        } else {
            setDadesFiltrades(nouFiltre);
        }

    }

    const onClick = (e) => {
        clearFiltre();
        e.target.parentNode.parentNode.parentNode.style.display = "none";
        e.target.parentNode.parentNode.parentNode.parentNode.firstChild.style.display = "block";
        e.target.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild.style.display = "block";
        let contingut = e.target.textContent.split("-")[0];
        let afegint = traduccions[sessionStorage.getItem("idioma_id")][0].afegint;
        e.target.parentNode.parentNode.parentNode.parentNode.firstChild.textContent = afegint + " " + contingut;
        sessionStorage.setItem("IDalimentAfegir", e.target.parentNode.id);
        document.getElementById("flextaabaix" + sessionStorage.getItem("numero")).style.display = 'none';
        document.getElementById("flextaadalt" + sessionStorage.getItem("numero")).style.display = 'none';
        document.getElementById("afegir" + sessionStorage.getItem("numero")).style.display = 'none';
        document.getElementById("tancar" + sessionStorage.getItem("numero")).style.display = 'none';
        document.getElementById("creu" + sessionStorage.getItem("numero")).style.display = 'inline';
        document.getElementById("accept" + sessionStorage.getItem("numero")).style.display = 'inline';

        document.getElementById("creu" + sessionStorage.getItem("numero")).onclick = function () {
            document.getElementById("flextaabaix" + sessionStorage.getItem("numero")).style.display = 'inline';
            document.getElementById("afegir" + sessionStorage.getItem("numero")).style.display = 'inline';
            document.getElementById("creu" + sessionStorage.getItem("numero")).style.display = 'none';
            document.getElementById("accept" + sessionStorage.getItem("numero")).style.display = 'none';
            document.getElementById("cercadorMostrar" + sessionStorage.getItem("numero")).style.display = 'none';

            let mostrar = document.getElementsByClassName("ocult" + sessionStorage.getItem("numero"));
            for (let valor of mostrar) {
                valor.style.display = "none";
            }
        }

        document.getElementById("accept" + sessionStorage.getItem("numero")).onclick = function () {
            let menjar_del_dia = '';
            if (sessionStorage.getItem("numero") == 1) menjar_del_dia = "esmorzar";
            if (sessionStorage.getItem("numero") == 2) menjar_del_dia = "dinar";
            if (sessionStorage.getItem("numero") == 3) menjar_del_dia = "berenar";
            if (sessionStorage.getItem("numero") == 4) menjar_del_dia = "sopar";
            fetch('https://fct.dawidpelc.com/MDFitness/public/api/aliment_diari', {
                method: 'POST',
                body: "aliment_id=" + sessionStorage.getItem("IDalimentAfegir") + "&diari_id=" + sessionStorage.getItem("id") +
                    "&menjar_del_dia=" + menjar_del_dia + "&data_diari=" + sessionStorage.getItem("dataactual")
                    + "&quantitat=" + document.getElementById("inputquantitat" + sessionStorage.getItem("numero")).value,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            })
                .then(resposta => {
                    return resposta.json()
                })
                .then(respostajson => {
                    if (respostajson.status == "Creat") {
                        document.getElementById("flextaabaix" + sessionStorage.getItem("numero")).style.display = 'inline';
                        document.getElementById("afegir" + sessionStorage.getItem("numero")).style.display = 'inline';
                        document.getElementById("creu" + sessionStorage.getItem("numero")).style.display = 'none';
                        document.getElementById("accept" + sessionStorage.getItem("numero")).style.display = 'none';
                        document.getElementById("cercadorMostrar" + sessionStorage.getItem("numero")).style.display = 'none';
                        document.getElementById("inputquantitat" + sessionStorage.getItem("numero")).value = "";
                        sessionStorage.setItem("alimentInserit", "inserit")
                        descarrega();
                    } else {
                        swal(traduccions[sessionStorage.getItem("idioma_id")][0].nspaea, traduccions[sessionStorage.getItem("idioma_id")][0].npadaamm, "error");
                    }
                })
                .catch(function (error) {
                    swal(traduccions[sessionStorage.getItem("idioma_id")][0].nspaea, traduccions[sessionStorage.getItem("idioma_id")][0].npadaamm, "error");
                })
        }
    }

    const clearFiltre = () => {
        setDadesFiltrades([]);
        setParaulaIntroduida("");
    }
    return (
        <div className='cercadorD'>
            <div className='cercadorInputsD'>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={paraulaIntroduida}
                    onChange={handleFiltre}
                />
                <div className='iconaRecerca'>
                    {dadesFiltrades.length == 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="botoBorrar" onClick={clearFiltre} />
                    )}

                </div>
            </div>
            {dadesFiltrades.length != 0 && (
                <div className='resultatsDades'>
                    {dadesFiltrades.slice(0, 15).map((valor, clau) => {
                        return (
                            <a className='itemDades' onClick={onClick} id={valor.id}>
                                {sessionStorage.getItem("idioma_id") === "ca" && <p>{valor.ca} - {valor.calories100} kcal</p>}
                                {sessionStorage.getItem("idioma_id") === "es" && <p>{valor.es} - {valor.calories100} kcal</p>}
                                {sessionStorage.getItem("idioma_id") === "en" && <p>{valor.en} - {valor.calories100} kcal</p>}
                            </a>
                        );
                    })}
                </div>
            )}

        </div>
    )
}

export default CercadorDiari