import PropTypes from "prop-types";

/**
 * OperationButton Component
 * Renderiza un botón que representa una operación en la calculadora. Al hacer clic en el botón,
 * llama a la función `onClick` pasada como prop con el valor de la operación como argumento.
 * 
 * @component
 * @param {Object} props - Propiedades que se pasan al componente.
 * @param {Function} props.onClick - Función que se ejecuta cuando el botón es clicado.
 * @param {string} props.operation - La operación que se representa en el botón (por ejemplo, "+", "-", "*", "÷").
 * @returns {JSX.Element} - El elemento JSX que representa el botón de operación.
 */
export default function OperationButton({ onClick, operation }) {
  return (
    <button onClick={() => onClick(operation)}>
      {operation}
    </button>
  );
}

OperationButton.propTypes = {
  /**
   * Función que se ejecuta cuando el botón es clicado.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * La operación que se muestra en el botón. Debe ser una cadena de texto, representando operaciones como "+", "-", "*", "÷".
   */
  operation: PropTypes.string.isRequired,
};
