import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/actions/user.actions'
import { userService } from '../services/user'


export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        } catch (err) {
            setError('Failed to load users')
            console.error('Error loading users:', err)
        }
    }

    function clearState() {
        setCredentials({ instrument: '', password: '', fullname: '', username: '' })
        setError('')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        
        if (!credentials.instrument || !credentials.password || !credentials.fullname || !credentials.username) {
            setError('Please fill in all fields')
            return
        }

        const isUsernameTaken = users.some(user => user.username === credentials.username)
        if (isUsernameTaken) {
            setError('Username already taken')
            return
        }

        try {
            await signup(credentials)
            clearState()
            navigate('/main')
        } catch (err) {
            setError('Signup failed')
            console.error('Signup error:', err)
        }
    }

    return (
        <>
        <form className="signup-form" onSubmit={onSignup}>
            <h2>Signup</h2>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Full Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="instrument"
                value={credentials.instrument}
                placeholder="Instrument / Singer"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button type="submit">Signup</button>
            {error && <p className="error">{error}</p>}
        </form>
        </>
    )
}
