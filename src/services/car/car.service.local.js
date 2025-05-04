
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { songList } from '../../data/songData'

const STORAGE_KEY = 'song'

export const songService = {
    query,
    getById,
    save,
    remove,
    addsongMsg
}
window.cs = songService


async function query(filterBy = { name: '', artist: '' }) {
    var songs = songList
    const { name, artist } = filterBy

    if (name || artist) {
        const regex = new RegExp(filterBy.name, 'i')
        songs = songs.filter(song => regex.test(song.name) || regex.test(song.artist))
    }
    
    songs = songs.map(({name, artist, lyrics, chords }) => ({name, artist, lyrics, chords }))
    return songs
}

function getById(songId) {
    return storageService.get(STORAGE_KEY, songId)
}

async function remove(songId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, songId)
}

async function save(song) {
    var savedsong
    if (song._id) {
        const songToSave = {
            _id: song._id,
            price: song.price,
            speed: song.speed,
        }
        savedsong = await storageService.put(STORAGE_KEY, songToSave)
    } else {
        const songToSave = {
            name: song.name,
            artist: song.artist,
            // Later, owner is set by the backend
        }
        savedsong = await storageService.post(STORAGE_KEY, songToSave)
    }
    return savedsong
}

async function addsongMsg(songId, txt) {
    // Later, this is all done by the backend
    const song = await getById(songId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    song.msgs.push(msg)
    await storageService.put(STORAGE_KEY, song)

    return msg
}