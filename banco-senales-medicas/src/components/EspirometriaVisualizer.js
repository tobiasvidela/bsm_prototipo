// components/EspirometriaVisualizer.js
import React from 'react';

const EspirometriaVisualizer = ({ data }) => {
  // En una implementación real, data sería un objeto con valores de la espirometría
  // Por ahora, usaremos datos simulados para mostrar un ejemplo visual
  
  // Datos simulados de espirometría (curva flujo-volumen)
  const simulatedData = data || {
    // Puntos de la curva (x: volumen, y: flujo)
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
    // Valores de referencia
    valores: {
      fvc: 5.0,  // Capacidad vital forzada (litros)
      fev1: 4.2, // Volumen espiratorio forzado en 1 segundo (litros)
      fev1_fvc: 84, // Relación FEV1/FVC (%)
      pef: 7.5,  // Flujo espiratorio máximo (litros/segundo)
      fef2575: 4.8 // Flujo espiratorio forzado 25-75% (litros/segundo)
    }
  };
  
  const width = 600;
  const height = 400;
  const padding = 40;
  
  // Valores máximos para las escalas
  const maxVolumen = 6; // litros
  const maxFlujo = 10;  // litros/segundo
  
  // Funciones para convertir valores a coordenadas
  const volumenToX = (volumen) => {
    return padding + (volumen / maxVolumen) * (width - 2 * padding);
  };
  
  const flujoToY = (flujo) => {
    // Invertimos el valor y porque en SVG el origen está en la esquina superior izquierda
    return height - padding - (flujo / maxFlujo) * (height - 2 * padding);
  };
  
  // Función para generar el path SVG de la curva
  const generatePath = () => {
    return simulatedData.curva.map((point, index) => {
      const x = volumenToX(point.volumen);
      const y = flujoToY(point.flujo);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  // Generamos líneas de referencia (ejes y cuadrícula)
  const generateGrid = () => {
    const gridLines = [];
    const horizontalLines = 5; // Número de líneas horizontales
    const verticalLines = 6;   // Número de líneas verticales
    
    // Líneas horizontales
    for (let i = 0; i <= horizontalLines; i++) {
      const flujo = (i / horizontalLines) * maxFlujo;
      const y = flujoToY(flujo);
      
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
      
      // Etiquetas del eje Y (flujo)
      gridLines.push(
        <text 
          key={`h-text-${i}`} 
          x={padding - 10} 
          y={y} 
          textAnchor="end" 
          dominantBaseline="middle" 
          fontSize="12"
          fill="#666"
        >
          {flujo}
        </text>
      );
    }
    
    // Líneas verticales
    for (let i = 0; i <= verticalLines; i++) {
      const volumen = (i / verticalLines) * maxVolumen;
      const x = volumenToX(volumen);
      
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
      
      // Etiquetas del eje X (volumen)
      gridLines.push(
        <text 
          key={`v-text-${i}`} 
          x={x} 
          y={height - padding + 20} 
          textAnchor="middle" 
          fontSize="12"
          fill="#666"
        >
          {volumen}
        </text>
      );
    }
    
    return gridLines;
  };
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-4">Visualización de Espirometría</h3>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* Fondo */}
            <rect 
              x="0" 
              y="0" 
              width={width} 
              height={height} 
              fill="#f8f8f8" 
            />
            
            {/* Cuadrícula y etiquetas de ejes */}
            {generateGrid()}
            
            {/* Ejes */}
            <line 
              x1={padding} 
              y1={height - padding} 
              x2={width - padding} 
              y2={height - padding} 
              stroke="#000" 
              strokeWidth="2" 
            />
            <line 
              x1={padding} 
              y1={height - padding} 
              x2={padding} 
              y2={padding} 
              stroke="#000" 
              strokeWidth="2" 
            />
            
            {/* Etiquetas de los ejes */}
            <text 
              x={width / 2} 
              y={height - 10} 
              textAnchor="middle" 
              fontSize="14"
              fontWeight="bold"
              fill="#333"
            >
              Volumen (L)
            </text>
            <text 
              x={15} 
              y={height / 2} 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="14"
              fontWeight="bold"
              fill="#333"
              transform={`rotate(-90, 15, ${height / 2})`}
            >
              Flujo (L/s)
            </text>
            
            {/* Curva de espirometría */}
            <path 
              d={generatePath()} 
              fill="none" 
              stroke="#0066cc" 
              strokeWidth="3" 
            />
          </svg>
        </div>
        
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4">
          <h4 className="font-medium mb-2">Valores medidos</h4>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1">FVC</td>
                <td className="py-1 font-medium">{simulatedData.valores.fvc} L</td>
              </tr>
              <tr>
                <td className="py-1">FEV1</td>
                <td className="py-1 font-medium">{simulatedData.valores.fev1} L</td>
              </tr>
              <tr>
                <td className="py-1">FEV1/FVC</td>
                <td className="py-1 font-medium">{simulatedData.valores.fev1_fvc}%</td>
              </tr>
              <tr>
                <td className="py-1">PEF</td>
                <td className="py-1 font-medium">{simulatedData.valores.pef} L/s</td>
              </tr>
              <tr>
                <td className="py-1">FEF25-75</td>
                <td className="py-1 font-medium">{simulatedData.valores.fef2575} L/s</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">
              Esta es una visualización simulada con fines de demostración. En una implementación real, 
              los datos provendrían de mediciones reales y se compararían con valores de referencia según 
              edad, género, altura y peso del paciente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspirometriaVisualizer;