import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    let [width, setWidth] = useState()
    let navigate = useNavigate()
    setTimeout(() => {
        const handleScroll = () => {
            if (window.innerWidth < 800) {
                setWidth(true)
            }
            else {
                setWidth(false)
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }, 100);
    return (
        <div className='text-center text-white'>
            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 home-card-1' style={{height:'90vh'}}>
                <div className="col"></div>
                <div className="col" style={{ paddingTop: width ? '' : '20vmin' }}>
                    <div className="m-3">
                        <h1>Welcome to CommunityLink</h1>
                        <p className='mt-3'>Connecting Neighbors, Building Community</p>
                        <p className='justify'>Welcome to the official communication platform for CommunityLink! Our website is designed to enhance communication, streamline processes, and foster a vibrant community. </p>
                        <button className='btn btn-success d-block mx-auto' onClick={() => navigate('/login')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 home-card-2' style={{height:'90vh'}}>
                <div className="col" style={{ paddingTop: width ? '' : '30vmin' }}>
                    <div className="m-3">
                        <h3>Manage your Community Efficiently</h3>
                        <p className='mt-3'>Establish and customize your community platform with ease.</p>
                        <p>Delegate administrative responsibilities to additional community managers.</p>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 home-card-3' style={{height:'90vh'}}>
                <div className="col"></div>
                <div className="col" style={{ paddingTop: width ? '' : '20vmin' }}>
                    <div className="m-3">
                        <h3>Communication and Engagement</h3>
                        <p className='mt-3'>Post and edit important updates and notices for all residents.</p>
                        <p>Moderate and engage in community discussions by posting topics and managing content.</p>
                        <p>Create polls to gather resident feedback and insights.</p>
                        <p>Stay updated with the latest news and important notices.</p>
                    </div>
                </div>
            </div>
            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 home-card-4' style={{height:'90vh'}}>
                <div className="col" style={{ paddingTop: width ? '' : '20vmin' }}>
                    <div className="m-3">
                        <h3>Community Service and Participation</h3>
                        <p className='mt-3'>Seamlessly register and access the community platform.</p>
                        <p>Participate in community discussions by posting comments and engaging with neighbors.</p>
                        <p>Register for volunteer activities to contribute to community wellbeing.</p>
                        <p>Manage visitor permissions to ensure a secure environment.</p>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Home
