// components/ECGVisualizer.js
import React from 'react';

const ECGVisualizer = ({ data }) => {
  // En una implementación real, data sería una matriz de valores del ECG
  // Por ahora, usaremos datos simulados para mostrar un ejemplo visual
  
  // Datos simulados de un ECG (onda P, complejo QRS, onda T)
  const simulatedData = data || [
    0, 0.1, 0.2, 0.3, 0.2, 0.1, 0, -0.1, 
    -0.2, 0, 0.5, 1.0, -0.5, -0.2, 0, 
    0.2, 0.4, 0.3, 0.2, 0.1, 0
  ];
  
  const width = 800;
  const height = 200;
  const padding = 20;
  const maxValue = Math.max(...simulatedData.map(Math.abs)) * 1.2;
  
  // Función para generar el path SVG
  const generatePath = () => {
    const xStep = (width - 2 * padding) / (simulatedData.length - 1);
    
    return simulatedData.map((point, index) => {
      const x = padding + index * xStep;
      // Invertimos el valor y porque en SVG el origen está en la esquina superior izquierda
      const y = height / 2 - (point / maxValue) * (height / 2 - padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  // Generamos líneas de referencia (cuadrícula)
  const generateGrid = () => {
    const gridLines = [];
    const horizontalLines = 6;
    const verticalLines = 20;
    
    // Líneas horizontales
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + i * (height - 2 * padding) / horizontalLines;
      gridLines.push(
        <line 
          key={`h-${i}`} 
          x1={padding} 
          y1={y} 
          x2={width - padding} 
          y2={y} 
          stroke="#ddd" 
          strokeWidth="1" 
        />
      );
    }
    
    // Líneas verticales
    for (let i = 0; i <= verticalLines; i++) {
      const x = padding + i * (width - 2 * padding) / verticalLines;
      gridLines.push(
        <line 
          key={`v-${i}`} 
          x1={x} 
          y1={padding} 
          x2={x} 
          y2={height - padding} 
          stroke="#ddd" 
          strokeWidth="1" 
        />
      );
    }
    
    return gridLines;
  };
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-4">Visualización de ECG</h3>
      <div className="overflow-auto">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Fondo */}
          <rect 
            x="0" 
            y="0" 
            width={width} 
            height={height} 
            fill="#f8f8f8" 
          />
          
          {/* Cuadrícula */}
          {generateGrid()}
          
          {/* Línea base (eje x) */}
          <line 
            x1={padding} 
            y1={height / 2} 
            x2={width - padding} 
            y2={height / 2} 
            stroke="#888" 
            strokeWidth="1" 
            strokeDasharray="5,5" 
          />
          
          {/* Señal ECG */}
          <path 
            d={generatePath()} 
            fill="none" 
            stroke="#ff0000" 
            strokeWidth="2" 
          />
        </svg>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Nota: Esta es una visualización simulada con fines de demostración.</p>
      </div>
    </div>
  );
};

export default ECGVisualizer;