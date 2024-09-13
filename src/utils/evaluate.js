/**
 * Evalúa la operación matemática entre el operando anterior y el operando actual.
 * 
 * @param {Object} params - Parámetros para la evaluación.
 * @param {string} params.currentOperand - El operando actual como una cadena.
 * @param {string} params.previousOperand - El operando anterior como una cadena.
 * @param {string} params.operation - La operación matemática a realizar (e.g., "+", "-", "*", "÷").
 * @returns {string} - El resultado de la operación como una cadena, o una cadena vacía si los operandos son inválidos o la operación no es soportada.
 */
export function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Verificar si los operandos son números válidos
  if (isNaN(prev) || isNaN(current)) return "";

  // Objeto que contiene las operaciones matemáticas como funciones
  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "÷": (a, b) => a / b,
  };

  // Obtener la función correspondiente a la operación, o devolver cadena vacía si la operación no es válida
  const compute = operations[operation];
  if (!compute) return "";

  // Realizar la operación y devolver el resultado como cadena
  return compute(prev, current).toString();
}


/*export function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return "";
  }

  return computation.toString();
}
*/