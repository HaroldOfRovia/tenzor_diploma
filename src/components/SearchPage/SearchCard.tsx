export interface SearchCardValues {
    key?: number;
    mainText: string;
    subText: string;
    pic: string;
    picAlt: string;
}

/**
 * @param интерфес SearchCardValues
 * @returns ReactElement квадратной карточки поиска
 */
export const SearchCard = ({mainText, subText, pic, picAlt}: SearchCardValues) => {
    return(
        <div className="link item-result white-text">
            <div className='search-card-text'>{ subText }</div>
            <h3 className='search-card-text'>{ mainText }</h3>
            <img src={ pic } className='search-card-image' alt={ picAlt }/>
        </div>
    )
}