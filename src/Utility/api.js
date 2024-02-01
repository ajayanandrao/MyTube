import axios from "axios";

const Base_Url = "https://youtube138.p.rapidapi.com";

const options = {
    params: {
        hl: 'en',
        gl: 'US'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};


export const fetchDataFromApi = async (url) => {
    try {
        const response = await axios.get(`${Base_Url}/${url}`, options);
        const { data } = response;
        return data;
    } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error for the calling code to handle
    }
    // const { data } = await axios.get{`${Base_Url}/${url}`, options
};

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }