export interface ArtistCardValues {
    name: string;
    pic: string;
    picAlt: string;
}

/**
 * @param интерфес ArtistCardValues
 * @returns ReactElement карточки артиста на главной странице
 */
export const TopArtistCard = function ({name, pic, picAlt}: ArtistCardValues){
    return (
        <div className='singer link'>
            <img src={pic} className="round-singer-ico" alt={picAlt}/>
            <h3 className='name'>{name}</h3>
        </div>
    )
}