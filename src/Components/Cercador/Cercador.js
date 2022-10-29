import React, { useState } from 'react'
import './Cercador.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function Cercador({ placeholder, dades }) {

    const [dadesFiltrades, setDadesFiltrades] = useState([]);
    const [paraulaIntroduida, setParaulaIntroduida] = useState("");

    const handleFiltre = (event) => {
        const paraulaFiltrar = event.target.value;
        setParaulaIntroduida(paraulaFiltrar);
        const nouFiltre = dades.filter((valor) => {
            if(sessionStorage.getItem("idioma_id")=="es"){return valor.es.toLowerCase().includes(paraulaFiltrar.toLowerCase());}
            if(sessionStorage.getItem("idioma_id")=="ca"){return valor.ca.toLowerCase().includes(paraulaFiltrar.toLowerCase());}
            if(sessionStorage.getItem("idioma_id")=="en"){return valor.en.toLowerCase().includes(paraulaFiltrar.toLowerCase());}
        });

        if (paraulaFiltrar === "") {
            setDadesFiltrades([])
        } else {
            setDadesFiltrades(nouFiltre);
        }

    }

    const clearFiltre = () => {
        setDadesFiltrades([]);
        setParaulaIntroduida("");
    }
    return (
        <div className='cercador'>
            <div className='cercadorInputs'>
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
                            <a className='itemDades' href={'/detall_aliment/'+valor.id}>
                                {sessionStorage.getItem("idioma_id")==="ca" && <p>{valor.ca} - {valor.calories100} kcal</p>}
                                {sessionStorage.getItem("idioma_id")==="es" && <p>{valor.es} - {valor.calories100} kcal</p>}
                                {sessionStorage.getItem("idioma_id")==="en" && <p>{valor.en} - {valor.calories100} kcal</p>}
                            </a>
                        );
                    })}
                </div>
            )}

        </div>
    )
}

export default Cercador