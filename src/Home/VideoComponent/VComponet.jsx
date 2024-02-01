import React, { createRef, useEffect, useRef, useState } from 'react'
import "./VComponent.scss"
import { FaCircleCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import media from "./../../json/media.json";
import LeftBar from '../LeftBar/LeftBar';
import LeftBarTwo from '../LeftBarTwo/LeftBarTwo';
import Short from '../Short/Short';

import v1 from "./../../video/Make it for defense.mp4"
import v2 from "./../../video/Top Gun.mp4"
import v3 from "./../../video/WORLD´S LARGEST RC AIRWOLF BLACK BELL-222 ELECTRIC SCALE 1_3.5 MODEL HELICOPTER .mp4"
import v4 from "./../../video/Powerful.mp4"
import v5 from "./../../video/SHE DESTROYED 26 PLAYERS .mp4"
import v6 from "./../../video/Moana_ The Movie.mp4"
import v7 from "./../../video/The best dinosaurs.mp4"
import v9 from "./../../video/Create Database.mp4"
import v11 from "./../../video/Coding Challenge 180_ Falling Sand.mp4"
import v12 from "./../../video/5 Minutes of Interstellar in 4K.mp4"

import { BiSolidVolumeFull } from "react-icons/bi";
import { BiSolidVolumeMute } from "react-icons/bi";


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



const VComponet = () => {

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

    const formatViews = (viewCount) => {
        if (viewCount >= 1000) {
            return `${(viewCount / 1000).toFixed(0)}k`;
        } else if (viewCount > 10000) {
            return `${(viewCount / 10000).toFixed(0)}m`;
        } else {
            return viewCount.toString();
        }
    };

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

    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef(VideoArray.map(() => createRef()));

    const handleClick = (index) => {
        setIsMuted(!isMuted);
        const videoRef = videoRefs.current[index];

        if (videoRef && videoRef.current) {
            const video = videoRef.current;

            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const pauseAllVideos = () => {
        videoRefs.current.forEach((videoRef) => {
            if (videoRef && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        });
        setIsMuted(!isMuted);
    };

    const handleMouseOver = (index) => {

        const videoRef = videoRefs.current[index];

        if (videoRef && videoRef.current.paused) {

            videoRef.current.play().catch(error => {
                // console.error('Autoplay was prevented:', error);
            });
        }
        // console.log('Mouse over video with ID:', index);
    };

    const handleMouseOut = (id) => {
        const videoRef = videoRefs.current[id];

        if (videoRef) {
            videoRef.current.pause();
            // videoRef.current.currentTime = 0;
        }

        // console.log('Mouse out of video with ID:', id);
    };



    return (
        <div className='video-main-div'>
            <div className="left"></div>

            <div className='d-block w-100'>
                <div className="video-grid">

                    {mergedArray.slice(0, windowWidth < 576 ? 2 :
                        windowWidth < 992 ? 4 : 6).map((item, index) => {
                            return (
                                <>
                                    <div className="video-card-div">
                                        <div className="video-card" style={{ backgroundImage: `url(${item.thumbnel})` }}
                                            onMouseOver={() => handleMouseOver(index)}
                                            onMouseOut={() => handleMouseOut(index)}
                                        >
                                            {isMuted ?
                                                <video
                                                    ref={videoRefs.current[index]}

                                                    className='video-home' autoPlay muted src={item.videoMD && item.videoMD}></video>
                                                :
                                                <video
                                                    ref={videoRefs.current[index]}

                                                    className='video-home' autoPlay muted={isMuted} src={item.videoMD && item.videoMD}></video>
                                            }

                                            <div className='duration'>6:30</div>
                                            <div className='top-opt-div'
                                                onMouseOver={() => handleMouseOver(index)}
                                            >

                                                {isMuted ?

                                                    <BiSolidVolumeMute
                                                        style={{ fontSize: "20" }}
                                                        onClick={() => pauseAllVideos(index)}
                                                        onMouseOver={() => handleMouseOver(index)}
                                                    />
                                                    :
                                                    <BiSolidVolumeFull style={{ fontSize: "20" }} onClick={() => pauseAllVideos(index)}
                                                        onMouseOver={() => handleMouseOver(index)}
                                                    />
                                                }

                                            </div>
                                        </div>

                                        <div className="video-conainet-wrapper">
                                            <div className='me-3'>
                                                <div className="videoimg"></div>

                                            </div>
                                            <div className='w-100'>
                                                <div className='d-flex'>
                                                    <div className='title'>{item.title}</div>
                                                    <div className='video-option'>
                                                        <BsThreeDotsVertical className='video-option-btn' />
                                                    </div>
                                                </div>

                                                <div className='video-channel-name'>
                                                    Ajay anandrao coding
                                                    <FaCircleCheck className='ms-2' />
                                                </div>
                                                <div className='video-channel-rank'>
                                                    {formatViews(item.viewCount)}
                                                    Views. 2 Hours ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                </div>

                {/* <Short />
                        
                <div className="video-grid">

                    {mergedArray.slice().reverse().map((item) => {
                        return (
                            <>
                                <div className="video-card-div">
                                    <div className="video-card" >
                                        <img src={item.thumbnel} width="100%" className='thubmnel' alt="" />
                                        <div className='duration'>6:30</div>
                                    </div>

                                    <div className="video-conainet-wrapper">
                                        <div className='me-3'>
                                            <div className="videoimg"></div>

                                        </div>
                                        <div className='w-100'>
                                            <div className='d-flex'>
                                                <div className='title'>{item.title}</div>
                                                <div className='video-option'>
                                                    <BsThreeDotsVertical className='video-option-btn' />
                                                </div>
                                            </div>

                                            <div className='video-channel-name'>
                                                Ajay anandrao coding
                                                <FaCircleCheck className='ms-2' />
                                            </div>
                                            <div className='video-channel-rank'> {formatViews(item.viewCount)} Views. 2 Hours ago</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div> */}
            </div>

        </div>
    )
}

export default VComponet


