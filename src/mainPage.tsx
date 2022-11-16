import { ReactChild } from 'react';
import topSinger from './images/topSinger.jpg';
import trackImg from './images/trackImg.jpg';

export function mainPage():ReactChild {
    return(
            <main className='main'>
                <h1 className='bold-font main-topic'>Music</h1>
                <div className='topic'>
                    <h2 className='topic-header'>Hot right now</h2>
                    <div className='center'><hr className='red-line'/></div>
                    <div className='top-singers'>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                        <a className='singer link' href='/'>
                            <img src={topSinger} className="round-singer-ico" alt="very cool dudes" />
                            <h3 className='name'>Very cool dudes</h3>
                        </a>
                    </div>
                </div>
                <div className='topic'>
                <h2 className='topic-header'>Popular tracks</h2>
                <div className='center'><hr className='red-line'/></div>
                <div className='top-tracks'>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                    <a className='track link' href='/'>
                        <img src={trackImg} className='track-ico' alt="album pic"/>
                        <h3 className='name'>It`s cool track!</h3>
                        <div className='casual-text'>Very cool dudes</div>
                    </a>
                </div>
                </div>
            </main>
    )
}

