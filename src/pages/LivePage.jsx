// import { useLocation, useNavigate } from 'react-router-dom'

// export function LivePage() {
//     const location = useLocation()
//     const navigate = useNavigate()
//     const song = location.state?.song

//     if (!song) return <p>No song selected.</p>

//     function handleEndSession() {
//         navigate('/main')
//     }

//     return (
//         <section className="live-page">
//             <h1>Now Playing</h1>
//             <h2>{song.name}</h2>
//             <p>by {song.artist}</p>
//             <p>{song.lyrics}</p>
//             <button onClick={handleEndSession}>End Session</button>
//         </section>
//     )
// }


import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { userService } from '../services/user'
import { socketService, SOCKET_EVENT_END_LIVE } from '../services/socket.service'

export function LivePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const song = location.state?.song
    const user = userService.getLoggedinUser()

    useEffect(() => {
        // All users listen to "end-live-session"
        const onEndSession = () => {
            navigate('/main')
        }

        socketService.on(SOCKET_EVENT_END_LIVE, onEndSession)

        return () => {
            socketService.off(SOCKET_EVENT_END_LIVE, onEndSession)
        }
    }, [navigate])

    if (!song) return <p>No song selected.</p>

    function handleEndSession() {
        // Only admin should be able to trigger this
        socketService.emit(SOCKET_EVENT_END_LIVE)
        navigate('/main')
    }

    return (
        <section className="live-page">
            <h1>Now Playing</h1>
            <h2>{song.name}</h2>
            <p>by {song.artist}</p>
            <p>{song.lyrics}</p>

            {user?.isAdmin && (
                <button onClick={handleEndSession}>End Session</button>
            )}
        </section>
    )
}
