import { useEffect } from "react";
import React, { useState } from 'react';

import UseVehiculos from "../hooks/UseVehiculos";
import UseCiudades from "../hooks/UseCiudades";

import axios from "axios";


const FormModal = ({mostrar, cerrar, objetoEditar, postViaje}) =>{
    const [mostrarModal, setMostrarModal] = useState(false);
    const [objetoAEditar, setObjetoAEditar] = useState(null); // null si es nuevo

    const [formulario, setFormulario] = useState({
        destino: '',
        fechaDestino: '',
        vehiculo: '',
      });

    const{
        vehiculos,
        getVehiculos,
        loading,
        error
    } = UseVehiculos()
    

      const{
            ciudades,
            getCiudades,
      } = UseCiudades()
    
      useEffect(() => {
            getCiudades();
      }, []);
    

    const handleChange = (e) => {
        console.log(`${e.target.name} cambiado a: ${e.target.value}`);  // Para verificar el cambio
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    
    useEffect(() => {
        getVehiculos();
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario a enviar:", formulario); // 
        postViaje(formulario)
        cerrar(); // cerrar el modal después de enviar
    };
    

    return(
        <div className="modal-contenido">

            <h1>{objetoAEditar ? "Editar" : "Crear"}</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-basic'>
                <label>Destino</label>
                
                    <select
                        name="destino"
                        placeholder="Ej. Buenos Aires"
                        value={formulario.destino}
                        onChange={handleChange}
                        className="border rounded p-2"
                    >
                        <option value="">Ciudad No registrada</option>
                        {ciudades.map((ciudad) => (
                        <option key={ciudad.ciudadId} value={ciudad.ciudadId}>
                            {ciudad.nombre}
                        </option>
                        ))}
                    </select>
                </div>


                <div className='input-basic'>
                    <label>Fecha Destino</label>
                    <input
                    type="date"
                    name="fechaDestino"
                    value={formulario.fechaDestino}
                    onChange={handleChange}
                    className="border rounded p-2"
                    />
                </div>

                <div>
                    <label>Vehiculo</label>
                <select name="vehiculo" value={formulario.vehiculo} onChange={handleChange} className="border rounded p-2">
                    {vehiculos.map((v) => (
                        <option key={v.vehiculoId} value={v.vehiculoId}>
                        {v.patente} {v.tipo === 0 ? "(Auto)" : v.tipo === 1 ? "(Camión)" : "(Moto)"}
                        </option>
                    ))}
                </select>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                    <button type="submit">{objetoEditar ? "Actualizar" : "Crear"}</button>
                    <button type="button" onClick={cerrar} style={{ marginLeft: '1rem' }}>Cancelar</button>
                </div>

            </form>
        </div>
    )

}

export default FormModal