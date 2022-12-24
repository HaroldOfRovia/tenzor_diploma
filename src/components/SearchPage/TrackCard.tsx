export interface TrackCardValues {
    name: string;
    artist: string;
    time: string;
    pic: string;
}

/**
 * @param интерфес TrackCardValues
 * @returns ReactElement карточки трека для страницы поиска
 */
export const TrackCard = ({ name, artist, time, pic }: TrackCardValues) => {
    return (
        <div className='track-case link'>
            <img src={ pic } className='mini-track-ico'/>
            <h4 className='track-name'>{ name }</h4>
            <div className='casual-text track-autor'>{ artist }</div>
            <div className='casual-text duration'>{ time }</div>
        </div>
    )
}