// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'

// import { userService } from '../services/user'
// import { login } from '../store/actions/user.actions'

// export function Login() {
//     const [users, setUsers] = useState([])
//     const [credentials, setCredentials] = useState({ username: '' })
//     const [error, setError] = useState('')

//     const navigate = useNavigate()

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     async function loadUsers() {
//         try {
//             const users = await userService.getUsers()
//             setUsers(users)
//         } catch (err) {
//             setError('Failed to load users')
//             console.error('Error loading users:', err)
//         }
//     }

//     async function onLogin(ev) {
//         ev.preventDefault()

//         const user = users.find(user => user.username === credentials.username)

//         if (!user) {
//             setError('Invalid username')
//             return
//         }

//         try {
//             await login(user) // assuming login expects the full user object
//             navigate('/main')
//         } catch (err) {
//             setError('Login failed')
//             console.error('Login error:', err)
//         }
//     }

//     function handleChange(ev) {
//         const { name, value } = ev.target
//         setCredentials(prevCreds => ({ ...prevCreds, [name]: value }))
//     }

//     return (
//         <form className="login-form" onSubmit={onLogin}>
//             <h2>Login</h2>
//             <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={credentials.username}
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Login</button>
//             {error && <p className="error">{error}</p>}
//         </form>
//     )
// }



import { useState } from 'react'
import { useNavigate } from 'react-router'

import { login } from '../store/actions/user.actions'

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function onLogin(ev) {
        ev.preventDefault()

        try {
            await login(credentials) // send username & password
            navigate('/main')
        } catch (err) {
            setError('Invalid username or password')
            console.error('Login error:', err)
        }
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form className="login-form" onSubmit={onLogin}>
            <h2>Login</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}
