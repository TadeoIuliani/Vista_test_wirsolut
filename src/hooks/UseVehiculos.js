import axios from "axios";
import { useState, useEffect } from "react";

const URL_BASE = "http://localhost:5134/api/Vehiculo" // api que tiene que conectar con el backend

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
