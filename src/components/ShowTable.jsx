import { useEffect } from "react"


const ShowTable = ({viajes, eliminarViaje, editarViaje}) =>{

    const handleEditar = (id) =>{
        editarViaje(id)
    }

    const handleEliminar = (id)=>{
        eliminarViaje(id)
    }

    useEffect(() => {
       
        console.log("Tabla actualizada. Cantidad de viajes:", viajes.length);
      }, [viajes]);

    return (
        <>
        <h2>Cantidad: {viajes.length}</h2>
        <table>
            <thead>
                <tr>
                    <th>Viaje</th>
                    <th>Destino</th>
                    <th>Fecha Creacion</th>
                    <th>Fecha Destino</th>
                    <th>Estado</th>
                    <th>Clima</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {viajes && viajes.length > 0 ? (
                    viajes.map((v) => (
                    <tr key={v.viajeId}>
                        <td>{v.viajeId}</td>
                        <td>{v.viajeDestino}</td>
                        <td>{new Date(v.fechaCreacion).toLocaleString('es-AR')}</td>
                        <td>{new Date(v.fechaDestino).toLocaleString('es-AR')}</td>
                        <td className="estado">
                        {
                            v.estadoViaje === 0 ? "Programado" :
                            v.estadoViaje === 1 ? "Cancelado" :
                            v.estadoViaje === 2 ? "Reprogramado" :
                            v.estadoViaje === 3 ? "Finalizado" :
                            v.estadoViaje === 4 ? "En Curso" :
                            "Estado desconocido" // Valor por defecto en caso de que no coincida con ningún valor
                        }
                        </td>
                        <td className="clima">
                        {
                            v.condicionClima = 0 ? "Inestable":
                            v.condicionClima = 1 ? "Condiciones Optimas" :
                            "-"
                            }
                            </td>
                        <td>
                        <button className="editar" onClick={() => handleEditar(v.viajeId)}>Editar</button>
                        <button className="eliminar" onClick={() => handleEliminar(v.viajeId)}>Eliminar</button>
                        </td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="7">No hay viajes disponibles.</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )

    
}

export default ShowTable