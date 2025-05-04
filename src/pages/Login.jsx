import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { login } from '../store/actions/user.actions'

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    async function onLogin(ev) {
        ev.preventDefault()

        if (credentials.username === 'admin' && location.pathname !== '/login/admin') {
            setError('Use admin page to log in as admin.')
            return
        }

        try {
            await login(credentials)
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
