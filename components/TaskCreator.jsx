// Importa las funciones necesarias de Firebase
import { ref, set } from "firebase/database";

// Importa la instancia de la base de datos
import db from '../lib/firebaseSingleton';

// import { createTask } from "../utils/utils";

// Define el componente funcional
const TaskCreator = ({ result }) => {
  // Lógica para crear una tarea
  const createTask = async () => {
    const id = 1;
    const title = "Hacer la compra";
    const description = "Comprar leche, huevos y pan.";
    const created_at = new Date().toISOString(); // Se establece la fecha actual
    const finished_at = null; // Opcional

    try {
      // Crea una nueva tarea utilizando la función createTask
      const response = await set(ref(db, `tasks/${id}`), {
        id,
        title,
        description,
        created_at,
        finished_at,
      });

      // Retorna el resultado de la operación
      return response;
    } catch (error) {
      // Si ocurre un error, retorna el mensaje de error
      return error.message;
    }
  };

  // Llama a la función createTask al montar el componente
  useEffect(() => {
    createTask();
  }, []);

  // Retorna el resultado
  return (
    <div>
      <p>Result: {result}</p>
    </div>
  );
};

// Exporta el componente
export default TaskCreator;
