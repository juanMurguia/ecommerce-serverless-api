import { Order } from "lib/models/order";

async function createNewOrder(productInfo, productID, userID) {
  const aditional_info = {
    items: [
      {
        id: productInfo.objectID,
        title: productInfo.name,
        description: productInfo.description,
        quantity: 1,
        currency_id: "ARS",
        unit_price: productInfo.price,
      },
    ],
    payer: {
      userID,
    },
    back_urls: {
      success: "https://test.com/success",
      pending: "https://test.com/pending",
      failure: "https://test.com/failure",
    },
    external_reference: productID,
    notification_url:
      "https://webhook.site/5f3d3c05-5c2c-4908-8000-6ef62a0b8584",
  };

  const { orderData, orderID } = await Order.createNewOrder({
    aditional_info,
    productID,
    userID,
  });

  return { aditional_info, orderData, orderID };
}

export { createNewOrder };
