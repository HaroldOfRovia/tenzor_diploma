export interface SongCardValues {
    key?: number;
    name: string;
    artist: string;
    pic: string;
    picAlt: string;
}

/**
 * @param интерфес SongCardValues
 * @returns ReactElement карточки трека на главной странице
 */
export const TopSongCard = function ({name, artist, pic, picAlt}: SongCardValues){
    return (
        <div className='track link'>
            <img src={ pic } className='track-ico' alt={ picAlt }/>
            <h3 className='name'>{ name }</h3>
            <div className='casual-text'>{ artist }</div>
        </div>
    )
}