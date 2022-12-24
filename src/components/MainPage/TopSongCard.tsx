export interface SongCardValues {
    name: string;
    artist: string;
    pic: string;
}

/**
 * @param интерфес SongCardValues
 * @returns ReactElement карточки трека на главной странице
 */
export const TopSongCard = function ({name, artist, pic}: SongCardValues){
    return (
        <div className='track link'>
            <img src={ pic } className='track-ico' alt="sasas"/>
            <h3 className='name'>{ name }</h3>
            <div className='casual-text'>{ artist }</div>
        </div>
    )
}