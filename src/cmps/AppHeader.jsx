import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<div className="logo">JaMoveo</div>

				{!user &&
					location.pathname !== '/' &&
					location.pathname !== '/signup' &&
					(
						<NavLink to="/" className="login-link">Login</NavLink>
					)}
				{user && (
					<div className="user-info">
						<p>{user.fullname}</p>
						<button onClick={onLogout}>Logout</button>
					</div>
				)}
			</nav>
		</header>
	)
}
