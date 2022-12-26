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
    const [cards, setCards] = useState<ReactElement[]>([]);


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
        if (data === undefined)
            return;
        for(let i = 0; i < data.length; i++){
            let obj = { mainText: data[i].name, subText: '', picture: image, alt: data[i].name };
            if (isNaN(data[i].other[0]))
                obj.subText = `${data[i].other}`;
            else
                obj.subText = `${data[i].other} listeners`;
            propsList.push(obj);
        }
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