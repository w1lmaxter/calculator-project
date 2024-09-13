import PropTypes from "prop-types";

/**
 * DigitButton Component
 * Renderiza un botón que representa un dígito en la calculadora. Al hacer clic en el botón,
 * llama a la función `onClick` pasada como prop con el valor del dígito como argumento.
 * 
 * @component
 * @param {Object} props - Propiedades que se pasan al componente.
 * @param {Function} props.onClick - Función que se ejecuta cuando el botón es clicado.
 * @param {string} props.digit - El dígito que se representa en el botón.
 * @returns {JSX.Element} - El elemento JSX que representa el botón.
 */
export default function DigitButton({ onClick, digit }) {
  return (
    <button onClick={() => onClick(digit)}>
      {digit}
    </button>
  );
}

DigitButton.propTypes = {
  /**
   * Función que se ejecuta cuando el botón es clicado.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * El dígito que se muestra en el botón. Debe ser una cadena de texto.
   */
  digit: PropTypes.string.isRequired,
};
