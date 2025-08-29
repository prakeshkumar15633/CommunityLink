import React, { useEffect, useState, useRef } from 'react';
import './Home1.css'
import { useNavigate } from 'react-router-dom';
import home1 from '../../assets/home1.jpg'
import home2 from '../../assets/home2.jpg'
import home3 from '../../assets/home3.jpg'
import home4 from '../../assets/home4.jpg'

function Home() {
    let navigate = useNavigate()
    let [width, setWidth] = useState(false)
    let shapeStyle = [
        // '#6a040f',
        '#dc2f02',
        // '#f48c06',
        // '#ffba08'
    ]
    let eleRef1 = useRef(null);
    let eleRef2 = useRef(null);
    let eleRef3 = useRef(null);
    let eleRef4 = useRef(null);
    let [isVis1, setVis1] = useState()
    let [isVis2, setVis2] = useState()
    let [isVis3, setVis3] = useState()
    let [isVis4, setVis4] = useState()
    setTimeout(() => {
        const handleScroll = () => {
            if (window.innerWidth < 800) {
                setWidth(true)
            }
            else {
                setWidth(false)
            }
            const observer1 = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVis1(true);
                        observer1.unobserve(entry.target);
                    }
                },
                { threshold: 0.75 } // Intersection threshold
            );
            const observer2 = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVis2(true);
                        observer2.unobserve(entry.target);
                    }
                },
                { threshold: 0.75 } // Intersection threshold
            );
            const observer3 = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVis3(true);
                        observer3.unobserve(entry.target);
                    }
                },
                { threshold: 0.75 } // Intersection threshold
            );
            const observer4 = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVis4(true);
                        observer4.unobserve(entry.target);
                    }
                },
                { threshold: 0.75 } // Intersection threshold
            );
            if (eleRef1.current) {
                observer1.observe(eleRef1.current)
            }
            if (eleRef2.current) {
                observer2.observe(eleRef2.current)
            }
            if (eleRef3.current) {
                observer3.observe(eleRef3.current)
            }
            if (eleRef4.current) {
                observer4.observe(eleRef4.current)
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }, 100);
    return (
        <div className='m-3 text-center'>
            <div ref={eleRef1} className={`row row-cols-1 row-cols-sm-1 row-cols-md-2 m-3 home-card-1a ${isVis1 ? 'home-card-1b' : ''}`}>
                <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home1} style={{ width: '80%' }} />
                    </div>
                </div>
                <div className="col" style={{ paddingTop: width ? '' : '20vmin' }}>
                    <div className="m-3">
                        <h1>Welcome to CommunityLink</h1>
                        <p className='mt-3'>Connecting Neighbors, Building Community</p>
                        <p className='justify'>Welcome to the official communication platform for CommunityLink! Our website is designed to enhance communication, streamline processes, and foster a vibrant community. </p>
                        <button className='btn btn-success d-block mx-auto' onClick={() => navigate('/signup')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div ref={eleRef2} className={`row row-cols-1 row-cols-sm-1 row-cols-md-2 m-3 home-card-2a ${isVis2 ? 'home-card-2b' : ''}`}>
                {width && <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home2} style={{ width: '80%' }} />
                    </div>
                </div>}
                <div className="col" style={{ paddingTop: width?'':'30vmin' }}>
                    <div className="m-3">
                        <h3>Manage your Community Efficiently</h3>
                        <p className='mt-3'>Establish and customize your community platform with ease.</p>
                        <p>Delegate administrative responsibilities to additional community managers.</p>
                    </div>
                </div>
                {!width && <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home2} style={{ width: '80%' }} />
                    </div>
                </div>}
            </div>
            <div ref={eleRef3} className={`row row-cols-1 row-cols-sm-1 row-cols-md-2 m-3 home-card-3a ${isVis3 ? 'home-card-3b' : ''}`}>
                <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home3} style={{ width: '80%' }} />
                    </div>
                </div>
                <div className="col" style={{ paddingTop: width?'':'20vmin' }}>
                    <div className="m-3">
                        <h3>Communication and Engagement</h3>
                        <p className='mt-3'>Post and edit important updates and notices for all residents.</p>
                        <p>Moderate and engage in community discussions by posting topics and managing content.</p>
                        <p>Create polls to gather resident feedback and insights.</p>
                        <p>Stay updated with the latest news and important notices.</p>
                    </div>
                </div>
            </div>
            <div ref={eleRef4} className={`row row-cols-1 row-cols-sm-1 row-cols-md-2 m-3 home-card-4a ${isVis4 ? 'home-card-4b' : ''}`}>
                {width && <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home4} style={{ width: '80%' }} />
                    </div>
                </div>}
                <div className="col" style={{ paddingTop: width?'':'20vmin' }}>
                    <div className="m-3">
                        <h3>Community Service and Participation</h3>
                        <p className='mt-3'>Seamlessly register and access the community platform.</p>
                        <p>Participate in community discussions by posting comments and engaging with neighbors.</p>
                        <p>Register for volunteer activities to contribute to community wellbeing.</p>
                        <p>Manage visitor permissions to ensure a secure environment.</p>
                    </div>
                </div>
                {!width && <div className="col">
                    <div className="m-3">
                        <img className='rounded-3 d-block mx-auto' src={home4} style={{ width: '80%' }} />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Home;
