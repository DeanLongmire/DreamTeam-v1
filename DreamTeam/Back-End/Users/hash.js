const { createHash } = require('crypto')

const salt = "hyt68998#@ba" //DO NOT CHANGE EVER, EVERYONE WOULD HAVE TO RESET PASSWORD

//hashes the password passed as 'data'
const hash_data = (data) => {
  let hashed_data = createHash("sha256")
    .update(data)
    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex")
  return hashed_data;
};

module.exports = { hash_data }