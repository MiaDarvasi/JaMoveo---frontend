import { httpService } from '../http.service'

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
    try {
        const users = await httpService.get('users')
        return users
    } catch (err) {
        console.error('Failed to get users:', err)
        throw err
    }
}

async function getById(userId) {
	try {
		return await httpService.get(`users/${userId}`)
	} catch (err) {
		console.error(`Failed to get user with ID ${userId}:`, err)
		throw err
	}
}

async function remove(userId) {
	try {
		return await httpService.delete(`user/${userId}`)
	} catch (err) {
		console.error(`Failed to delete user with ID ${userId}:`, err)
		throw err
	}
}

async function update(user) {
	try {
		const updatedUser = await httpService.put(`users/${user._id}`, user)

		const loggedinUser = getLoggedinUser()
		if (loggedinUser?._id === updatedUser._id) saveLoggedinUser(updatedUser)

		return updatedUser
	} catch (err) {
		console.error(`Failed to update user with ID ${user._id}:`, err)
		throw err
	}
}

async function login(userCred) {
	try {
		const user = await httpService.post('auth/login', userCred)		
		return saveLoggedinUser(user)
	} catch (err) {
		console.error('Login failed:', err)
		throw err
	}
}

// async function signup(userCred) {
//     try {
//         const userToSend = { ...userCred, isAdmin: false }
//         const user = await httpService.post('auth/signup', userToSend)
//         return saveLoggedinUser(user)
//     } catch (err) {
//         console.error('Signup failed:', err)
//         throw err
//     }
// }

async function signup(userCred) {
    try {
        const userToSend = { ...userCred }

        if (typeof userToSend.isAdmin !== 'boolean') {
            userToSend.isAdmin = false
        }

        const user = await httpService.post('auth/signup', userToSend)
        return saveLoggedinUser(user)
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}



async function logout() {
	try {
		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
		return await httpService.post('auth/logout')
	} catch (err) {
		console.error('Logout failed:', err)
		throw err
	}
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
		isAdmin: user.isAdmin,
	}
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}
