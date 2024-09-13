## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

Para clonar este proyecto a tu máquina local, abre la terminal o el **Command Prompt** y ejecuta el siguiente comando:

```bash
git clone <URL_DEL_REPOSITORIO>
```


### 2. Moverse al directorio del proyecto

Una vez que hayas clonado el repositorio, navega al directorio del proyecto ejecutando este comando:

```bash
cd nombre-del-proyecto
```

### 3. Instalar dependencias

Este proyecto utiliza **npm** para gestionar sus dependencias. Si no tienes `npm` instalado, deberás instalar **Node.js** que incluye `npm`. Una vez instalado, ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

Este comando instalará todas las bibliotecas y módulos necesarios para que el proyecto funcione, como **React**, **Vite** y otras dependencias definidas en el archivo `package.json`.

### 4. Ejecutar el proyecto en modo de desarrollo

Para correr el proyecto localmente en tu navegador, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de **Vite**, y podrás ver la aplicación en funcionamiento abriendo tu navegador dando click en ek enlace que aparece al ejecutar el comando

### 7. Scripts adicionales

En el archivo `package.json` encontrarás scripts adicionales que puedes usar para tareas específicas. Algunos ejemplos incluyen:

- `npm run lint`: Para verificar errores de estilo o sintaxis utilizando **ESLint**.
- `npm run build`: Para compilar el proyecto para producción.

---

### Requisitos del sistema:

- **Node.js**: v14 o superior
- **npm**: v6 o superior
- Un navegador moderno (Google Chrome, Firefox, etc.)

---


### 1. **Introducción a los estados (`useState`) en React**
   - En la aplicación, usamos `useState` para manejar los diferentes aspectos de la calculadora: el número que el usuario está escribiendo (`currentOperand`), el número anterior que se usó en la operación (`previousOperand`), la operación en curso (`operation`) y un estado especial (`overwrite`) que indica si debemos sobrescribir el número actual después de calcular un resultado.

   **Ejemplo de `useState`:**
   ```javascript
   const [currentOperand, setCurrentOperand] = useState("");
   const [previousOperand, setPreviousOperand] = useState(null);
   const [operation, setOperation] = useState(null);
   const [overwrite, setOverwrite] = useState(false);
   ```

   **Explicación**:
   - `useState` nos permite tener variables "reactivas", es decir, que cuando cambian, React vuelve a renderizar la UI. Aquí tenemos varias variables (operandos, operación) que representan el estado de la calculadora en tiempo real.

---

### 2. **Uso de `useEffect` para sincronizar el estado con `localStorage`**
   - **¿Qué es `useEffect`?**
     `useEffect` es un hook que te permite realizar efectos secundarios en componentes de React, como interactuar con APIs, suscribirse a servicios o en este caso, interactuar con `localStorage` para guardar y restaurar el estado de la calculadora.

   - **Primer `useEffect`: Restaurar el estado desde `localStorage`**
     Este efecto se ejecuta una sola vez, cuando el componente se monta (al principio). Verifica si hay un estado guardado en `localStorage` (por ejemplo, después de cerrar el navegador) y si lo encuentra, carga ese estado en la calculadora.

     ```javascript
     useEffect(() => {
       const savedState = localStorage.getItem(STORAGE_KEY);
       if (savedState) {
         const { currentOperand, previousOperand, operation, overwrite } = JSON.parse(savedState);
         setCurrentOperand(currentOperand || "");
         setPreviousOperand(previousOperand || null);
         setOperation(operation || null);
         setOverwrite(overwrite || false);
       }
     }, []);  // [] significa que solo se ejecuta una vez cuando el componente se monta
     ```

     **Explicación**:
     - Esto es útil para mantener la sesión del usuario. Si el usuario cierra y luego abre la aplicación, no perderá el estado de la calculadora.

   - **Segundo `useEffect`: Guardar el estado en `localStorage` cada vez que cambia**
     Cada vez que uno de los valores del estado de la calculadora cambia (`currentOperand`, `previousOperand`, `operation`, `overwrite`), este `useEffect` se asegura de que el nuevo estado se guarde en `localStorage`.

     ```javascript
     useEffect(() => {
       const stateToSave = {
         currentOperand,
         previousOperand,
         operation,
         overwrite,
       };
       localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
     }, [currentOperand, previousOperand, operation, overwrite]); // Se ejecuta cada vez que alguno de estos valores cambia
     ```

     **Explicación**:
     - Esto asegura que cada vez que el usuario interactúa con la calculadora (añade dígitos, elige una operación, etc.), el estado se guarda automáticamente, para que nunca se pierda.

