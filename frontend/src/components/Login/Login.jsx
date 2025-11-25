import { useState } from 'react'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import './Login.css'

function Sign() {
    let [p, setP] = useState(1)
    function childrenSetP(p) {
        setP(p)
    }
    return (
        <div className='login' style={{width:'100vw',height:'95vh'}}>
            <div className='mx-auto col-lg-8 col-md-10 col-sm-12 rounded-4' style={{ height: '85vh',marginBottom: '5vh', position: 'relative', overflow: 'hidden' }}>
                <div className='row rounded-4 mx-auto sign' style={{ width: '100%', height: '100%' }}>
                    <div className={`col signina ${p === 1 && 'signinb'}`} style={{
                        position: 'relative', top: '23%'
                    }}>
                        <Signin />
                    </div>
                    <div className={`col signupa ${p === 2 && 'signupb'}`} style={{ position: 'relative', top: '10%' }}>
                        <Signup fun={childrenSetP} />
                    </div>
                </div>
                <div className={`sign-backa ${p === 2 && 'sign-backb'}  ${p === 1 && 'sign-backc'}`}></div>
                <div className={`text-white text-center signin-text1a ${p === 2 && 'signin-text1b'} ${p === 1 && 'signin-text1c'}`}>
                    <h4>Not Yet Signed Up?</h4>
                    <button className='btn btn-success' onClick={() => setP(2)}>Signup</button>
                </div>
                <div className={`text-white text-center signup-text1a ${p === 1 && 'signup-text1b'} ${p === 2 && 'signup-text1c'}`}>
                    <h4>Already Signed Up?</h4>
                    <button className='btn btn-success' onClick={() => setP(1)}>Signin</button>
                </div>
            </div >
        </div>
    )
}

export default Sign