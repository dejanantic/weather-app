import { db, serverTimestamp, documentId } from '../firebase'

const citiesRef = db.collection("cities")

export async function getCitiesFromFirestore(userId) {
  return citiesRef
    .where("owner", "==", userId)
    .get()
}

// Fetch data
export async function saveCity(data) {
  const docRef = await citiesRef.add({
    name: data.name,
    coord: data.coord, // tk koordinate mi niti ne rabijo
    country: data.sys.country,
    cityId: data.id,
    owner: data.owner,
    created: serverTimestamp(),
  })

  // Not the most efficient way, but considering the app is not going to hit
  // rate limits, it is fine. Ideally I would provide my own UID for every
  // document.
  return docRef.update({
    docId: docRef.id,
  })
}

// TK DELETE THIS FUNCTION
// export async function updateCity(id, data) {
//   const docRef = await citiesRef.doc(id).update({
//     coord: data.coord,
//     country: data.country,
//     cityId: data.id
//   })
// }