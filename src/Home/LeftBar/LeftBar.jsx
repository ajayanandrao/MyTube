import React, { useEffect, useState } from 'react'
import "./LeftBar.scss";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideoFill } from "react-icons/pi";
import { BiSolidVideos } from "react-icons/bi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { FaFireAlt } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { IoMusicalNoteSharp } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";
import { BiNews } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

import one from "./../../video/one.mp4"
import two from "./../../video/two.mp4"
import three from "./../../video/three.mp4"
import four from "./../../video/four.mp4"
import five from "./../../video/five.mp4"
import six from "./../../video/six.mp4"
import sevan from "./../../video/saven.mp4"
import eat from "./../../video/eat.mp4"

import oneimg from "./../../video/img/one.png"
import twoimg from "./../../video/img/two.png"
import threeimg from "./../../video/img/three.png"
import fourimg from "./../../video/img/four.png"
import fiveimg from "./../../video/img/five.png"
import siximg from "./../../video/img/six.png"
import savenimg from "./../../video/img/saven.png"
import eatimg from "./../../video/img/eat.png"
import { useDispatch, useSelector } from 'react-redux';
import { homeOff, homeOn, loadOff, loadOn, shortOff, shortOn } from '../../Redux/CounterSlice';

const LeftBar = () => {

    const shortData = [
        { id: 1, img: oneimg, video: one },
        { id: 2, img: twoimg, video: two },
        { id: 3, img: threeimg, video: three },
        { id: 4, img: fourimg, video: four },
        { id: 5, img: fiveimg, video: five },
        { id: 6, img: siximg, video: six },
        { id: 7, img: savenimg, video: sevan },
        { id: 8, img: eatimg, video: eat },
    ];

    function shuffleArray(array) {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    const shuffledUserPhoto = shuffleArray(shortData);

    const [id, setId] = useState(shuffledUserPhoto.map((item) => item.id)[0]);

    const State = useSelector((state) => state.counter.short);
    const Home = useSelector((state) => state.counter.home);

    const [selectItem, setSelectItem] = useState("home");


    useEffect(() => {
        if (Home === true) {
            setSelectItem("home");
        }
        if (State === true) {
            setSelectItem("home");
        }

    })

    const dispatch = useDispatch();

    const handleShortOff = () => {
        dispatch(shortOff());
    }

    const handleShort = (name) => {
        handleShortOff();
        handleHomeOff();
        if (name) {
            try {
                setSelectItem(name)
            } catch (e) {
                console.log(e);
            }
        }
    }

    const nav = useNavigate();

    const handleShortOn = () => {

        dispatch(loadOn());
        dispatch(shortOn());
        handleHomeOff();

        setTimeout(() => {
            dispatch(loadOff());
        }, 1000);
        setTimeout(() => {
            nav(`/short/${id}`);
        }, 500);
    }
    // =====================home    
    const handleHomeOn = () => {
        dispatch(homeOn());
        handleShortOff();
    }
    const handleHomeOff = () => {
        dispatch(homeOff());
    }


    return (
        <div className='left-main'>

            <Link to="/" className='link' onClick={handleHomeOn}>
                <div className="left-icon-div" style={{ background: `${Home === true ? "red" : "transparent"}` }}>
                    <div className='left-icon-wrapper'>
                        <GoHomeFill className='left-icon' />
                    </div>
                    <div className="left-icon-name">Home</div>
                </div>
            </Link>


            <div onClick={handleShortOn}>
                <div className="left-icon-div" style={{ background: `${State === true ? "red" : "transparent"}` }}>
                    <div className='left-icon-wrapper'>
                        <SiYoutubeshorts className='left-icon' />
                    </div>
                    <div className="left-icon-name">Shorts</div>
                </div>
            </div>


            <div className="left-icon-div" style={{ background: `${selectItem === "sub" ? "red" : "transparent"}` }} onClick={() => handleShort("sub")}>
                <div className='left-icon-wrapper' >
                    <PiVideoFill className='left-icon' />
                </div>
                <div className="left-icon-name">Subscriptions</div>
            </div>

            <hr className='w0-100' />

            <div className="left-icon-div" style={{ background: `${selectItem === "your" ? "red" : "transparent"}` }} onClick={() => handleShort("your")}>
                <div className='left-icon-wrapper'>
                    <BsPersonSquare className='left-icon' />
                </div>
                <div className="left-icon-name">Your Channel</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "video" ? "red" : "transparent"}` }} onClick={() => handleShort("video")}>
                <div className='left-icon-wrapper'>
                    <BiSolidVideos className='left-icon' />
                </div>
                <div className="left-icon-name">Your Video</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "hist" ? "red" : "transparent"}` }} onClick={() => handleShort("hist")}>
                <div className='left-icon-wrapper'>
                    <RxCounterClockwiseClock className='left-icon' />
                </div>
                <div className="left-icon-name">History</div>
            </div>

            <hr className='w0-100' />

            <div className="left-icon-div" style={{ background: `${selectItem === "trending" ? "red" : "transparent"}` }} onClick={() => handleShort("trending")}>
                <div className='left-icon-wrapper'>
                    <FaFireAlt className='left-icon' />
                </div>
                <div className="left-icon-name">Trending</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "shopping" ? "red" : "transparent"}` }} onClick={() => handleShort("shopping")}>
                <div className='left-icon-wrapper'>
                    <GiShoppingBag className='left-icon' />
                </div>
                <div className="left-icon-name">Shopping</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "music" ? "red" : "transparent"}` }} onClick={() => handleShort("music")}>
                <div className='left-icon-wrapper'>
                    <IoMusicalNoteSharp className='left-icon' />
                </div>
                <div className="left-icon-name">Music</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "movie" ? "red" : "transparent"}` }} onClick={() => handleShort("movie")}>
                <div className='left-icon-wrapper'>
                    <RiMovie2Fill className='left-icon' />
                </div>
                <div className="left-icon-name">Movie</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "game" ? "red" : "transparent"}` }} onClick={() => handleShort("game")}>
                <div className='left-icon-wrapper'>
                    <IoGameController className='left-icon' />
                </div>
                <div className="left-icon-name">Game</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "news" ? "red" : "transparent"}` }} onClick={() => handleShort("news")}>
                <div className='left-icon-wrapper'>
                    <BiNews className='left-icon' />
                </div>
                <div className="left-icon-name">News</div>
            </div>

            <hr className='w0-100' />


            <div className="left-icon-div" style={{ background: `${selectItem === "setting" ? "red" : "transparent"}` }} onClick={() => handleShort("setting")}>
                <div className='left-icon-wrapper'>
                    <IoSettingsOutline className='left-icon' />
                </div>
                <div className="left-icon-name">Setting</div>
            </div>
            <div className="left-icon-div" style={{ background: `${selectItem === "feed" ? "red" : "transparent"}` }} onClick={() => handleShort("feed")}>
                <div className='left-icon-wrapper' >
                    <MdFeedback className='left-icon' />
                </div>
                <div className="left-icon-name">FeedBack</div>
            </div>
        </div>
    )
}

export default LeftBar