import crypto from "crypto";

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString("hex").normalize());
    });
  });
}

// Generate a random salt
export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}
