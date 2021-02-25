import { db, serverTimestamp } from '../firebase'
import { useAuth } from "../contexts/AuthContext"

export async function getCitiesFromFirestore(userId) {
  return db.collection("cities")
    .where("owner", "==", userId)
    .get()
}