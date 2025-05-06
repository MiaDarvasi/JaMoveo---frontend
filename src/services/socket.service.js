import io from 'socket.io-client'
import { userService } from './user'

export const SOCKET_EVENT_START_LIVE = 'start-live-session'
export const SOCKET_EVENT_END_LIVE = 'end-live-session'
export const SOCKET_EMIT_SELECT_SONG = 'admin-select-song'
export const SOCKET_EMIT_END_SESSION = 'admin-end-session'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()

function createSocketService() {
  let socket = null

  const socketService = {
    setup() {
      socket = io(baseUrl)
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
    },
    on(eventName, cb) {
      socket?.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket?.emit(eventName, data)
    },
    login(userId) {
      socket?.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket?.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket?.disconnect()
      socket = null
    },

    adminSelectSong(song) {
      socket?.emit(SOCKET_EMIT_SELECT_SONG, song)
    },
    adminEndSession() {
      socket?.emit(SOCKET_EMIT_END_SESSION)
    },

    userWatch(userId) {
      socket?.emit(SOCKET_EMIT_USER_WATCH, userId)
    },
  }

  return socketService
}
