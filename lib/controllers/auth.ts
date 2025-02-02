import { User } from "lib/users";
import { Auth } from "lib/auth";
import gen from "random-seed";
import { addMinutes } from "date-fns/addMinutes";
var seed = "asasdasd";
var random = gen.create(seed);

export async function findOrCreateAuth(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);

  if (auth) {
    console.log(auth);
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });

    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });

    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;

  await auth.push();
  console.log("email enviado a" + email + "con codigo " + auth.data.code);
  return true;
}
