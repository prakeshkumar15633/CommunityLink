import React, { useState, useEffect } from 'react'
import light from '../../assets/street_light.png'
import './StreetLight.css'

function StreetLight() {
    let [lightOpacity, setLightOpacity] = useState(0)
    let [lightOpacityFlag, setLightOpacityFlag] = useState(0)
    let [fullOpacity, setFullOpacity] = useState(false)
    let [style, setStyle] = useState('')

    // setTimeout(() => {
    //     console.log(lightOpacity)
    //     if(lightOpacity==100){
    //         console.log(1)
    //         setLightOpacity(95)
    //         setLightOpacityFlag(1)
    //     }
    //     else if(lightOpacity==0){
    //         setLightOpacity(5)
    //         setLightOpacityFlag(0)
    //     }
    //     else{
    //         if(lightOpacityFlag==0){
    //             setLightOpacity(lightOpacity+5)
    //         }
    //         else{
    //             setLightOpacity(lightOpacity-5)
    //         }
    //     }
    // }, 62.5)

    useEffect(() => {
        const timer1 = setTimeout(lightOpacityFlag == 0 && (() => {
            if (lightOpacityFlag == 0) {
                setLightOpacity(100)
                setLightOpacityFlag(1)
            }
        }), 1000)
        if (lightOpacityFlag == 1) {
            clearTimeout(timer1)
        }
        const timer2 = setTimeout(() => {
            if (lightOpacityFlag == 1) {
                setLightOpacity(0.1)
                setLightOpacityFlag(2)
            }
        }, 100)
        if (lightOpacityFlag == 2) {
            clearTimeout(timer2)
        }
        const timer3 = setTimeout(() => {
            if (lightOpacityFlag == 2) {
                setStyle('home-light2')
                setFullOpacity(true)
                setLightOpacity(100)
                setLightOpacityFlag(3)
            }
        }, 400)
        if (lightOpacityFlag == 3) {
            clearTimeout(timer3)
        }
    })
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ opacity: fullOpacity ? 1 : 0 }}>
                <div className={`row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2`} style={{ height: '80vmin' }}>
                    <div className='col mb-5'>
                        <div className='mx-auto' style={{ position: 'relative', height: '80vmin', width: '80vmin', padding: '0' }}>
                            <div style={{ height: '100%', width: '100%' }}>
                                <img className='d-block mx-auto' src={light} style={{ height: '100%' }} />
                            </div>
                            <div className={`home-light ${style}`} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                                <div className='light-triangle' style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                                </div>
                                <div className='light rounded-circle' style={{ width: '26vmin', height: '26vmin', position: 'absolute', top: 'calc(10% - 13vmin)', left: 'calc(50% - 13vmin)' }}>
                                </div>
                                <div className='light-circle rounded-circle' style={{ width: '40%', height: '8%', position: 'absolute', bottom: '-4%', left: '30%' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col text-white home-light ${style}`} style={{ opacity: lightOpacity / 100, position: 'relative', height: '80vmin' }}>
                        {/* <div style={{ width: '80vmin', height: '80vmin', margin: 'auto', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <div className={`homea2 ${homeStyle ? 'homeb2' : ''}`}></div>
                        </div> */}
                    </div>
                </div>
            </div>
            {!fullOpacity && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                <div className='row' style={{ height: '80vmin' }}>
                    <div className='col' style={{ position: 'relative' }}>
                        <div className='' style={{ height: '80vmin', width: '80vmin', margin: 'auto', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <div style={{ height: '100%', width: '100%' }}>
                                <img className='d-block mx-auto' src={light} style={{ height: '100%', opacity: lightOpacity >= 5 ? lightOpacity : '0.75' }} />
                            </div>
                            <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: lightOpacity / 100 }}>
                                <div className='light-triangle' style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                                </div>
                                <div className='light rounded-circle' style={{ width: '26vmin', height: '26vmin', position: 'absolute', top: 'calc(10% - 13vmin)', left: 'calc(50% - 13vmin)' }}>
                                </div>
                                <div className='light-circle rounded-circle' style={{ width: '40%', height: '8%', position: 'absolute', bottom: '-4%', left: '30%' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'></div>
                </div>
            </div>}
        </div>
    )
}

export default StreetLight
