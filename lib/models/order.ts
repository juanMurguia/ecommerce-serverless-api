import { firestore } from "lib/firestore";

const collection = firestore.collection("orders");

class Order {
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
  static async createNewOrder(newOrderData) {
    const newDoc = await collection.add(newOrderData);
    const docData = await newDoc.get();
    const orderData = docData.data();
    const orderID = docData.id;

    return { orderData, orderID };
  }
}

export { Order };
