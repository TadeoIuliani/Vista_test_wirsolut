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
        fechaDesde: '',
        estadoViaje: '',
        clima: '',
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
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (objetoEditar) {
          setFormulario({
            destino: objetoEditar.destino || '',
            fechaDestino: objetoEditar.fechaDestino || '',
            fechaDesde: objetoEditar.fechaDesde || '',
            estadoViaje: objetoEditar.estadoViaje || '',
            clima: objetoEditar.clima || '',
            vehiculo: objetoEditar.vehiculo || '',
          });
        } else {
          setFormulario({
            destino: '',
            fechaDestino: '',
            fechaDesde: '',
            estadoViaje: '',
            clima: '',
            vehiculo: '',
          });
        }
      }, [objetoEditar]);
    
    useEffect(() => {
        getVehiculos();
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        {ciudades.map((ciudad) => (
                        <option key={ciudad.ciudadId} value={ciudad.ciudadId}>
                            {ciudad.nombre}
                        </option>
                        ))}
                    </select>
                </div>
                

                {objetoEditar && (
                    <>
                        <div className='input-basic'>
                        <label>Estado del viaje</label>
                        <div className="border rounded p-2 bg-gray-100">
                            {formulario.estadoViaje || "Sin estado"}
                        </div>
                        </div>

                        <div className='input-basic'>
                        <label>Fecha de creación</label>
                        <input
                            type="text"
                            value={objetoEditar.fechaCreacion || "No especificada"}
                            disabled
                            className="border rounded p-2 bg-gray-100"
                        />
                        </div>

                        <div className='input-basic'>
                        <label>Clima</label>
                        <input
                            type="text"
                            name="clima"
                            value={formulario.clima}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />
                        </div>
                    </>
                    )}
















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