const {
    messageConflict,
    messageRegister,
    messageCentralized,
    messageBadRequest,
    messageEditProfile,
    messageUnauthorized,
    messageForbidden,

} = require('./const')

const AuthorizeHandler = (status) => {
    if (status === 400) {
        return messageUnauthorized
    }
    if (status === 403) {
        return messageForbidden
    }
    if (status === 404) {
        return messageBadRequest
    }
    if (status === 409) {
        return messageConflict
    }
    if (status === 500) {
        return messageCentralized
    }
}

const RegisterHandler = (status) => {
    if (status === 400) {
        return messageRegister
    }
    if (status === 404) {
        return messageBadRequest
    }
    if (status === 409) {
        return messageConflict
    }
    if (status === 500) {
        return messageCentralized
    }
}

const EditProfileHandler = (status) => {
    if (status === 400) {
        return messageEditProfile
    }
    if (status === 409) {
        return messageConflict
    }
    if (status === 500) {
        return messageCentralized
    }
}

module.exports = {
    AuthorizeHandler,
    RegisterHandler,
    EditProfileHandler
}
