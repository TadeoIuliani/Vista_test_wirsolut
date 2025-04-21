import axios from "axios";
import { useState, useEffect } from "react";

const URL_BASE = "http://localhost:5134/api/Viaje" // api que tiene que conectar con el backend

const URL_BASE_CIUDADES ="http://localhost:5134/api/Ciudad"

export function UseViajes() {
    const [viajes, setViajes] = useState([]);
    const [filters, setFilters] = useState({
        fechaDesde: '',
        fechaHasta: '',
        destino: '',
        tipoVehiculo: '',
        estadoViaje: ''
          })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const getViajes = async () =>{
        setLoading(true)
        setError(null)

        try {
            const params = {};

            if (filters.fechaDesde) params.fechaDesde = filters.fechaDesde;
            if (filters.fechaHasta) params.fechaHasta = filters.fechaHasta;
            if (filters.destino) params.destino = filters.destino;
            if (filters.tipoVehiculo) params.tipoVehiculo = filters.tipoVehiculo;
            if (filters.estadoViaje) params.estadoViaje = filters.estadoViaje;
            
            const response = await axios.get(URL_BASE, {params})
            setViajes(response.data);
            console.log("Enviando filtros al backend:", params);

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

    const postViaje = async (viaje) =>{
        try {
            viaje.EstadoViaje = 0;
            viaje.FechaCreacion = new Date().toISOString();
            viaje.FechaDestino = new Date(viaje.fechaDestino).toISOString();
            viaje.CondicionClima = 0;

            const ciudadesResponse = await axios.get(URL_BASE_CIUDADES);
            console.log("Respuesta del servidor:", ciudadesResponse)
            // Verificar si se obtuvo la respuesta de ciudades correctamente
            if (!ciudadesResponse.data || ciudadesResponse.data.length === 0) {
                throw new Error("No se encontraron ciudades en la respuesta.");
            }
    
            // Buscar la ciudad por nombre
            const ciudadEncontrada = ciudadesResponse.data.find(
                (d) => d.ciudadId ===  parseInt(viaje.destino) // Buscar dentro de data y comparar el nombre
            );
    
            if (!ciudadEncontrada) {
                throw new Error("Ciudad no encontrada en la base de datos.");
            }
            viaje.CiudadId = ciudadEncontrada.ciudadId;



            const viajeRequest = {
                // Convertimos 'destino' y 'vehiculo' a los nombres de campos que el backend espera
                CiudadId: formulario.destino,  // Este es el ID de la ciudad
                FechaDestino: formulario.fechaDestino,  // Asegúrate de que la fecha sea un string en formato ISO
                EstadoViaje: 0,  // Puedes dejar este valor si es siempre el mismo
                FechaCreacion: new Date().toISOString(),  // Fecha de creación en formato ISO
                CondicionClima: 0,  // Asumiendo que es siempre el mismo valor
                VehiculoId: formulario.vehiculo,  // Este es el ID del vehículo
            };
            

            await axios.post(`${URL_BASE}`, viajeRequest)
            await getViajes()

        } catch (error) {
            
            setError("Error al agregar el viaje: " + error.message);
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
        updateViaje,
        postViaje
      };
    
}

export default UseViajes