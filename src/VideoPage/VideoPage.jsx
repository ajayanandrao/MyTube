import React, { useEffect, useRef, useState } from 'react'
import "./VideoPage.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import media from "./../json/media.json";

import v1 from "./../video/Make it for defense.mp4"
import v2 from "./../video/Top Gun.mp4"
import v3 from "./../video/WORLD´S LARGEST RC AIRWOLF BLACK BELL-222 ELECTRIC SCALE 1_3.5 MODEL HELICOPTER .mp4"
import v4 from "./../video/Powerful.mp4"
import v5 from "./../video/SHE DESTROYED 26 PLAYERS .mp4"
import v6 from "./../video/Moana_ The Movie.mp4"
import v7 from "./../video/The best dinosaurs.mp4"
import v9 from "./../video/Create Database.mp4"
import v11 from "./../video/Coding Challenge 180_ Falling Sand.mp4"
import v12 from "./../video/5 Minutes of Interstellar in 4K.mp4"
import aj from "./../img/ajj.jpg"

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdEmojiEmotions } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { loadOff, loadOn } from '../Redux/CounterSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeftBar from '../Home/LeftBar/LeftBar';
import NavbarLeft from '../Home/NavbarLeft/NavbarLeft';

const VideoArray = [
    { id: 1, videoMD: v1 },
    { id: 2, videoMD: v2 },
    { id: 3, videoMD: v3 },
    { id: 4, videoMD: v4 },
    { id: 5, videoMD: v5 },
    { id: 6, videoMD: v6 },
    { id: 7, videoMD: v7 },
    { id: 9, videoMD: v9 },
    { id: 11, videoMD: v11 },
    { id: 12, videoMD: v12 },
];

