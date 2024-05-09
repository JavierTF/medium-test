import db from './firebaseSingleton';

const fetchTasks = async (path = "tasks") => {
  try {
    const snapshot = await onValue(ref(db, path), (snapshot) => {
      const data = snapshot.val();
      // Handle retrieved data (e.g., update state)
      console.log("Fetched tasks:", data);
    });

    // Return a cleanup function to detach the listener when needed
    return () => off(snapshot);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export { fetchTasks };