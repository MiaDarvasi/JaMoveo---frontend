import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id }) {
    const user = await storageService.get('user', _id)
    await storageService.put('user', user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.fullname === userCred.fullname)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        fullname: user.fullname, 
        instrument: user.instrument, 
        username: user.username, 
        password: user.password, 
        isAdmin: user.isAdmin 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        fullname: 'admin',
        instrument: 'admin',
        username: 'admin',
        password: 'admin',
        isAdmin: true
    }

    const newUser = await storageService.post('user', user)
    console.log('newUser: ', newUser)
}