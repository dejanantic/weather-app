import { db, serverTimestamp } from '../firebase'

const citiesRef = db.collection("cities")

export async function getCitiesFromFirestore(userId) {
  return citiesRef
    .where("owner", "==", userId)
    .get()
}

export function streamCities(userId, observer) {
  return citiesRef.where("owner", "==", userId).onSnapshot(observer);
}

export async function saveCity(data) {
  const docRef = await citiesRef.add({
    name: data.name,
    cityId: data.id,
    owner: data.owner,
    created: serverTimestamp(),
  })

  return docRef;
}

export function deleteCity(docId) {
  citiesRef.doc(docId).delete();
}