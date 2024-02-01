import React, { useEffect, useState } from 'react'
import "./Short.scss";
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
import short from "./../../img/short.png";
import { SiYoutubeshorts } from "react-icons/si";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { shortOn } from '../../Redux/CounterSlice';

const Short = () => {

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

    const [num, setNum] = useState(false);
    function shuffleArray(array) {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    const shuffledUserPhoto = shuffleArray(shortData);
    const [on, setOn] = useState(true);

    const handleOn = () => {
        setOn(!on);
        setNum(!num)
    }


    return (
        <div className='d-flex'>
            <div className="left"></div>
            <div className='short-div'>
                <div className='short-div-title'>
                    {/* <SiYoutubeshorts className='short-icon' /> */}
                    <img src={short} className='short-icon' alt="" />
                    <h4>Shorts</h4>
                </div>

                <div className='short-main'>
                    {shortData
                        .slice(
                            num === false
                                ?
                                windowWidth < 576
                                    ? 6
                                    : windowWidth < 690
                                        ? 5
                                        : windowWidth < 993
                                            ? 5
                                            : windowWidth < 1090
                                                ? 4
                                                : windowWidth < 1268
                                                    ? 4
                                                    : windowWidth > 1168
                                                        ? 3
                                                        : 0
                                : 0
                        )
                        .map((item) => (
                            <Link key={item.id} to={`/short/${item.id}`} className='link'>
                                <div key={item.id} className="short-card" style={{ backgroundImage: `url(${item.img})` }}>
                                    <video className='short-card-video' src={item.video} autoPlay loop muted />
                                </div>
                            </Link>
                        ))}

                </div>
                <div className='short-more' onClick={handleOn}>
                    {on ?
                        <>
                            Show More
                            <FaAngleDown className='down-icon' />
                        </>
                        :
                        <>
                            Show Less
                            <FaAngleUp className='down-icon' />
                        </>
                    }
                </div>
                <hr className='w-100' />
            </div>
        </div >
    )
}

export default Short    