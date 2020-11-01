import fs from "fs";
import path from "path";
import Debug from "debug";
import { fileURLToPath } from "url";

const debug = Debug("secrets");

const secrets = {};

secrets.read = function read(secretName) {
  try {
    if (process.env.NODE_ENV === "development") {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      return fs.readFileSync(
        path.join(__dirname, "..", "..", "..", "secrets", secretName),
        "utf-8"
      );
    } else {
      return fs.readFileSync(`/run/secrets/${secretName}`, "utf8");
    }
  } catch (err) {
    if (err.code !== "ENOENT") {
      debug(
        `An error occurred while trying to read the secret: ${secretName}. Err: ${err}`
      );
    } else {
      debug(
        `Could not find the secret, probably not running in swarm mode: ${secretName}. Err: ${err}`
      );
    }
    return false;
  }
};

export default secrets;
