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
    let propsList: SearchCardValues[] = [];
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
        for (let i = 0; i < propsList.length; i++) {
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
        let cut = cards.length;
        if (data === undefined)
            return;
        for(let i = 0; i < cards.length; i++){
            if (data[i] === undefined){
                cut = i;
                break;
            }
            propsList[i].mainText = data[i].name;
            if (isNaN(data[i].other[0]))
                propsList[i].subText = `${data[i].other} listeners`;
            else
                propsList[i].subText = `${data[i].other}`;
        }
        propsList = propsList.splice(0, cut);
        updateList();
    }

    /**
     * обновляет пропсы (изображение) для карточек поиска
     */
    async function setPic(){
        let pictures = await getRandomPictures(propsList.length, 200);
        if (pictures === undefined)
            return;
        for(let i = 0; i < propsList.length; i++){
            propsList[i].picture = pictures[i];
        }
        updateList();
    }

    useEffect(() => {
        async function qwe() {
            await setSomething(func);
            await setPic();
        }
        qwe();
    }, [input]);

    return (
        <div className='grid-search-result'>
            {/* <!-- сюда вставляются карточки артистов --> */}
            { cards }
        </div>
    )
}