import { ref, set, remove, update, get } from "firebase/database";
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
 * The isValidLink function checks if a given word is a valid URL link starting with "http://" or
 * "https://" or "www.".
 * @param word - The `isValidLink` function checks if the given `word` is a valid link. It uses regular
 * expressions to match patterns of URLs starting with `http://` or `https://` followed by
 * non-whitespace characters, or URLs starting with `www.` followed by non-whitespace characters.
 * @returns The `isValidLink` function is being returned. It checks if the input `word` contains a
 * valid URL starting with `http://`, `https://`, or `www.`.
 */
export const isValidLink = (word) => {
  return /\bhttps?:\/\/\S+\b/.test(word) || /\bwww\.\S+\b/.test(word);
};

/**
 * The isValidEmail function checks if a given word is a valid email address.
 * @param word - The `isValidEmail` function takes a string `word` as a parameter and checks if it is a
 * valid email address format. It uses a regular expression to validate the email format.
 * @returns The function `isValidEmail` is being returned. It takes a string input `word` and checks if
 * it matches the pattern of a valid email address using a regular expression. The function returns a
 * boolean value indicating whether the input string is a valid email address or not.
 */
export const isValidEmail = (word) => {
  return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(word);
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
  } else if (isValidLink(word)) {
    return colors["link"];
  } else if (isValidEmail(word)) {
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
  return arr.find((obj) => obj.id === idToFind);
}

/**
 * The function getCurrentDateTimeAsString returns the current date and time in a formatted string.
 * @returns The `getCurrentDateTimeAsString` function returns the current date and time as a formatted
 * string in the following format: "YYYY-MM-DD HH:MM:SS" (year-month-day hours:minutes:seconds).
 */
export function getCurrentDateTimeAsString() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

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
    titleTask !== "0" &&
    titleTask !== ""
  );
}

/**
 * The function `getTasks` asynchronously retrieves tasks data from a Firebase Realtime Database and
 * sets the task list with the retrieved data.
 */
export const getTasks = async () => {
  try {
    const snapshot = await get(ref(db, "/tasks"));
    const tasksData = snapshot.val();
    if (tasksData) {
      const tasksArray = Object.values(tasksData);
      return tasksArray;
    }
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
  }
};


/**
 * The function `refreshAfter` reloads the current page after a specified number of milliseconds.
 * @param miliseconds - The `refreshAfter` function takes a parameter `miliseconds`, which represents
 * the time in milliseconds after which the page will be reloaded.
 */
export const refreshAfter = (miliseconds) => {
  setTimeout(() => {
    location.reload();
  }, miliseconds);
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
    await refreshAfter(3000);
  } else {
    // console.log("Task title is empty. Please enter a title.");
  }
};

/**
 * The `editTask` function updates the title of a task in a database and logs a success message.
 * @param taskId - The `taskId` parameter is the unique identifier of the task that you want to edit.
 * It is used to locate the specific task in the database and update its title.
 * @param newTitle - The `newTitle` parameter in the `editTask` function represents the updated title
 * that you want to set for a specific task identified by `taskId`. This function updates the title of
 * the task in the database to the new title provided.
 */
