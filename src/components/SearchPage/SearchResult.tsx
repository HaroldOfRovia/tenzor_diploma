import image from '../../images/fly.jpg';
import { useEffect, useState } from 'react';
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
    const [cards, setCards] = useState<SearchCardValues[]>([]);

    async function setSomething(func: Promise<{name: any, other: any}[]>){
        let data = await func;
        let arr = [];
        if (data === undefined)
            return;
        for(let i = 0; i < data.length; i++){
            arr.push({key: i, mainText: data[i].name, subText: data[i].other, pic: image, picAlt: data[i].name});
        }
        return arr;
    }

    async function setPic(arr: SearchCardValues[] | undefined) {
        if(arr === undefined)
            return
        let pictures = await getRandomPictures(arr.length, 150);
        if (pictures === undefined || arr === undefined)
            return;
        for(let i = 0; i < arr.length; i++){
            arr[i].pic = pictures[i];
        }
    }

    useEffect(() => {
        async function qwe() {
            let arr = await setSomething(func);
            if(arr !== undefined)
                setCards(arr);
            await setPic(arr);
            if(arr !== undefined)
                setCards([...arr]);
        }
        qwe();
    }, [input]);

    return (
        <div className='grid-search-result'>
            {/* <!-- сюда вставляются карточки артистов --> */}
            { cards.map( a => {
                return <SearchCard key={a.key} mainText={a.mainText} subText={a.subText} pic={a.pic} picAlt={a.picAlt}/>
            }) }
        </div>
    )
}