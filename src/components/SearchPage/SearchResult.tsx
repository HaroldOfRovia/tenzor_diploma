import image from '../../images/fly.jpg';
import { ReactElement, useEffect, useState } from 'react';
import { SearchCard, SearchCardValues } from './SearchCard';
import { getRandomPictures } from '../../collectData';

interface SearchResultInterface {
    input: string;
    func: Promise<{name: any, other: any}[]>;
}

/**
 * @param интерфейс SearchResultInterface (значение поиска и промис, findArtist или findAlbum)
 * @returns ReactElement со списком больших карточек поиска
 */
export const SearchResult = ({input, func} : SearchResultInterface) => {
    const propsList: SearchCardValues[] = [];
    const [cards, setCards] = useState<ReactElement[]>(initCards());

    
    /**
     * @returns массив с карточками поиска с данными по умолчанию
     */
    function initCards():ReactElement[]{
        const list = [];
        for(let i = 0; i < 8; i++){
            propsList.push({mainText: 'Something went wrong', subText: 'error', picture: image, alt: 'error'});
            list.push(<SearchCard key={i} mainText={propsList[i].mainText} subText={propsList[i].subText}
                picture={propsList[i].picture} alt={propsList[i].alt}/>)
        } 
        return list;
    }

    /**
     * обновляет массив рекат элементов
     */
    function updateList(){
        const list = [];
        for (let i = 0; i < 8; i++) {
            list.push(<SearchCard key={i} mainText={propsList[i].mainText} subText={propsList[i].subText}
                picture={propsList[i].picture} alt={propsList[i].alt}/>);
        }
        setCards(list);
    }

    /**
     * обновляет пропсы (главный текст и второстепенный) для карточек поиска
     */
    async function setSomething(func: Promise<{name: any, other: any}[]>) {
        const data = await func;
        if (data === undefined)
            return;
        for(let i = 0; i < cards.length; i++){
            propsList[i].mainText = data[i].name;
            propsList[i].subText = `${data[i].other} listeners`;
        }
        updateList();
    }

    /**
     * обновляет пропсы (изображение) для карточек поиска
     */
    async function setPic(){
        let pictures = await getRandomPictures(12, 200);
        if (pictures === undefined)
            return;
        for(let i = 0; i < cards.length; i++){
            propsList[i].picture = pictures[i];
        }
        updateList();
    }

    useEffect(() => {
        setSomething(func);
        setPic();
    }, [input]);

    return (
        <div className='grid-search-result'>
            {/* <!-- сюда вставляются карточки артистов --> */}
            { cards }
        </div>
    )
}