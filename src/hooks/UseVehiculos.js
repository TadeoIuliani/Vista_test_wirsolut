import axios from "axios";
import { useState, useEffect } from "react";

const URL_BASE = import.meta.env.VITE_URL_BASE_VEHICULOS // api que tiene que conectar con el backend

export function UseVehiculos() {
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    const getVehiculos = async () =>{
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(URL_BASE)
            setVehiculos(response.data);
            console.log(response.data);
            
        } catch (error) {
            setError("Error en la carga de Vehiculos.");
        }
        finally{
            setLoading(false)
        }
    }


    return {
        vehiculos,
        getVehiculos,
        error,
        loading
      };
}

export default UseVehiculos
