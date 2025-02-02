import { firestore } from "lib/firestore";

const collection = firestore.collection("users");

class User {
  ref: FirebaseFirestore.DocumentReference;
  data: FirebaseFirestore.DocumentData;
  constructor(id) {
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewUser(data) {
    const newDoc = await collection.add({
      email: data.email,
      userData: data.userData,
      address: data.address,
    });
    const docData = await newDoc.get();
    const userData = docData.data();
    const userEmail = userData.email;
    const userID = docData.id;
    return { userEmail, userID };
  }
  static async updateUser(body) {
    const result = await collection.where("email", "==", body.email).get();

    if (result.docs.length) {
      const firstDoc = result.docs[0];
      const docData = firstDoc.data();
      const docRef = firstDoc.ref;

      const data = {
        email: docData.email,
        userData: {
          nickname: body.userData.nickname
            ? body.userData.nickname
            : docData.userData.nickname,
          age: body.userData.age ? body.userData.age : docData.userData.age,
          weight: body.userData.weight
            ? body.userData.weight
            : docData.userData.weight,
          height: body.userData.height
            ? body.userData.height
            : docData.userData.height,
        },
        address: docData.address,
      };

      await docRef.update(data);
      const updatedDoc = await docRef.get();
      return updatedDoc.data();
    } else {
      null;
    }
  }
  static async updateAddress(body) {
    const result = await collection.where("email", "==", body.email).get();

    if (result.docs.length) {
      const firstDoc = result.docs[0];
      const docData = firstDoc.data();
      const docRef = firstDoc.ref;

      const data = {
        email: docData.email,
        userData: docData.userData,
        address: {
          city: body.address.city ? body.address.city : docData.address.city,
          street: body.address.street
            ? body.address.street
            : docData.address.street,
          number: body.address.number
            ? body.address.number
            : docData.address.number,
        },
      };

      await docRef.update(data);
      const updatedDoc = await docRef.get();
      return updatedDoc.data();
    } else {
      null;
    }
  }
}

export { User };
