const { createHash } = require('crypto')

const salt = "hyt68998#@ba"

const hash_data = (data) => {
  let hashed_data = createHash("sha256")
    .update(data)
    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex")
  return hashed_data;
};

module.exports = { hash_data }