import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: true,
    short: false,
    home: true,
    loading: false,
    bigNav: true,
}

export const CounterSlice = createSlice({

    name: "counter",
    initialState,

    reducers: {
        // add: (state, action) => {
        //     state.count += 1;
        // },
        buttonTrue: (state, action) => {
            state.count = true
        },
        buttonFalse: (state, action) => {
            state.count = false
        },

        // ------------------------------------------home
        shortOn: (state, action) => {
            state.short = true
        },
        shortOff: (state, action) => {
            state.short = false
        },

        // ------------------------------------------home
        homeOn: (state, action) => {
            state.home = true
        },
        homeOff: (state, action) => {
            state.home = false
        },
        // ------------------------------------------loading
        loadOn: (state, action) => {
            state.loading = true
        },
        loadOff: (state, action) => {
            state.loading = false
        },
        // ------------------------------------------BigNav
        bigOn: (state, action) => {
            state.bigNav = true
        },
        bigOff: (state, action) => {
            state.bigNav = false
        }
    }

});


export const {
    add, buttonTrue, buttonFalse,
    shortOn, shortOff, homeOff,
    homeOn, loadOn, loadOff,
    bigOn, bigOff
} = CounterSlice.actions;

export default CounterSlice.reducer; 