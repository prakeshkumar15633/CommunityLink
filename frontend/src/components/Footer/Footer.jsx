import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo_cropped_2.png'
import './Footer.css'

function Footer() {
    let navigate=useNavigate()
    return (
        <div className='bg-black'>
            <div className="footer-element text-light p-3 my-auto row" style={{width:'100vw'}}>
                <div className="col">
                <img className='d-block mx-auto' src={logo} style={{height:'50px'}} alt="img not found"/>
                </div>
                <div className="col">
                    <button className='btn btn-success d-block mx-auto' onClick={()=>navigate('/')}>Explore</button>
                </div>
            </div>
            <p className='text-white text-center m-0'>All rights reserved ©</p>
        </div>
    )
}

export default Footer