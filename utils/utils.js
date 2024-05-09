import { ref, set, remove } from "firebase/database";
import db from "../lib/firebaseSingleton";

/* The `export const colors` object is defining a set of color values associated with specific types of
words or elements. Each key in the object represents a type of word or element, and the
corresponding value is the color in RGBA format assigned to that type. */
export const colors = {
  "@": "rgba(55, 162, 126, 1)", // Verde
  "#": "rgba(118, 89, 200, 1)", // Morado
  link: "rgba(57, 137, 225, 1)", // Azul
  email: "rgba(218, 175, 97, 1)", // Rojo
  default: "rgba(0, 0, 0, 1)", // Negro
};

/**
 * The function `changeColor` takes a word as input and returns a color based on certain conditions
 * such as starting with '@', '#', being a link, an email, or default color.
 * @param word - The `changeColor` function takes a word as input and checks if the word matches
 * certain patterns to determine the color to assign to it. The function checks if the word starts with
 * "@" or "#", if it is a URL or a website link, if it is an email address, or if none
 * @returns a color based on the type of input word. If the word starts with "@" symbol, it returns the
 * color associated with "@". If the word starts with "#" symbol, it returns the color associated with
 * "#". If the word is a URL or a website link, it returns the color associated with "link". If the
 * word is an email address, it returns the color associated with
 */
export function changeColor(word) {
  word = word.toLowerCase();
  if (word.startsWith("@")) {
    return colors["@"];
  } else if (word.startsWith("#")) {
    return colors["#"];
  } else if (/\bhttps?:\/\/\S+\b/.test(word) || /\bwww\.\S+\b/.test(word)) {
    return colors["link"];
  } else if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(word)) {
    return colors["email"];
  } else {
    return colors["default"];
  }
}

/**
 * The function `lightenColor` takes a color in RGBA format and returns a slightly lighter version of
 * the color with reduced opacity.
 * @param color - The `lightenColor` function takes a color value in RGBA format as input and returns a
 * new RGBA color with reduced opacity. If the input color is not in the correct format, it returns a
 * transparent black color.
 * @returns The function `lightenColor` takes a color in RGBA format as input, extracts the RGB values,
 * and returns a new RGBA color with the same RGB values but with an alpha value of 0.09. If the input
 * color does not match the expected format, it returns "rgba(0, 0, 0, 0)".
 */
export function lightenColor(color) {
  const matches = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/
  );

  if (!matches) {
    return "rgba(0, 0, 0, 0)";
  }

  const r = parseInt(matches[1], 10);
  const g = parseInt(matches[2], 10);
  const b = parseInt(matches[3], 10);

  return `rgba(${r}, ${g}, ${b}, 0.09)`;
}

/**
 * The function findById takes an array and an id to find, then returns the object in the array with
 * the matching id.
 * @param arr - An array of objects.
 * @param idToFind - The `idToFind` parameter is the ID value that you want to search for within the
 * array of objects (`arr`). The `findById` function will search for an object in the array that has
 * the specified ID value and return that object if found.
 * @returns The `findById` function is returning an object from the `arr` array that has an `id`
 * property matching the `idToFind` parameter.
 */
export function findById(arr, idToFind) {
  return arr.find(obj => obj.id === idToFind);
}

/**
 * The function getCurrentDateTimeAsString returns the current date and time in a formatted string.
 * @returns The `getCurrentDateTimeAsString` function returns the current date and time as a formatted
 * string in the following format: "YYYY-MM-DD HH:MM:SS" (year-month-day hours:minutes:seconds).
 */
export function getCurrentDateTimeAsString() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // El mes está basado en 0, por eso sumamos 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

/**
 * The function `isValidTitle` checks if a given title task is valid by ensuring it is not undefined,
 * null, an array, '0', or an empty string.
 * @param titleTask - The `isValidTitle` function checks if the `titleTask` meets certain conditions to
 * be considered valid. The conditions are:
 * @returns The function `isValidTitle` returns a boolean value indicating whether the `titleTask`
 * parameter is a valid title.
 */
export function isValidTitle(titleTask) {
  return (
    titleTask !== undefined &&
    titleTask !== null &&
    !Array.isArray(titleTask) &&
    titleTask !== '0' &&
    titleTask !== ''
  );
}

/**
 * The function `createTask` creates a new task in a database if a title is provided, otherwise it logs
 * an error message.
 * @param gContext - `gContext` is an object containing the context or state of the application. In
 * this function, it is used to access the `titleTask` property which presumably holds the title of the
 * task to be created.
 * @param db - The `db` parameter in the `createTask` function is likely a reference to a database
 * instance or connection that is used to interact with a database. This parameter is used to perform
 * database operations such as creating a new task entry in the database.
 */
export const createTask = async (gContext) => {
  if (gContext.titleTask) {
    const task = {
      id: getCurrentDateTimeAsString(),
      title: gContext.titleTask,
      created_at: new Date(),
      finished_at: null,
    };

    const taskRef = await ref(db, "/tasks/" + task.id);
    await set(taskRef, { ...task });
  } else {
    console.log("Task title is empty. Please enter a title.");
    // You can optionally set an error state or display an error message here
  }
};

export const editTask = async (taskId, newTitle) => {
  try {
    if (db) {
      const taskRef = ref(db, `/tasks/${taskId}`);
      await update(taskRef, { title: newTitle }); // Update only the title

      console.log("Task edited successfully");

      // Update your UI to reflect the edited task
    }
  } catch (error) {
    console.error("Error editing task:", error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
};

/**
 * The function `deleteTask` deletes a task from a database and displays a confirmation message using
 * `alert()`.
 * @param taskId - The `taskId` parameter in the `deleteTask` function is the unique identifier of the
 * task that needs to be deleted from the database. It is used to locate the specific task in the
 * database and remove it from the tasks collection.
 */
export const deleteTask = async (taskId) => {
  try {
    if (db) {
      const taskRef = ref(db, `/tasks/${taskId}`);
      await remove(taskRef);

      console.log("Task deleted successfully");

      // confirmation with alert()
      alert('The task has been deleted successfully')
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Ejemplo de uso
// const text = "Hola @usuario, mira este #hashtag y visita www.google.com";
// const colors2 = text.split(" ").map(changeColor);

// console.log(colors2);

// const color = "rgba(0, 128, 0, 1)";
// console.log(lightenColor(color));

// export const createTask = async (
//   id,
//   title,
//   description,
//   created_at,
//   finished_at = null
// ) => {
//   try {
//     // Crea una referencia a la nueva tarea bajo el camino "/tasks/id"
//     const taskRef = ref(db, `/tasks/${id}`);

//     // Establece los datos para la nueva tarea
//     await set(taskRef, { id, title, description, created_at, finished_at });

//     // Retorna un mensaje de éxito
//     return { success: true, message: "Task created successfully" };
//   } catch (error) {
//     // Registra y retorna un mensaje de error si ocurre algún error
//     console.error("Error creating task:", error);
//     return { success: false, message: "Error creating task" };
//   }
// };
