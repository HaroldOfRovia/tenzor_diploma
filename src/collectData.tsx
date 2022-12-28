/**
 * @param {*} url ссылка на api
 * @returns json в виде объекта
 */
async function getJson(url: string){
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`response status: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }
}

/**
 * @param {*} size размер топа исполнителей
 * @returns массив с именами лучших исполнителей
 */
export async function getTopArtists(size: number){
    try{
        let data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
            chart = [];
        for (let i = 0; i < size; i++){
            chart.push(data.artists.artist[i].name);
        }
        return chart;
    } catch (err) {
        console.error(err);
    }
}


/**
 * @param {*} size размер топа песен
 * @returns массив объектов с полями name - имя песни, artist - имя исполнителя
 */
export async function getTopSongs(size: number){
    try{
        let data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
            chart = [];
        for (let i = 0; i < size; i++){
            chart.push({name: data.tracks.track[i].name, artist: data.tracks.track[i].artist.name});
        }
        return chart;
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {*} size размер квадратного изображения в px
 * @returns случайное изображение
 */
export async function getRandomPictures(size: number, pixels: number) {
    try{
        let arr = [];
        for(let i = 0; i < size; i++){
            let response = await fetch(`https://picsum.photos/${pixels}`);
            arr.push(response.url);
        }
        return arr;
    } catch (err) {
        console.error(err);
    }   
}

/**
 * поиск исполнителя через api метод artist.search
 * @param {*} input потенциальное имя исполнителя
 * @returns массив объектов у которых поля: name - имя исполнителя, listeners - количество слушателей. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
export async function findArtist(input: string, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
        list = [];
    if(Object.keys(data).length === 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.artistmatches.artist.length; i++){
        list.push({name: data.results.artistmatches.artist[i].name, other: data.results.artistmatches.artist[i].listeners})
    }
    return list;
}

/**
 * поиск альбома через api метод album.search
 * @param {*} input потенциальное имя альбома
 * @returns массив объектов у которых поля: name - имя альбома, artist - исполнитель. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
export async function findAlbum(input: string, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
        list = [];
    if(Object.keys(data).length === 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.albummatches.album.length; i++){
        list.push({name: data.results.albummatches.album[i].name, other: data.results.albummatches.album[i].artist})
    }
    return list;
}

/**
 * поиск трека через api метод track.search
 * @param {*} input потенциальное имя трека
 * @returns массив объектов у которых поля: name - имя трека, artist - исполнитель. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
export async function findTrack(input: string, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
        list = [];
    if(Object.keys(data).length === 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.trackmatches.track.length; i++){
        list.push({name: data.results.trackmatches.track[i].name, artist: data.results.trackmatches.track[i].artist})
    }
    return list;
}
