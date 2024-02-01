import React, { useEffect, useState } from 'react'
import "./LeftBarTwo.scss";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideoFill } from "react-icons/pi";
import { BsPersonSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';

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
import { useSelector } from 'react-redux';


const LeftBarTwo = () => {

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

    const State = useSelector((state) => state.counter.short)
    return (
        <div className='left-mainTwo'>
            <Link to="/" className='link'>
                <div className="left-icon-div">
                    <div className='left-icon-wrapper'>
                        <GoHomeFill className='left-icon' />
                    </div>
                    <div className="left-icon-name">Home</div>
                </div>
            </Link>

            <Link to={`/short/${id}`} className='link' >
                <div className="left-icon-div" >
                    <div className='left-icon-wrapper'>
                        <SiYoutubeshorts className='left-icon' />
                    </div>
                    <div className="left-icon-name">Short</div>
                </div>
            </Link>

            <div className="left-icon-div">
                <div className='left-icon-wrapper'>
                    <PiVideoFill className='left-icon' />
                </div>
                <div className="left-icon-name">Channel</div>
            </div>

            <div className="left-icon-div">
                <div className='left-icon-wrapper'>
                    <BsPersonSquare className='left-icon' />
                </div>
                <div className="left-icon-name">You</div>
            </div>


        </div>
    )
}

export default LeftBarTwo   