import { createContext, useState } from "react";

export const AppContext = createContext()
export const AppProvider = ({children}) => {
    const [user, setUser] = useState({email: null, profile: null})
    const [album, setAlbum] = useState(null)
    const [musica, setMusica] = useState(null)
    const [artista, setArtista] = useState(null)

    return(
        <AppContext.Provider value={{user, setUser, album, setAlbum, musica, setMusica, artista, setArtista}}>
            {children}
        </AppContext.Provider>
    )
}