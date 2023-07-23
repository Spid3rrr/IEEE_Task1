const { validate: uuidValidate } = require('uuid');

const uuidValidator = (req, res, next) => {
    if (!uuidValidate(req.params.uuid)) {
        return res.status(400).json({ message: "Invalid UUID" });
    }
    next();
}

module.exports = uuidValidator;