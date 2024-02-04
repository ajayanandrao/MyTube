import React, { createRef, useEffect, useRef, useState } from 'react'
import "./ShortVideo.scss"

import one from "./../video/one.mp4"
import two from "./../video/two.mp4"
import three from "./../video/three.mp4"
import four from "./../video/four.mp4"
import five from "./../video/five.mp4"
import six from "./../video/six.mp4"
import sevan from "./../video/saven.mp4"
import eat from "./../video/eat.mp4"
import nine from "./../video/nine.mp4"
import ten from "./../video/avatar.mp4"

import oneimg from "./../video/img/one.png"
import twoimg from "./../video/img/two.png"
import threeimg from "./../video/img/three.png"
import fourimg from "./../video/img/four.png"
import fiveimg from "./../video/img/five.png"
import siximg from "./../video/img/six.png"
import savenimg from "./../video/img/saven.png"
import eatimg from "./../video/img/eat.png"
import { useParams } from 'react-router-dom'

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { BiSolidCommentDots } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

import aj from "./../img/ajj.jpg";
import LeftBar from '../Home/LeftBar/LeftBar'
import LeftBarTwo from '../Home/LeftBarTwo/LeftBarTwo'
import { useDispatch } from 'react-redux'
import { shortOn } from '../Redux/CounterSlice'
import { FaPlay } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const ShortVideo = () => {
    const shortData = [
        { id: 1, img: oneimg, video: one, like: 421 },
        { id: 2, img: twoimg, video: two, like: 985 },
        { id: 3, img: threeimg, video: three, like: 543 },
        { id: 4, img: fourimg, video: four, like: 235 },
        { id: 5, img: fiveimg, video: five, like: 102 },
        { id: 6, img: siximg, video: six, like: 69 },
        { id: 7, img: savenimg, video: sevan, like: 21 },
        { id: 8, img: eatimg, video: eat, like: 78 },
        { id: 9, img: eatimg, video: nine, like: 685 },
        { id: 10, img: eatimg, video: ten, like: 321 },
    ];
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef(shortData.map(() => createRef()));

    const { id } = useParams();

    const selectedIndex = shortData.findIndex(video => video.id === parseInt(id, 10));

    if (selectedIndex > 0) {
        shortData.unshift(shortData.splice(selectedIndex, 1)[0]);
    }


    useEffect(() => {
        if (id) {
            setIsPlaying(false);
        }
    }, [id])

    const [ison, setIsOn] = useState(false);

    const handleClick = (index) => {
        setIsOn(!ison)
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

    const [src, setSrc] = useState('');

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                const { target } = entry;

                if (target) {
                    const x = target.outerHTML;

                    var parser = new DOMParser();
                    var doc = parser.parseFromString(x, 'text/html');

                    var videoElement = doc.querySelector('video');
                    if (videoElement) {
                        var newSrc = videoElement.getAttribute('src');
                        setSrc(newSrc); // Set the src in the state

                        if (entry.isIntersecting) {
                            target.play();
                            setIsOn(false)
                            setIsPlaying(true);
                        } else {
                            target.pause();
                            setIsPlaying(false);
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.8,
        });

        videoRefs.current.forEach((videoRef) => {
            const video = videoRef.current;
            observer.observe(video);

            return () => {
                observer.unobserve(video);
            };
        });
    }, [videoRefs]);

    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);

    const handleLike = () => {
        setLike(!like);
        setDisLike(false);
    }
    const handleDisLike = () => {
        setDisLike(!disLike);
        setLike(false);
    }

    const [com, setCom] = useState(false);

    const comClose = (index) => {
        setIsOn(true)
        setCom(!com);
    }
    const comCloseOff = (index) => {

        setIsOn(true)
        const videoRef = videoRefs.current[index];

        if (videoRef && videoRef.current) {
            const video = videoRef.current;

            if (video) {
                video.pause();
                setIsPlaying(true);
            }
        }
        setCom(!com);
    }

    return (
        <div>
            <LeftBar />
            <LeftBarTwo />
            <div className='center-div' >
                <div className="leftShot"></div>

                <div className='w-100'>
                    <div className="reel-scroll-div">
                        <video
                            autoPlay
                            muted
                            loop
                            src={src}
                            className='video-short'
                        ></video>

                        <div className='short-video-option-div'>
                            <div className='short-video-option-warapper'>
                                <div className='short-video-option-icon-div'>
                                    <AiFillLike className='short-video-option-icon' />
                                </div>
                                <span className='short-video-optin-name'>Like</span>
                            </div>

                            <div className='short-video-option-warapper'>
                                <div className='short-video-option-icon-div'>
                                    <AiFillDislike className='short-video-option-icon' />
                                </div>
                                <span className='short-video-optin-name'>Dislike</span>
                            </div>

                            <div className='short-video-option-warapper'>
                                <div className='short-video-option-icon-div'>
                                    <BiSolidCommentDots className='short-video-option-icon' />
                                </div>
                                <span className='short-video-optin-name'>Comment</span>
                            </div>

                            <div className='short-video-option-warapper'>
                                <div className='short-video-option-icon-div'>
                                    <RiShareForwardFill className='short-video-option-icon' />
                                </div>
                                <span className='short-video-optin-name'>Share</span>
                            </div>

                            <div className='short-video-option-warapper'>
                                <div className='short-video-option-icon-div'>
                                    <BsThreeDotsVertical className='short-video-option-icon' />
                                </div>
                            </div>
                            <div className='short-video-option-warapper'>
                                <div>
                                    <img src={aj} className='short-video-option-icon-div' alt="" />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >

                <div className='glass-center-div' >
                    <div className="leftShot"></div>
                    {shortData.map((post, index) => {
                        return (
                            <div key={post.id} className='w-100'>
                                <div className="reel-scroll-div">
                                    {com &&
                                        <div className="comment-div">
                                            <div className="comment-div-inner">
                                                <IoClose className='com-close' onClick={() => comClose(index)} />
                                                <div className="user-com-div">
                                                    <div>
                                                        <img src={aj} className='user-com-icon' alt="" />
                                                    </div>
                                                    <div className="user-com-name-div">
                                                        <BsThreeDotsVertical className='user-con-close' />
                                                        <div className="user-com-name">Ajay Anandrao</div>
                                                        <p className='use-comment'>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eum aperiam
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="user-com-div">
                                                    <div>
                                                        <img src={aj} className='user-com-icon' alt="" />
                                                    </div>
                                                    <div className="user-com-name-div">
                                                        <BsThreeDotsVertical className='user-con-close' />
                                                        <div className="user-com-name">Ajay Anandrao</div>
                                                        <p className='use-comment'>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eum aperiam
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="user-com-div">
                                                    <div>
                                                        <img src={aj} className='user-com-icon' alt="" />
                                                    </div>
                                                    <div className="user-com-name-div">
                                                        <BsThreeDotsVertical className='user-con-close' />
                                                        <div className="user-com-name">Ajay Anandrao</div>
                                                        <p className='use-comment'>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eum aperiam
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="com-input-div">
                                                    <input type="text" placeholder='Add a Comment' className='com-input' />
                                                    <BiSolidSend className='com-send-icon' />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <video
                                        ref={videoRefs.current[index]}
                                        src={post.video}
                                        loop
                                        className='video-short'
                                        onClick={() => handleClick(index)}
                                    ></video>
                                    {ison &&
                                        <FaPlay className='play-btn' onClick={() => handleClick(index)} />
                                    }
                                    <div className='short-video-option-div'>
                                        <div className='short-video-option-warapper'>
                                            <div className='short-video-option-icon-div'
                                                onClick={handleLike}
                                                style={{ background: `${like == true ? "red" : "#272727"}` }}>
                                                <AiFillLike className='short-video-option-icon' />
                                            </div>
                                            <span className='short-video-optin-name'> {like ? post.like + 1 : post.like}k</span>
                                        </div>

                                        <div className='short-video-option-warapper'>
                                            <div className='short-video-option-icon-div'
                                                onClick={handleDisLike}
                                                style={{ background: `${disLike == true ? "red" : "#272727"}` }}>
                                                <AiFillDislike className='short-video-option-icon' />
                                            </div>
                                            <span className='short-video-optin-name'>Dislike</span>
                                        </div>

                                        <div className='short-video-option-warapper'>
                                            <div className='short-video-option-icon-div' onClick={() => comCloseOff(index)} >
                                                <BiSolidCommentDots className='short-video-option-icon' />
                                            </div>
                                            <span className='short-video-optin-name'>Comment</span>
                                        </div>

                                        <div className='short-video-option-warapper'>
                                            <div className='short-video-option-icon-div'>
                                                <RiShareForwardFill className='short-video-option-icon' />
                                            </div>
                                            <span className='short-video-optin-name'>Share</span>
                                        </div>

                                        <div className='short-video-option-warapper'>
                                            <div className='short-video-option-icon-div'>
                                                <BsThreeDotsVertical className='short-video-option-icon' />
                                            </div>
                                        </div>
                                        <div className='short-video-option-warapper'>
                                            <div>
                                                <img src={aj} className='short-video-option-icon-div' alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div >

                            </div >
                        )
                    })}
                </div >
            </div >
        </div >
    )
}

export default ShortVideo