---

### 3. **Funciones que manejan la lógica de la calculadora**

   - **Agregar dígito (`handleAddDigit`)**:
     Esta función maneja la adición de un dígito. Si se ha calculado un resultado y el siguiente dígito es el primero que se escribe, sobrescribe el resultado con el nuevo dígito.

     ```javascript
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
     ```

     **Explicación**:
     - Controlamos casos especiales, como evitar que se agreguen múltiples ceros al principio o más de un punto decimal.

   - **Elegir operación (`handleChooseOperation`)**:
     Aquí manejamos el flujo de la calculadora cuando se selecciona una operación matemática (+, -, *, ÷). Si ya hay un operando y una operación anterior, realiza el cálculo antes de actualizar la operación seleccionada.

     ```javascript
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
     ```

     **Explicación**:
     - Aquí controlamos que siempre haya un número y una operación listos para poder hacer un cálculo. Si hay un resultado previo, lo usamos para el siguiente cálculo.

   - **Evaluar (`handleEvaluate`)**:
     Esta función se encarga de calcular el resultado de la operación seleccionada entre `previousOperand` y `currentOperand`.

     ```javascript
     const handleEvaluate = () => {
       if (operation == null || currentOperand == null || previousOperand == null) return;

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
     ```

     **Explicación**:
     - Después de realizar el cálculo, se muestra el resultado en `currentOperand`, y usamos el estado `overwrite` para indicar que el siguiente número que se escriba sobrescribirá el resultado.

   - **Eliminar dígito (`handleDeleteDigit`)**:
     Permite borrar el último dígito que fue ingresado. Si el resultado es de un cálculo previo, el estado se resetea antes de borrar.

     ```javascript
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
     ```

   - **Limpiar (`handleClear`)**:
     Esta función reinicia la calculadora y elimina cualquier dato guardado en `localStorage`.

     ```javascript
     const handleClear = () => {
       setCurrentOperand("");
       setPreviousOperand(null);
       setOperation(null);
       setOverwrite(false);
       localStorage.removeItem(STORAGE_KEY);
     };
     ```

---

### 4. **Componentes reutilizables**
   - **`DigitButton` y `OperationButton`** son componentes que aceptan como prop una función (`onClick`) para manejar la adición de dígitos y la selección de operaciones.
   - Esto simplifica el código y lo hace más modular, permitiendo que cada botón se comporte de la misma manera y responda a los clics del usuario.

---

### 5. **Formato de operandos (`formatOperand`)**:
   El archivo `formatOperand` se encarga de formatear los números grandes para que sean más legibles. Usa la clase `Intl.NumberFormat` para dar formato con comas y puntos decimales.

---

### 6. **Estilos (`index.css`)**:
   - La calculadora se organiza usando **CSS Grid**, lo que permite crear una cuadrícula para organizar los botones de manera automática. Los estilos son simples y modernos para proporcionar una interfaz fácil de usar.

---

### Resumen final
Este código demuestra cómo manejar el estado de la aplicación (usando `useState`), cómo realizar efectos secundarios (usando `useEffect`) y cómo guardar datos localmente en el navegador (`localStorage`). Esto hace que la aplicación sea más robusta, manteniendo el estado entre sesiones y ofreciendo una experiencia de usuario fluida.