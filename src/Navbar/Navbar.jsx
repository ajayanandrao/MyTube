import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import aj from "./../img/ajj.jpg"
import yutube from "./../img/youtube.png";
import { useDispatch, useSelector } from 'react-redux';
import { bigOff, bigOn, homeOn, shortOff } from '../Redux/CounterSlice';
import { RiVideoLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import v from "./../img/logo192.png"

const Navbar = () => {

    const dispatch = useDispatch();

    const handleHomeOn = () => {
        dispatch(homeOn());
        dispatch(shortOff());
    }

    const [addVideo, setAddVideo] = useState(false)
    const [vchat, setVchat] = useState(false)

    const addVideobtn = () => {
        setAddVideo(!addVideo);
    }
    const VchatVideobtn = () => {
        setVchat(!vchat);
    }

    const Short = useSelector((state) => state.counter.loading);
    const BigNav = useSelector((state) => state.counter.bigNav);

    const bigNavbtn = () => {
        if (BigNav === true) {
            dispatch(bigOff())
        } else {
            dispatch(bigOn())
        }
    }

    return (
        <div className='navbar-container'>
            <div className="loading-div">
                <div class="progress">
                    <div class="progress-bar" style={{
                        width: `${Short === true ? 100 : 0}%`,
                        background: `${Short === true ? "red" : "#151515"}`,
                    }}

                        role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            {vchat &&
                <div className="vchat-login-div">

                    <div className="vchat-login-card">

                        <IoClose className='close-v' onClick={VchatVideobtn} />

                        <div className="d-flex mb-3 align-items-center">
                            <img src={v} className='vlogo me-3' alt="" />
                            <h3>VChat</h3>
                        </div>

                        <div className="vchat-form">
                            <input type="Email" className='vchat-input' placeholder='Email' />
                            <input type="Password" placeholder='Password' className='vchat-input' />
                            <button className='btn btn-primary mt-3 me-3'>Login</button>
                            <a href="https://ajayanandrao.github.io/VChat/" target='blank'>
                                Register to VChat
                            </a>
                        </div>

                    </div>
                </div>
            }
            <div className='navbar-main'>
                <FiMenu className='menu' onClick={bigNavbtn} />
                <Link to="/" className='link' onClick={handleHomeOn} >
                    <div className='navbar-name'><img src={yutube} className='navbar-icon' alt="" /> MyTube</div>
                </Link>
                <div className="nav-input-div">
                    <div className='nav-search-div'>
                        <input type="text" placeholder='Search' className='nav-search' />
                        <IoSearchOutline className='nav-search-icon' />
                    </div>
                    <div>
                        <FaMicrophone className='microfone-icon' />
                    </div>
                </div>

                <div className='add-video-div'>

                    {addVideo &&
                        <div className="add-video-opt">
                            <div className="add-video-opt-inner">
                                <RiVideoLine className='add-video-opt-icon' />
                                <span className='add-video-opt-name'>Upload Video</span>
                            </div>
                            <div className="add-video-opt-inner">
                                <SiYoutubeshorts className='add-video-opt-icon' />
                                <span className='add-video-opt-name'>Upload Video</span>
                            </div>
                        </div>
                    }
                    <RiVideoAddFill style={{ fontSize: "20px" }} onClick={addVideobtn} />
                    <IoNotifications style={{ fontSize: "20px" }} />
                    <img src={aj} className='nav-user-img' alt="" onClick={VchatVideobtn} />
                </div>
            </div>
        </div>
    )
}

export default Navbar