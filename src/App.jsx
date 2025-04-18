import { useEffect, useState } from 'react';

import MenuAcciones from './components/MenuAcciones';
import FiltrosBusqueda from './components/FiltrosBusqueda';
import ShowTable from './components/ShowTable';
import { use } from 'react';
import UseViajes from './hooks/UseViajes';


import './App.css';


function App() {
  // const { viajes, eliminarViaje, editarViaje } = UseViajes();
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/viajes') // reemplazá con tu endpoint real
  //     .then(res => res.json())
  //     .then(data => {
  //       setViajes(data);
  //     })
  //     .catch(err => console.error("Error al cargar viajes:", err));
  // }, []);
  
  const {
    viajes,
    loading,
    error,
    setFilters,
    deleteViaje,
    updateViaje
  } = UseViajes();

  const handleFilter = (filtros) => {
    setFilters(filtros); // Esto dispara automáticamente la carga de datos en el hook
  };


  return (
    <>
    <h1 className="text-4xl font-bold text-center mt-5">Administrador de viajes</h1>

    <FiltrosBusqueda onFilter={handleFilter} />

    {loading && <p className="text-center mt-4">Cargando viajes...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}

    <ShowTable
        viajes={viajes}
        editarViaje={updateViaje}
        eliminarViaje={deleteViaje}
      />
    </>
  )
}

export default App
