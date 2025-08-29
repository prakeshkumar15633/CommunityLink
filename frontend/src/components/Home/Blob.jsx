import React from 'react'
import './Blob.css'

function Blob(params) {
    let homeStyle=params.data
    console.log(homeStyle)
    return (
        <div>
            <div style={{ width: '80vmin', height: '80vmin', margin: 'auto', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <div className={`homea ${homeStyle ? 'homeb' : ''}`}></div>
                <div className={`home1a ${homeStyle ? 'home1b' : ''}`}></div>
                <div className={`home2a ${homeStyle ? 'home2b' : ''}`}></div>
                <div className={`home3a ${homeStyle ? 'home3b' : ''}`}></div>
                <div className={`home4a ${homeStyle ? 'home4b' : ''}`}></div>
                <div className={`home5a ${homeStyle ? 'home5b' : ''}`}></div>
                <div className={`home6a ${homeStyle ? 'home6b' : ''}`}></div>
                <div className={`home7a ${homeStyle ? 'home7b' : ''}`}></div>
                <div className={`home8a ${homeStyle ? 'home8b' : ''}`}></div>
                <div className={`home9a ${homeStyle ? 'home9b' : ''}`}></div>
                <div className={`home10a ${homeStyle ? 'home10b' : ''}`}></div>
                <div className={`home11a ${homeStyle ? 'home11b' : ''}`}></div>
                <div className={`home12a ${homeStyle ? 'home12b' : ''}`}></div>
                <div className={`home13a ${homeStyle ? 'home13b' : ''}`}></div>
                <div className={`home14a ${homeStyle ? 'home14b' : ''}`}></div>
                <div className={`home15a ${homeStyle ? 'home15b' : ''}`}></div>
                <div className={`home16a ${homeStyle ? 'home16b' : ''}`}></div>
            </div>
        </div>
    )
}

export default Blob
