import {
  MercadoPagoConfig,
  MerchantOrder,
  Payment,
  Preference,
} from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

const preference = new Preference(client);

export async function createPreference(body) {
  return preference.create({ body });
}

export async function getMerchantOrder(merchantOrderID) {
  const merchantOrder = new MerchantOrder(client);
  return merchantOrder.get(merchantOrderID);
}

export async function getPayment(paymentID) {
  const payment = new Payment(client);
  return payment.get(paymentID);
}
