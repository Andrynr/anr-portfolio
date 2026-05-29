import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { db } from "./firebase.js";

export const trackVisit = async () => {
  if (!sessionStorage.getItem("visited")) {
    try {
      await addDoc(collection(db, "visits"), {
        page: window.location.pathname,
        time: new Date().toISOString(),
        // time: serverTimestamp(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: crypto.randomUUID(),
      });

      sessionStorage.setItem("visited", "true");

      console.log("Visit saved");
    } catch (error) {
      console.log(error);
    }
  }
};

export const getVisits = async () => {
  const q = query(collection(db, "visits"), orderBy("time", "desc"));

  const querySnapshot = await getDocs(q);

  const visits = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return visits;
};
