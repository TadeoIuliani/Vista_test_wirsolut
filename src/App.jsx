import { useEffect, useState } from 'react';
import { use } from 'react';

import FiltrosBusqueda from './components/FiltrosBusqueda';
import ShowTable from './components/ShowTable';
import UseViajes from './hooks/UseViajes';
import FormModal from './components/FormModal';


import './App.css';


function App() {

  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  
  const {
    viajes,
    loading,
    error,
    setFilters,
    deleteViaje,
    updateViaje,
    postViaje
  } = UseViajes();

  const handleFilter = (filtros) => {
    setFilters(filtros); // Esto dispara automáticamente la carga de datos en el hook
  };


  return (
    <>
    <h1>Administrador de viajes</h1>
    <FiltrosBusqueda onFilter={handleFilter} onAgregarViaje={abrirModal}/>

      {mostrarModal && (
        <FormModal 
        mostrar={mostrarModal}
        cerrar={cerrarModal}
        objetoEditar={null}
        postViaje={postViaje}
        />
      )}

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
