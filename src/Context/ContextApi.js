import { createContext, useEffect, useState } from "react";
import {fetchDataFromApi} from "./../Utility/api";


export const Context = createContext();

export const AppContext = (props) => {

    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResutl] = useState(false);
    const [selectCategory, setSelectCategory] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategory(selectCategory)
    }, [selectCategory]);

    const fetchSelectedCategory = (query) => {
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then((res)=>{
            console.log(res);
            setLoading(false);
        });
    }

    return (
        <Context.Provider value={{
            loading,
            setLoading,
            searchResult,
            setSelectCategory,
            selectCategory,
            mobileMenu,
            setMobileMenu

        }}>
            {props.children}
        </Context.Provider>
    )

}