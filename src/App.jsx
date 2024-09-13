// src/App.jsx
import { useState, useEffect } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import { formatOperand } from "./utils/formatOperand";
import { evaluate } from "./utils/evaluate";
import "./index.css";

const STORAGE_KEY = "calculatorState";

/**
 * Componente principal de la calculadora. Maneja el estado de los operandos, 
 * las operaciones y la lógica de evaluación. También guarda y carga el estado desde 
 * localStorage utilizando hooks de React como useState y useEffect.
 * 
 * @component
 * @returns {JSX.Element} - La interfaz gráfica de la calculadora.
 */
function App() {
  // Estados individuales para la calculadora
  const [currentOperand, setCurrentOperand] = useState(""); // Estado para el operando actual
  const [previousOperand, setPreviousOperand] = useState(null); // Estado para el operando anterior
  const [operation, setOperation] = useState(null); // Estado para la operación seleccionada
  const [overwrite, setOverwrite] = useState(false); // Estado para determinar si se sobrescribe el operando actual

  /**
   * useEffect para cargar el estado de la calculadora desde localStorage al iniciar la aplicación.
   * Solo se ejecuta una vez cuando el componente se monta.
   */
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const { currentOperand, previousOperand, operation, overwrite } = JSON.parse(savedState);
      setCurrentOperand(currentOperand || "");
      setPreviousOperand(previousOperand || null);
      setOperation(operation || null);
      setOverwrite(overwrite || false);
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  /**
   * useEffect para guardar el estado actual en localStorage cada vez que alguno de los
   * estados principales cambia.
   */
  useEffect(() => {
    const stateToSave = {
      currentOperand,
      previousOperand,
      operation,
      overwrite,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [currentOperand, previousOperand, operation, overwrite]);

  /**
   * Maneja la adición de un dígito a la calculadora.
   * 
   * @param {string} digit - El dígito que se añade al operando actual.
   */
  const handleAddDigit = (digit) => {
    if (overwrite) {
      setCurrentOperand(digit);
      setOverwrite(false);
      return;
    }
    if (digit === "0" && currentOperand === "0") return;
    if (digit === "." && currentOperand.includes(".")) return;
    setCurrentOperand(`${currentOperand || ""}${digit}`);
  };

  /**
   * Maneja la selección de una operación matemática.
   * 
   * @param {string} operation - La operación seleccionada (e.g., "+", "-", "*", "÷").
   */
  const handleChooseOperation = (operation) => {
    if (currentOperand == null && previousOperand == null) return;

    if (currentOperand == null) {
      setOperation(operation);
      return;
    }

    if (previousOperand == null) {
      setOperation(operation);
      setPreviousOperand(currentOperand);
      setCurrentOperand(null);
      return;
    }

    const result = evaluate({
      currentOperand,
      previousOperand,
      operation,
    });
    setPreviousOperand(result);
    setOperation(operation);
    setCurrentOperand(null);
  };

  /**
   * Evalúa la expresión matemática actual y muestra el resultado.
   */
  const handleEvaluate = () => {
    if (
      operation == null ||
      currentOperand == null ||
      previousOperand == null
    ) {
      return;
    }

    const result = evaluate({
      currentOperand,
      previousOperand,
      operation,
    });
    setCurrentOperand(result);
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  /**
   * Elimina el último dígito ingresado en el operando actual.
   */
  const handleDeleteDigit = () => {
    if (overwrite) {
      setOverwrite(false);
      setCurrentOperand(null);
      return;
    }
    if (currentOperand == null) return;
    if (currentOperand.length === 1) {
      setCurrentOperand(null);
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  /**
   * Reinicia la calculadora, limpiando todos los operandos, operación seleccionada
   * y el estado almacenado en localStorage.
   */
  const handleClear = () => {
    setCurrentOperand("");
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(false);
    localStorage.removeItem(STORAGE_KEY); // Limpiar el estado guardado
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={handleClear}>
        AC
      </button>
      <button onClick={handleDeleteDigit}>DEL</button>
      <OperationButton operation="÷" onClick={handleChooseOperation} />
      <DigitButton digit="1" onClick={handleAddDigit} />
      <DigitButton digit="2" onClick={handleAddDigit} />
      <DigitButton digit="3" onClick={handleAddDigit} />
      <OperationButton operation="*" onClick={handleChooseOperation} />
      <DigitButton digit="4" onClick={handleAddDigit} />
      <DigitButton digit="5" onClick={handleAddDigit} />
      <DigitButton digit="6" onClick={handleAddDigit} />
      <OperationButton operation="+" onClick={handleChooseOperation} />
      <DigitButton digit="7" onClick={handleAddDigit} />
      <DigitButton digit="8" onClick={handleAddDigit} />
      <DigitButton digit="9" onClick={handleAddDigit} />
      <OperationButton operation="-" onClick={handleChooseOperation} />
      <DigitButton digit="." onClick={handleAddDigit} />
      <DigitButton digit="0" onClick={handleAddDigit} />
      <button className="span-two" onClick={handleEvaluate}>
        =
      </button>
    </div>
  );
}

export default App;
