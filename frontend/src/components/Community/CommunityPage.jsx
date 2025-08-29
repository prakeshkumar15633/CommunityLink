import { Outlet } from 'react-router-dom';
import CommunityNavbar from './CommunityNavbar/CommunityNavbar';

function CommunityPage() {
    return (
        <div className='row row-cols-1 row-cols-md-2'>
            <div className='col bg-black' style={{width:"20rem"}}>
                <CommunityNavbar/>
            </div>
            <div className='col'>
                <Outlet/>
            </div>
        </div>
    )
}

export default CommunityPage
