import axios from "axios";
import { useState, useEffect } from "react";

const URL_BASE = "http://localhost:5134/api/Ciudad" // api que tiene que conectar con el backend

export function UseCiudades() {
    const [ciudades, setCiudades] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    const getCiudades = async () =>{
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(URL_BASE)
            setCiudades(response.data);
            console.log(response.data);
            
        } catch (error) {
            setError("Error en la carga de Ciudades.");
        }
        finally{
            setLoading(false)
        }
    }


    return {
        ciudades,
        getCiudades,
        error,
        loading
      };
}

export default UseCiudades

