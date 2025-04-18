import { useState } from 'react';
import destinos from '../data/ciudades.json'

const FiltrosBusqueda = ({ onFilter }) =>{


  const [filters, setFilters] = useState({
    fechaDesde: '',
    fechaHasta: '',
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

  return (
    <form onSubmit={handleSubmit} className="">
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
       {destinos.map((ciudad, index) => (
            <option key={index} value={ciudad}>
              {ciudad}
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
          <option value="Programado">Programado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Reprogramado">Reprogramado</option>
        </select>
      </div>

      <div className="self-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default FiltrosBusqueda;
