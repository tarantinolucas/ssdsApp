# Sistema de Soporte a Decisiones de Compras (SSDC)

Aplicación Web (MERN Stack) desarrollada para optimizar el proceso de compras de insumos importados y locales en una empresa de Argentina.

## 🎯 Objetivo del Negocio

El objetivo principal es solucionar la dificultad de comparar precios en distintas monedas (ARS/USD), gestionar la falta de liquidez y validar aumentos de precios.

*   **Comparación Multimoneda:** Normalización de cotizaciones a una moneda base.
*   **Gestión de Liquidez:** Herramientas para decidir entre "Mejor Precio Unitario" vs "Menor Desembolso de Caja".
*   **Validación de Precios:** Comparación del precio actual contra el "Último Precio de Compra" ajustado por inflación (IPC) y devaluación histórica.

## 🛠 Tech Stack

*   **Frontend:** React + Vite
*   **Backend:** Node.js + Express
*   **Base de Datos:** MongoDB (Mongoose)

## 📋 Reglas de Negocio Clave

1.  **Normalización:** Todas las comparativas se convierten a una moneda base utilizando APIs externas para obtener tipos de cambio.
2.  **Validación Histórica:** Se analiza si el aumento de precio está justificado comparando con la inflación y la evolución del dólar desde la última compra.
3.  **Comparativa de Escenarios:** Soporte para múltiples cotizaciones por producto (escalas). Se evalúan trade-offs entre precio unitario y flujo de caja.

## 🗂 Modelo de Datos (Simplificado)

*   **Producto:** Almacena el historial del último precio pagado.
*   **Requerimiento:** Documento padre que representa el ticket o solicitud de compra.
*   **Cotización:** Sub-documento plano dentro del requerimiento.
    *   Estructura: `{ cantidad, precioUnitario, alicuotaIVA, total, ... }`
    *   *Nota:* Cada escala de precios se trata como una cotización distinta (variante), evitando arrays anidados complejos.

## 📂 Estructura del Proyecto

/ssdsApp
  ├── /.git
  ├── /client          (Frontend: React + Vite) 
  ├── /server          (Backend: Node + Express)
  │      ├─/src
  │      │   ├── /config      (Conexión a DB Atlas, variables de entorno)
  │      │   ├── /controllers (Req/Res)
  │      │   ├── /models      (Schemas Mongoose: Producto, Requerimiento...)
  │      │   ├── /routes      (Endpoints de Express)
  │      │   ├── /services    (Lógica dura: CalculadoraPrecios, IntegracionAPIs)
  │      │   └── /utils       (Helpers, formateadores de fecha)
  │      ├── app.js
  │      └── server.js
  │      └── index.js         (Entry point)
  ├── .gitignore       (Ignorar node_modules, .env, etc.)
  └── README.md        (Documentación esencial del proyecto)