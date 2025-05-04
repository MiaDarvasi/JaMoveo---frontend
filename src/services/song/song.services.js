import { songList } from '../../data/songData'

export const songService = {
    query,
}

export function query(filterBy = { name: '', artist: '' }) {
    const { name, artist } = filterBy

    let songs = songList.filter(song => {
        const matchesName = name
            ? song.name.toLowerCase().includes(name.toLowerCase())
            : true
        const matchesArtist = artist
            ? song.artist.toLowerCase().includes(artist.toLowerCase())
            : true

        return matchesName || matchesArtist
    })

    songs = songs.map(({ name, artist, lyrics, chords }) => ({ name, artist, lyrics, chords }))
    return songs
}
