import React from 'react'
import List from './List'
import Chat from './Chat'
import Detail from './Detail'
import "./home.css"

const Home = () => {
    return (
        <>
            <List />
            <Chat />
            <Detail />
        </>
    )
}

export default Home