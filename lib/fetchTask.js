import db from './firebaseSingleton';

const fetchTasks = async (path = "tasks") => {
  try {
    const snapshot = await onValue(ref(db, path), (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched tasks:", data);
    });

    return () => off(snapshot);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export { fetchTasks };