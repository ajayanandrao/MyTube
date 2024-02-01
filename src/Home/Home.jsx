import React, { useEffect } from 'react';
import axios from 'axios';
import "./Home.scss";
import VComponet from './VideoComponent/VComponet';
import Short from './Short/Short';
import LeftBar from './LeftBar/LeftBar';
import LeftBarTwo from './LeftBarTwo/LeftBarTwo';
import VComponentOne from './VideoComponent/VComponentOne';
import VComponentTwo from './VideoComponent/VComponentTwo';
import Navbar from '../Navbar/Navbar';
import vchat from "./../img/logo192.png"

import { SiYoutubeshorts } from "react-icons/si";
import Movie from './Movie';

const Home = () => {
    const API_KEY = 'AIzaSyA6Dd6FBpG_Baqe3aZffXfxLdJYMAOPe58';  // Replace with your actual API key
    const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/';

    // Example function to fetch video details by video ID
    const getVideoDetails = async (videoId) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}videos`, {
                params: {
                    key: API_KEY,
                    part: 'snippet,contentDetails,statistics',
                    id: videoId,
                },
            });

            // Handle the response data 
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching video details', error);
        }
    };

    useEffect(() => {
        // Replace 'YOUR_VIDEO_ID' with an actual YouTube video ID

        // getVideoDetails('HTvJl71zmf4');
    }, []);

    return (
        <div className='home-main'>
            <LeftBar />
            <LeftBarTwo />
            <VComponentOne />

            <Short />

            <a href="https://ajayanandrao.github.io/VChat/" target='blank'>
                <div className='d-flex'>
                    <div className="left"></div>
                    <div className="add-contaienr">
                        <div className=' add-div'>
                            <div>
                                <img src={vchat} className='add-logo me-3' alt="" />
                            </div>
                            <div>
                                <h3>Are you registered to 🌟 VChat 🌟 in the 2024</h3>
                                <h5> Stay connected with friends through seamless and secure messaging. Share your thoughts, laughter, and memorable moments in real-time.</h5>
                                <a href="https://ajayanandrao.github.io/VChat/" target='blank'>
                                    <div style={{ fontSize: "16px", fontWeight: "700" }}>🎉 Join Today</div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </a>

            <VComponentTwo />
        </div>
    );
};

export default Home;
