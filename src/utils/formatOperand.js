// src/utils/formatOperand.js

/**
 * Formatea un operando numérico para agregar comas a los números enteros y manejar decimales.
 * 
 * @param {string | null} operand - El operando que será formateado, puede incluir parte entera y decimal.
 * @returns {string | undefined} - El número formateado como una cadena, o `undefined` si el operando es `null` o `undefined`.
 */
export function formatOperand(operand) {
  if (operand == null) return undefined; // Manejar casos donde el operando es nulo o indefinido.

  const [integer, decimal] = operand.split(".");

  // Si no hay parte decimal, devuelve solo el entero formateado.
  if (decimal == null) return INTEGER_FORMATTER.format(integer);

  // Si existe una parte decimal, devuelve el número completo con la parte entera formateada.
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

// Configuración para formatear números enteros, sin dígitos fraccionarios.
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
