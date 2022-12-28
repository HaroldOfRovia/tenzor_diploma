import { useEffect, useState } from 'react';
import { findTrack, getRandomPictures } from '../../collectData';
import { SearchInput } from "./SearchPage";
import { TrackCard, TrackCardValues } from './TrackCard';
import image from '../../images/fly.jpg'

/**
 * @param интерфейс SearchInput 
 * @returns ReactElement со списком карточек треков для страницы поиска
 */
export const TrackSearch = ({input}: SearchInput) => {
    const [cards, setCards] = useState<TrackCardValues[]>([]);

    async function setTracks(){
        let data = await findTrack(input, 8);;
        let arr = [];
        if (data === undefined)
            return;
        for(let i = 0; i < data.length; i++){
            arr.push({key: i, name: data[i].name, artist: data[i].artist, 
                time:`${ Math.round( Math.random() * 12 ) }:${ Math.round( Math.random() * 60 ) }`, pic: image, altPic: data[i].name});
        }
        return arr;
    }
    
    async function setPic(arr: TrackCardValues[] | undefined){
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
            let arr = await setTracks();
            if(arr !== undefined)
                setCards(arr);
            await setPic(arr);
            if(arr !== undefined)
                setCards([...arr]);
        }
        qwe();
    }, [input]);

    return (
        <>
            { cards.map( a => {
                return <TrackCard key={a.key} name={a.name} artist={a.artist} pic={a.pic} time={a.time} altPic={a.altPic}/>
            }) }
        </>
    )
}