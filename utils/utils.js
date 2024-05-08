export {};

import { ref, set } from "firebase/database";

export const colors = {
  "@": "rgba(55, 162, 126, 1)", // Verde
  "#": "rgba(118, 89, 200, 1)", // Morado
  link: "rgba(57, 137, 225, 1)", // Azul
  email: "rgba(218, 175, 97, 1)", // Rojo
  default: "rgba(0, 0, 0, 1)", // Negro
};

export function changeColor(word) {
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

export function lightenColor(color) {
  // Extraemos los componentes de color del string RGBA
  const matches = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/
  );

  // Si no hay coincidencias, devolvemos un color transparente
  if (!matches) {
    return "rgba(0, 0, 0, 0)";
  }

  // Extraemos los componentes de color y la opacidad del resultado
  const r = parseInt(matches[1], 10);
  const g = parseInt(matches[2], 10);
  const b = parseInt(matches[3], 10);

  // Construimos el string del color RGBA resultante con una opacidad del 9%
  return `rgba(${r}, ${g}, ${b}, 0.09)`;
}

// Ejemplo de uso
const text = "Hola @usuario, mira este #hashtag y visita www.google.com";
const colors2 = text.split(" ").map(changeColor);

console.log(colors2);

const color = "rgba(0, 128, 0, 1)";
console.log(lightenColor(color));

export const createTask = async (
  id,
  title,
  description,
  created_at,
  finished_at = null
) => {
  try {
    // Crea una referencia a la nueva tarea bajo el camino "/tasks/id"
    const taskRef = ref(db, `/tasks/${id}`);

    // Establece los datos para la nueva tarea
    await set(taskRef, { id, title, description, created_at, finished_at });

    // Retorna un mensaje de éxito
    return { success: true, message: "Task created successfully" };
  } catch (error) {
    // Registra y retorna un mensaje de error si ocurre algún error
    console.error("Error creating task:", error);
    return { success: false, message: "Error creating task" };
  }
};