const VideoPage = () => {

    const iframeRef = useRef(null);

    const { id } = useParams();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        // Function to update window width
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', updateWindowWidth);

        // Initial window width
        setWindowWidth(window.innerWidth);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    const [setNum, setSetNum] = useState(3)

    const num = windowWidth / setNum;

    useEffect(() => {
        if (num < 330) {
            setSetNum(2.3)
        } else if (num < 251) {
            setSetNum(3)
        }
    }, [num]);

    // ========================================================


    const [mergedArray, setMergedArray] = useState([]);

    useEffect(() => {
        const newMergedArray = media.map((mediaItem) => {
            const matchingVideo = VideoArray.find((videoItem) => videoItem.id === mediaItem.id);

            if (matchingVideo) {
                // Merge data from VideoArray into mediaItem
                return { ...mediaItem, ...matchingVideo };
            } else {
                return mediaItem;
            }
        });

        setMergedArray(newMergedArray);
    }, [media, VideoArray]);

    const selectedItem = mergedArray.find((item) => item.id === parseInt(id, 10));

    function formatLikeCount(count) {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return (count / 1000).toFixed(1) + 'k';
        } else {
            return (count / 1000000).toFixed(1) + 'M';
        }
    }

    const formattedLikes = formatLikeCount(selectedItem && selectedItem.likeCount);

    function formatCommentCount(count) {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return (count / 1000).toFixed(1) + 'k';
        } else {
            return (count / 1000000).toFixed(1) + 'M';
        }
    }

    const scrollDivRef = useRef(null);

    const dispatch = useDispatch();

    const nav = useNavigate();

    const handleShortOn = (id) => {
        dispatch(loadOn());
        setTimeout(() => {
            dispatch(loadOff());
        }, 1000);
        setTimeout(() => {
            nav(`/${id}`);
        }, 500);
    }

    const scroll = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop = 0;
        }
    };
    const BigNav = useSelector((state) => state.counter.bigNav);
    return (
        <>
            {BigNav === false ?
                <NavbarLeft />
                :
                null
            }
            {selectedItem ?
                (<div className='video-main' ref={scrollDivRef}>
                    <iframe className='bg-video'
                        height={num > 451 ? 451 : num}
                        src={selectedItem.frame} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                    <div className="glass">
                        <div className="v-div" height={num} >
                            {/* <h3>{num}</h3> */}
                            <iframe className='video-frame'
                                ref={iframeRef}
                                height={
                                    num > 451 ? 451
                                        : num < 251 ? "250px" : num}
                                src={selectedItem.frame} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                            <div className="title-wrapper">
                                <h5>{selectedItem.title}</h5>

                                <div className="title-inner-wrapper">

                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <img src={selectedItem.channelImg} className='channel-img' alt="" />
                                        </div>
                                        <div className='channel-name-div'>
                                            <div className='channel-name'>{selectedItem.channel}</div>
                                            <div className='channel-sub'>{selectedItem.channelSub} subscribers</div>
                                        </div>

                                        <div className='sub-btn'>Subscriber</div>
                                    </div>

                                    <div className='title-option'>
                                        <div className="like-btn-div">
                                            <AiOutlineLike style={{ fontSize: "24px" }} />
                                            <div className='like-count'>
                                                {formattedLikes}
                                            </div>

                                            <div className="like-count-line"></div>

                                            <BiDislike style={{ fontSize: "24px" }} />
                                        </div>

                                        <div className="like-btn-div">
                                            <IoIosShareAlt style={{ fontSize: "24px" }} />
                                            <span className='ms-1 me-1'> Share</span>
                                        </div>

                                        <div className="like-btn-div" style={{ borderRadius: "50%", padding: "5px" }}>
                                            <PiDotsThreeOutlineFill style={{ fontSize: "24px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="description-div">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime impedit et nam, illum magni unde iusto quod dolore quo accusantium quidem nulla facilis molestias atque corrupti... More
                            </div>

                            <h5>{selectedItem.commentCount} Comments</h5>

                            <div className="comment-div">
                                <div> <img src={aj} className='comment-img' alt="" /></div>
                                <div className="comment-btn">
                                    <input type="text" className='comment-input' placeholder='Add a Comment' />

                                    <div className='comment-btn-inner-div'>
                                        <MdEmojiEmotions style={{ fontSize: "24px" }} />
                                        <div>
                                            <button className='btn btn-outline-primary btn-sm'>Cancel</button>
                                            <button className='btn btn-primary ms-3 btn-sm'>Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comment-container">
                                <div className='d-flex my-5'>
                                    <div>
                                        <img src={aj} className='comment-user-img' alt="" />
                                    </div>
                                    <div className='ms-2' style={{ position: "relative" }}>
                                        <div className="comment-user-name">Ajay Anandrao</div>
                                        <div className='comment-users'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, tempora. Molestiae, facilis tempora sapiente vel dolor praesentium nemo iste, minus accusantium repellat veniam est atque labore nesciunt ab ratione facere!
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <AiOutlineLike className='comment-icons' />
                                            <span className='ms-1 me-2'>231</span>
                                            <BiDislike className='comment-icons' />
                                        </div>
                                        <HiDotsVertical style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }} />
                                    </div>
                                </div>

                                <div className='d-flex my-5'>
                                    <div>
                                        <img src={aj} className='comment-user-img' alt="" />
                                    </div>
                                    <div className='ms-2' style={{ position: "relative" }}>
                                        <div className="comment-user-name">Ajay Anandrao</div>
                                        <div className='comment-users'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, tempora. Molestiae, facilis tempora sapiente vel dolor praesentium nemo iste, minus accusantium repellat veniam est atque labore nesciunt ab ratione facere!
                                        </div>
                                        <div className='comment-icon-div'>
                                            <AiOutlineLike className='comment-icons' />
                                            <span className='ms-1 me-2'>231</span>
                                            <BiDislike className='comment-icons' />
                                        </div>
                                        <HiDotsVertical style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }} />
                                    </div>
                                </div>

                                <div className='d-flex my-5'>
                                    <div>
                                        <img src={aj} className='comment-user-img' alt="" />
                                    </div>
                                    <div className='ms-2' style={{ position: "relative" }}>
                                        <div className="comment-user-name">Ajay Anandrao</div>
                                        <div className='comment-users'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, tempora. Molestiae, facilis tempora sapiente vel dolor praesentium nemo iste, minus accusantium repellat veniam est atque labore nesciunt ab ratione facere!
                                        </div>
                                        <div className='comment-icon-div'>
                                            <AiOutlineLike className='comment-icons' />
                                            <span className='ms-1 me-2'>231</span>
                                            <BiDislike className='comment-icons' />
                                        </div>
                                        <HiDotsVertical style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }} />
                                    </div>
                                </div>

                                <div className='d-flex my-5'>
                                    <div>
                                        <img src={aj} className='comment-user-img' alt="" />
                                    </div>
                                    <div className='ms-2' style={{ position: "relative" }}>
                                        <div className="comment-user-name">Ajay Anandrao</div>
                                        <div className='comment-users'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, tempora. Molestiae, facilis tempora sapiente vel dolor praesentium nemo iste, minus accusantium repellat veniam est atque labore nesciunt ab ratione facere!
                                        </div>
                                        <div className='comment-icon-div'>
                                            <AiOutlineLike className='comment-icons' />
                                            <span className='ms-1 me-2'>231</span>
                                            <BiDislike className='comment-icons' />
                                        </div>
                                        <HiDotsVertical style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }} />
                                    </div>
                                </div>
                            </div>
                            <div className='margin-bottom'></div>
                        </div>

                        <div className="video-side-bar">

                            {mergedArray.map((item) => {
                                return (
                                    <div key={item.id} to={`/${item.id}/`} className='link' onClick={() => { handleShortOn(item.id); scroll(); }}>
                                        <div className="video-side-bar-card">
                                            <img src={item.thumbnel} className='video-side-bar-img' alt="" />

                                            <div className='video-side-bar-title-div'>
                                                <div className='video-side-bar-title'>
                                                    {item.title}
                                                </div>
                                                <div className='video-side-bar-view'>
                                                    {formatCommentCount(item.likeCount)}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}

                            <div className='margin-bottom'>

                            </div>
                        </div>

                    </div>

                </div >)
                :
                <div className="snipping">

                    <div class="spinner-border " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }

        </>
    )
}

export default VideoPage