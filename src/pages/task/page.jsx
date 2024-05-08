// Importa el componente TaskCreator
import TaskCreator from "../../../components/TaskCreator";
import { createTask } from "../../../utils/utils";
import tasks from 'tasks.json';

// Define el componente funcional
const HomePage = () => {
  return (
    <div>
      <h1>Crear Tarea</h1>
      {/* Renderiza el componente TaskCreator */}
      <TaskCreator />
    </div>
  );
};

// Define la función getServerSideProps
export async function getServerSideProps() {
  try {
    console.log('\n\n\n---->LLLEGUEEEE\n\n\n\n')
    // Itera sobre las tareas y crea cada una
    for (const { id, title, description, created_at, finished_at } of tasks) {
      await createTask(id, title, description, created_at, finished_at);
    }
    
    // Retorna un objeto vacío si la creación de tareas es exitosa
    return { props: {} };
  } catch (error) {
    // Si ocurre un error, retorna un mensaje de error
    return { props: { error: error.message } };
  }
}

// Exporta el componente
export default HomePage;