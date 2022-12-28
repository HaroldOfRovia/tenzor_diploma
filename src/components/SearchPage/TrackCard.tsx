export interface TrackCardValues {
    key?: number;
    name: string;
    artist: string;
    time: string;
    pic: string;
    altPic: string;
}

/**
 * @param интерфес TrackCardValues
 * @returns ReactElement карточки трека для страницы поиска
 */
export const TrackCard = ({ name, artist, time, pic, altPic }: TrackCardValues) => {
    return (
        <div className='track-case link'>
            <img src={ pic } className='mini-track-ico' alt={ altPic }/>
            <h4 className='track-name'>{ name }</h4>
            <div className='casual-text track-autor'>{ artist }</div>
            <div className='casual-text duration'>{ time }</div>
        </div>
    )
}