export const editTask = async (taskId, newTitle) => {
  try {
    if (db) {
      const taskRef = ref(db, `/tasks/${taskId}`);
      await update(taskRef, { title: newTitle });
      await refreshAfter(3000);
    }
  } catch (error) {
    console.error("Error editing task:", error);
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
      await refreshAfter(3000);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// export const counters = { emailCount: undefined, linkCount: undefined };

// export const counterSingleton = (() => {
//   const counters = {
//     emailCount: 0,
//     linkCount: 0
//   };

//   const getInstance = () => {
//     if (counters.emailCount === undefined) {
//       counters.emailCount = 0;
//     }
//     if (counters.linkCount === undefined) {
//       counters.linkCount = 0;
//     }

//     return {
//       getCounters: (word) => (
//         isValidLink(word) ? counters.linkCount : isValidEmail(word) ? counters.emailCount : null
//       ),
//       incrementCounter: (word) => {
//         isValidLink(word) ? counters.linkCount++ : isValidEmail(word) ? counters.emailCount++ : null;
//       },
//       resetCounters: () => {
//         counters.linkCount = 0;
//         counters.emailCount = 0;
//         return { link: counters.linkCount, email: counters.emailCount };
//       },
//     };
//   };

//   return getInstance();
// })();

// export const countWords = (words) => {
//   const wordCounts = [];

//   // let emailCount = 0;
//   // let linkCount = 0;

//   for (const word of words) {
//     // const color = changeColor(word);

//     if (isValidEmail(word)) {
//       emailCount = counterSingleton.incrementCounter("email");
//     } else if (isValidLink(word)) {
//       linkCount = counterSingleton.incrementCounter("link");
//     }

//     const wordCount = isValidLink(word)
//       ? counterSingleton.getCounters("link")
//       : isValidEmail(word)
//       ? counterSingleton.getCounters("email")
//       : null;

//     wordCounts.push([word, wordCount]);
//   }

//   console.log(`Total email count: ${emailCount}`);
//   console.log(`Total link count: ${linkCount}`);

//   return wordCounts;
// };

const updateEmailCounter = () => {
  const storedEmailCounter = localStorage.getItem("emailCounter");

  if (storedEmailCounter === null) {
    localStorage.setItem("emailCounter", parseInt(1));
    return 1;
  } else {
    const newEmailCounter = parseInt(storedEmailCounter) + 1;
    localStorage.setItem("emailCounter", newEmailCounter);
    return newEmailCounter;
  }
};

const updateLinkCounter = () => {
  const storedLinkCounter = localStorage.getItem("linkCounter");

  if (storedLinkCounter === null) {
    localStorage.setItem("linkCounter", parseInt(1));
    return 1;
  } else {
    const newLinkCounter = parseInt(storedLinkCounter) + 1;
    localStorage.setItem("linkCounter", newLinkCounter);
    // console.log("newLinkCounter", newLinkCounter);
    return newLinkCounter;
  }
};

export const getWordCounters = (words) => {
  // const counters = counterSingleton.getCounters();
  // console.log("counters", counters);
  return words.map((word) => {
    if (isValidLink(word)) {
      return [word, updateLinkCounter()];
    } else if (isValidEmail(word)) {
      return [word, updateEmailCounter()];
    } else {
      return [word, null];
    }
  });
};

// Ejemplo de uso
const words = [
  "asdhasd@dsdfs.com",
  "https://www.asd.com",
  "www.google.com",
  "asdhasd@dsdfs.com",
  "#prueba",
  "asd34hasd@dsdfs.com",
];

// if (
//   localStorage.getItem("linkCounter") === null &&
//   localStorage.getItem("emailCounter") === null
// ) {
//   const wordCounters = getWordCounters(words);
//   console.log("wordCounters", wordCounters);
// }

// const getWordCountersSingleton = () => {
//   const initializeCounters = () => {
//     if (
//       localStorage.getItem("linkCounter") === null &&
//       localStorage.getItem("emailCounter") === null
//     ) {
//       const wordCounters = getWordCounters(words);
//       localStorage.setItem(
//         "linkCounter",
//         wordCounters
//           .filter(
//             ([_, counter]) =>
//               counter !== null && typeof counter === "number" && !isNaN(counter)
//           )
//           .reduce(
//             (acc, [word, counter]) =>
//               word.toLowerCase() === "link" ? acc + counter : acc,
//             0
//           )
//       );
//       localStorage.setItem(
//         "emailCounter",
//         wordCounters
//           .filter(
//             ([_, counter]) =>
//               counter !== null && typeof counter === "number" && !isNaN(counter)
//           )
//           .reduce(
//             (acc, [word, counter]) =>
//               word.toLowerCase() === "mail" ? acc + counter : acc,
//             0
//           )
//       );
//     }
//   };

//   initializeCounters();

//   return {
//     getStoredWordCounters: () => ({
//       email: parseInt(localStorage.getItem("emailCounter")) || 0,
//       link: parseInt(localStorage.getItem("linkCounter")) || 0,
//     }),
//   };
// };

// // Ejemplo de uso
// const wordCounters = getWordCountersSingleton().getStoredWordCounters();
// console.log(wordCounters); // { email: 2, link: 3 }
