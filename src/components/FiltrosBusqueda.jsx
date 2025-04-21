import { useState, useEffect } from 'react';

import UseCiudades from "../hooks/UseCiudades";



const hoy = new Date(Date.now()).toISOString().split('T')[0]; //.toISOsString hace el formato (2025-04-20T03:00:00.000Z)Ejemplo
const siguienteSemana = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; //(7 * 24 * 60 * 60 * 1000) = 1 semana en milisegundos


const FiltrosBusqueda = ({ onFilter , onAgregarViaje }) =>{


  const [filters, setFilters] = useState({
    fechaDesde: hoy,
    fechaHasta: siguienteSemana,
    destino: '',
    tipoVehiculo: '',
    estadoViaje: ''
  }); //Se resetea los filtros en blanco y se definen los filtros

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };


  const{
        ciudades,
        getCiudades,
        error,
        loading
  } = UseCiudades()

  useEffect(() => {
        getCiudades();
  }, []);


  return (
    <form onSubmit={handleSubmit} className="">


      <div id='botones-funcionales'>
        <div className="self-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Filtrar
            
          </button>

          <button onClick={onAgregarViaje} >Agregar Viaje</button>
      </div>



      <div className='input-basic'>
        <label>Fecha Desde</label>
        <input
          type="date"
          name="fechaDesde"
          value={filters.fechaDesde}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <div className='input-basic'>
        <label>Fecha Hasta</label>
        <input
          type="date"
          name="fechaHasta"
          value={filters.fechaHasta}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>


      <div className='input-basic'>
        <label>Destino</label>
       <select name="destino"  placeholder="Ej. Buenos Aires" value={filters.destino} onChange={handleChange} className="border rounded p-2">
       <option value="">Todos</option>
       {ciudades.map((ciudad) => (
            <option key={ciudad.ciudadId} value={ciudad.nombre}>
              {ciudad.nombre}
            </option>
          ))}
       </select>
      </div>


      <div className='input-basic'>
        <label>Tipo de Vehículo</label>
        <select
          name="tipoVehiculo"
          value={filters.tipoVehiculo}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Todos</option>
          <option value="auto">Auto</option>
          <option value="camion">Camión</option>
          <option value="moto">Moto</option>
        </select>
      </div>

      <div className='input-basic'>
        <label>Estado</label>
        <select
          name="estadoViaje"
          value={filters.estadoViaje}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Todos</option>
          <option value="0">Programado</option>
          <option value="1">Cancelado</option>
          <option value="2">Reprogramado</option>
          <option value="3">Finalizado</option>
          <option value="4">En curso</option>

        </select>
      </div>

      </div>
    </form>
  );
}

export default FiltrosBusqueda;
