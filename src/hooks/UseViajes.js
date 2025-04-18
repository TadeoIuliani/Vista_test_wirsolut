import axios from "axios";
import { useState, useEffect } from "react";

const URL_BASE = "http://localhost:5134/api/Viaje" // api que tiene que conectar con el backend

export function UseViajes() {
    const [viajes, setViajes] = useState([]);
    const [filters, setFilters] = useState({
        fecha: '',
        destino: '',
        tipoVehiculo: '',
        estado: ''
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const getViajes = async () =>{
        setLoading(true)
        setError(null)

        try {
            const params = {};

            if (filters.fecha) params.fecha = filters.fecha;
            if (filters.destino) params.destino = filters.destino;
            if (filters.tipoVehiculo) params.tipoVehiculo = filters.tipoVehiculo;
            if(filters.estado) params.estado = filters.estado;

            const response = await axios.get(URL_BASE, {params})
            setViajes(response.data);

        } catch (error) {
            setError("Error en la carga de viajes.");
        }
        finally{
            setLoading(false)
        }
        
    }

    const deleteViaje = async (id) => {
        try {
          await axios.delete(`${URL_BASE}/${id}`);
          getViajes()
          setViajes(prev => prev.filter(v => v.id !== id));
        } catch (err) {
            setError("Error al eliminar el viaje", err);
        }
      };

    const updateViaje = async (id, dataActualizada) =>{
        try {
            const response = await axios.put(`${URL_BASE}/${id}`, dataActualizada);
            setViajes(prev =>
                prev.map(v => (v.id === id ? response.data : v))
              );
              getViajes()
        } catch (error) {
            setError("Error al editar el viaje", err);
        }
    }
    
    useEffect(()=> {
        getViajes()
    }, [filters])


    
    return {
        viajes,
        loading,
        error,
        setFilters, // para que puedas cambiar los filtros desde el componente de UI
        refetch: getViajes, // opcional si querés forzar la recarga
        deleteViaje,
        updateViaje
      };
    
}

export default UseViajes