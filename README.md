# AppViajesReact

Aplicación web desarrollada con React y Vite que permite visualizar una lista de viajes guardados en el backend del proyecto **AppViajes**. Además, ofrece la posibilidad de aplicar filtros dinámicos para personalizar la vista de los viajes disponibles.

## Tecnologías utilizadas

- **React**
- **Vite**
- **CSS** (estilado personalizado)

## Requisitos previos

Este frontend se conecta con una API provista por el backend del proyecto **AppViajes**.  
Para que funcione correctamente, es necesario que el backend esté operativo y con los endpoints configurados adecuadamente.

## Instalación y ejecución

Cloná el repositorio y ejecutá los siguientes comandos:

```bash
git clone https://github.com/tuusuario/AppViajesReact.git
cd AppViajesReact
npm install
npm run dev
```

Esto iniciará la aplicación en modo desarrollo en http://localhost:5173

## Funcionalidades principales
- Visualización de viajes disponibles obtenidos desde la API externa

- Filtros dinámicos por destino, rango de fechas y tipo de vehiculo

- Renderizado de tabla con la información detallada de cada viaje

- Diseño optimo y simple

## Estructura básica del proyecto

src/
│
├── components/         
├── hooks/             
├── App.jsx             
├── App.css          
└── main.jsx            
