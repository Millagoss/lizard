import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getAllDocuments(collectionName: string): Promise<{
  results: { id: string; name: string; email: string }[]; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
}> {
  const collectionRef = collection(db, collectionName);

  let results: { id: string; name: string; email: string }[] = []; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let error: any | null = null;

  try {
    const querySnapshot = await getDocs(collectionRef);
    results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
    })); //added id to the results
  } catch (e) {
    error = e;
    console.error("Error fetching documents:", e);
  }

  return { results, error };
}
