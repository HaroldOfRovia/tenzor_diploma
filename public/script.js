buildMainPage();

/**
 * наполняет страницу главным контентом
 */
async function buildMainPage(){
    let root = document.getElementsByClassName('header')[0],
        main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = `<h1 class='bold-font main-topic'>Music</h1>
                    <div class='topic'>
                        <h2 class='topic-header'>Hot right now</h2>
                        <div class='center'><hr class='red-line'/></div>
                        <div class='top-singers'>
                        <!-- сюда вставляются топ авторов -->
                        </div>
                    </div>
                    <div class='topic'>
                        <h2 class='topic-header'>Popular tracks</h2>
                        <div class='center'><hr class='red-line'/></div>
                        <div class='top-tracks'>
                        <!-- сюда вставляются топ треков -->
                        </div>
                    </div>`;
    root.after(main);
    await insertChart();
    await insertTracks();
    await setChartArtistImages();
    await setChartTracksImages();
}

/**
 * @param {*} size размер квадратного изображения в px
 * @returns случайное изображение
 */
 async function getRandomImage(size = 150){
    try{
        let response = await fetch(`https://picsum.photos/${size}`);
        return response.url;
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {*} url ссылка на api
 * @returns json в виде объекта
 */
async function getJson(url){
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
 * создает html элемент для списка лучших исполнителей
 * @param {*} pic адрес картинки
 * @param {*} alt текст для картинки
 * @param {*} name имя автора
 * @returns html элемент лучшего исполнителя
 */
function getTopArtistCard(pic, alt, name){
    let card = document.createElement("a");
    card.className = 'singer link';
    card.setAttribute('href', '') ;
    card.innerHTML = `<img src="${pic}" class="round-singer-ico" alt="${alt}"/>
                            <h3 class='name'>${name}</h3>`
    return card;
}

/**
 * @param {*} size размер топа
 * @returns массив с именами лучших исполнителей
 */
async function getChartArtists(size){
    try{
        let data = await getJson('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json'),
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
 * заполняет топ лучших исполнителей карточками
 */
async function insertChart(){
    const chartPlace = document.getElementsByClassName('top-singers')[0],
        size = 12,
        chart = await getChartArtists(size);
    for(let i = 0; i < size; i++){
        chartPlace.append(getTopArtistCard("../src/images/topSinger.jpg", chart[i], chart[i]));
    }
}

/**
 * устанавливает карточкам в топе изображения
 */
async function setChartArtistImages(){
    const topSingers = document.getElementsByClassName('singer');
    for(let i = 0; i < topSingers.length; i++){
        let image = await getRandomImage();
        topSingers[i].getElementsByTagName("img")[0].setAttribute("src", image);
    }
}

async function getChartTrack(size){
    try{
        let data = await getJson('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json'),
            chart = [];
        for (let i = 0; i < size; i++){
            chart.push({name: data.tracks.track[i].name, artist: data.tracks.track[i].artist.name});
        }
        return chart;
    } catch (err) {
        console.error(err);
    }
}

function getTopTrackCard(pic, alt, trackName, artistName){
    let card = document.createElement("a");
    card.className = 'track link';
    card.setAttribute('href', '');
    card.innerHTML = `<img src='${pic}' class='track-ico' alt="${alt}"/>
                        <h3 class='name'>${trackName}</h3>
                        <div class='casual-text'>${artistName}</div>`
    return card;
}

async function insertTracks(){
    const chartPlace = document.getElementsByClassName('top-tracks')[0],
        size = 6,
        chart = await getChartTrack(size);
    for(let i = 0; i < size; i++){
        chartPlace.append(getTopTrackCard("../src/images/trackImg.jpg", chart[i].name, chart[i].name, chart[i].artist));
    }
}

async function setChartTracksImages(){
    const topTracks = document.getElementsByClassName('track');
    for(let i = 0; i < topTracks.length; i++){
        let image = await getRandomImage();
        topTracks[i].getElementsByTagName("img")[0].setAttribute("src", image);
    }
}