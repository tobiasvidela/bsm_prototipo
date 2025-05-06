// pages/DetalleSenal.js
import React, { useState, useEffect } from 'react';
import ECGVisualizer from '../components/';
import EspirometriaVisualizer from '../components/EspirometriaVisualizer';

const DetalleSenal = ({ user, onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [tipoSenal, setTipoSenal] = useState('');
  const [detalleEstudio, setDetalleEstudio] = useState(null);
  const [error, setError] = useState('');
  
  // Extraer el tipo de señal y el ID del estudio de la URL
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    
    // Determinar tipo de señal
    if (path.includes('ecg')) {
      setTipoSenal('ecg');
    } else if (path.includes('espirometria')) {
      setTipoSenal('espirometria');
    }
    
    // Obtener el ID del estudio (último segmento de la URL)
    const idEstudio = segments[segments.length - 1];
    
    // Simular carga de datos desde una API
    setTimeout(() => {
      if (tipoSenal === 'ecg') {
        // Datos simulados de un ECG
        setDetalleEstudio({
          id: idEstudio,
          paciente: {
            nombre: 'Juan Pérez',
            edad: 45,
            genero: 'M',
            altura: 178, // cm
            peso: 75 // kg
          },
          fecha: '2025-04-15',
          medico: 'Dra. María Rodríguez',
          departamento: 'Cardiología',
          resultados: {
            frecuenciaCardiaca: 72, // lpm
            intervalosPR: 160, // ms
            duracionQRS: 90, // ms
            intervaloQT: 380, // ms
            ejeElectrico: 30, // grados
            conclusion: 'Ritmo sinusal normal sin alteraciones significativas.'
          },
          // Datos simulados para la visualización
          senalData: [
            0, 0.1, 0.2, 0.3, 0.2, 0.1, 0, -0.1, 
            -0.2, 0, 0.5, 1.0, -0.5, -0.2, 0, 
            0.2, 0.4, 0.3, 0.2, 0.1, 0
          ]
        });
      } else if (tipoSenal === 'espirometria') {
        // Datos simulados de una espirometría
        setDetalleEstudio({
          id: idEstudio,
          paciente: {
            nombre: 'María López',
            edad: 32,
            genero: 'F',
            altura: 165, // cm
            peso: 62 // kg
          },
          fecha: '2025-04-10',
          medico: 'Dr. Pablo Sánchez',
          departamento: 'Neumología',
          resultados: {
            fvc: 5.0,  // Capacidad vital forzada (litros)
            fev1: 4.2, // Volumen espiratorio forzado en 1 segundo (litros)
            fev1_fvc: 84, // Relación FEV1/FVC (%)
            pef: 7.5,  // Flujo espiratorio máximo (litros/segundo)
            fef2575: 4.8, // Flujo espiratorio forzado 25-75% (litros/segundo)
            conclusion: 'Prueba de espirometría sin alteraciones significativas. Patrón respiratorio normal.'
          },
          // Datos simulados para la visualización
          senalData: {
            curva: [
              { volumen: 0, flujo: 0 },
              { volumen: 0.5, flujo: 2 },
              { volumen: 1, flujo: 5 },
              { volumen: 1.5, flujo: 7 },
              { volumen: 2, flujo: 6 },
              { volumen: 2.5, flujo: 4 },
              { volumen: 3, flujo: 2.5 },
              { volumen: 3.5, flujo: 1.5 },
              { volumen: 4, flujo: 0.8 },
              { volumen: 4.5, flujo: 0.3 },
              { volumen: 5, flujo: 0 }
            ],
            valores: {
              fvc: 5.0,
              fev1: 4.2,
              fev1_fvc: 84,
              pef: 7.5,
              fef2575: 4.8
            }
          }
        });
      } else {
        setError('Tipo de señal no reconocido');
      }
      setLoading(false);
    }, 1500);
  }, [tipoSenal]);
  
  // Función para renderizar el visualizador correspondiente
  const renderVisualizador = () => {
    if (!detalleEstudio) return null;
    
    switch (tipoSenal) {
      case 'ecg':
        return <ECGVisualizer data={detalleEstudio.senalData} />;
      case 'espirometria':
        return <EspirometriaVisualizer data={detalleEstudio.senalData} />;
      default:
        return <div className="text-red-500">Tipo de señal no soportado</div>;
    }
  };
  
  // Función para renderizar los detalles específicos según el tipo de señal
  const renderDetallesEspecificos = () => {
    if (!detalleEstudio) return null;
    
    switch (tipoSenal) {
      case 'ecg':
        return (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Resultados</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Frecuencia cardíaca:</td>
                    <td className="py-1">{detalleEstudio.resultados.frecuenciaCardiaca} lpm</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Intervalo PR:</td>
                    <td className="py-1">{detalleEstudio.resultados.intervalosPR} ms</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Duración QRS:</td>
                    <td className="py-1">{detalleEstudio.resultados.duracionQRS} ms</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Intervalo QT:</td>
                    <td className="py-1">{detalleEstudio.resultados.intervaloQT} ms</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Eje eléctrico:</td>
                    <td className="py-1">{detalleEstudio.resultados.ejeElectrico}°</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="font-medium mb-2">Conclusión</h4>
              <p className="text-sm">{detalleEstudio.resultados.conclusion}</p>
            </div>
          </div>
        );
      case 'espirometria':
        return (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Resultados</h4>
            <table className="w-full text-sm mb-4">
              <tbody>
                <tr>
                  <td className="py-1 font-medium">FVC:</td>
                  <td className="py-1">{detalleEstudio.resultados.fvc} L</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">FEV1:</td>
                  <td className="py-1">{detalleEstudio.resultados.fev1} L</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">FEV1/FVC:</td>
                  <td className="py-1">{detalleEstudio.resultados.fev1_fvc}%</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">PEF:</td>
                  <td className="py-1">{detalleEstudio.resultados.pef} L/s</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">FEF25-75:</td>
                  <td className="py-1">{detalleEstudio.resultados.fef2575} L/s</td>
                </tr>
              </tbody>
            </table>
            <h4 className="font-medium mb-2">Conclusión del estudio</h4>
            <p className="text-sm">{detalleEstudio.resultados.conclusion}</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium text-red-600 mb-4">Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.history.back()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/menu" className="text-xl font-bold">Banco de Señales Médicas</a>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Bienvenido, {user}</span>
              <button
                onClick={onLogout}
                className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {tipoSenal === 'ecg' && 'Detalle de Electrocardiograma'}
              {tipoSenal === 'espirometria' && 'Detalle de Espirometría'}
            </h2>
            <button 
              onClick={() => window.history.back()} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Volver
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Cargando datos del estudio...</p>
            </div>
          </div>
        ) : detalleEstudio ? (
          <>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Información del estudio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Datos del paciente</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 font-medium">Nombre:</td>
                        <td className="py-1">{detalleEstudio.paciente.nombre}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Edad:</td>
                        <td className="py-1">{detalleEstudio.paciente.edad} años</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Género:</td>
                        <td className="py-1">{detalleEstudio.paciente.genero === 'M' ? 'Masculino' : 'Femenino'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Altura:</td>
                        <td className="py-1">{detalleEstudio.paciente.altura} cm</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Peso:</td>
                        <td className="py-1">{detalleEstudio.paciente.peso} kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Información del estudio</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 font-medium">ID Estudio:</td>
                        <td className="py-1">{detalleEstudio.id}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Fecha:</td>
                        <td className="py-1">{detalleEstudio.fecha}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Médico:</td>
                        <td className="py-1">{detalleEstudio.medico}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Departamento:</td>
                        <td className="py-1">{detalleEstudio.departamento}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              {renderVisualizador()}
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Análisis y conclusiones</h3>
              {renderDetallesEspecificos()}
            </div>
          </>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center py-4">
              <p className="text-gray-600">No se encontraron datos para el estudio seleccionado.</p>
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-white mt-8 py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Banco de Señales Médicas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DetalleSenal;