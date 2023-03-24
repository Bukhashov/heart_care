const bcrypt = require("bcrypt")

const Hash = async (password, salt) => {
    let newHash = await bcrypt.hash(password, salt);
    return newHash;
}

const Compare = async (password, hash) => {
    let res = await bcrypt.compare(password, hash);
    return res;
}

module.exports = { Hash, Compare };