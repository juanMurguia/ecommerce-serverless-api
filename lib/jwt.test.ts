import { generate, verify } from "./jwt";

import test from "ava";

test("jwt encode-decode", (t) => {
  const payload = { juan: true };
  const token = generate(payload);
  const salida = verify(token);

  t.deepEqual(salida, payload);
});
