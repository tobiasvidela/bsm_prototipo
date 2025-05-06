// App.js - Componente principal de la aplicación
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Página de Login
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí validarías las credenciales con un backend
    if (username && password) {
      onLogin(username);
    } else {
      setError('Por favor, ingresa tu usuario y contraseña');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Banco de Señales Médicas</h1>
          <p className="mt-2 text-gray-600">Inicia sesión para acceder</p>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Usuario"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Contraseña"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Página de Menú de Opciones
const MenuOpciones = ({ user, onLogout }) => {
  const opciones = [
    { id: 'ecg', nombre: 'Electrocardiograma (ECG)', icono: '❤️' },
    { id: 'espirometria', nombre: 'Espirometría', icono: '🫁' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Banco de Señales Médicas</h1>
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold mb-6">Selecciona una opción:</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {opciones.map((opcion) => (
              <a
                key={opcion.id}
                href={`/busqueda/${opcion.id}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-4xl">{opcion.icono}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{opcion.nombre}</h3>
                    <p className="mt-1 text-gray-500">
                      Buscar y visualizar registros de {opcion.nombre.toLowerCase()}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de Búsqueda
const PaginaBusqueda = ({ user, onLogout }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [resultados, setResultados] = useState([]);
  const [tipoSenal, setTipoSenal] = useState('');
  const [cargando, setCargando] = useState(false);
  
  // Función para determinar el tipo de señal basado en la URL
  const determinarTipoSenal = () => {
    const path = window.location.pathname;
    if (path.includes('ecg')) {
      setTipoSenal('Electrocardiograma (ECG)');
    } else if (path.includes('espirometria')) {
      setTipoSenal('Espirometría');
    }
  };
  
  // Error en el código original - useEffect en lugar de useState
  React.useEffect(() => {
    determinarTipoSenal();
  }, []);
  
  // Simulación de datos para la búsqueda
  const buscarSenales = () => {
    setCargando(true);
    // En una aplicación real, aquí harías una llamada a una API
    setTimeout(() => {
      const senalesFicticias = [
        { id: 1, paciente: 'Juan Pérez', fecha: '2025-04-15', edad: 45, genero: 'M' },
        { id: 2, paciente: 'María López', fecha: '2025-04-10', edad: 32, genero: 'F' },
        { id: 3, paciente: 'Carlos Gómez', fecha: '2025-04-05', edad: 60, genero: 'M' },
      ];
      setResultados(senalesFicticias);
      setCargando(false);
    }, 1000);
  };

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
          <h2 className="text-2xl font-semibold mb-4">Búsqueda de {tipoSenal}</h2>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del paciente</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={buscarSenales}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Resultados</h3>
          
          {cargando ? (
            <div className="text-center py-4">
              <p>Cargando resultados...</p>
            </div>
          ) : resultados.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Género
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resultados.map((resultado) => (
                    <tr key={resultado.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {resultado.paciente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.edad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.genero}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800">
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/menu" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/menu" 
          element={isLoggedIn ? <MenuOpciones user={username} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/busqueda/:tipoSenal" 
          element={isLoggedIn ? <PaginaBusqueda user={username} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;