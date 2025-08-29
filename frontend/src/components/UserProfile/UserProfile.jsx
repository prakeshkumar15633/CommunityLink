import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';

function UserProfile() {
    let navigate = useNavigate()
    let { currentUser } = useSelector((state) => state.userLoginReducer);
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div className="p-3 user-profile text-center" style={{height:'80vh'}}>
            <h2>Welcome back {cap(currentUser.username)}</h2>
            <div className="row m-4 text-start">
                <div className="col-4 p-3 border border-1 rounded-2" style={{backgroundImage:'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))'}}>
                    <p>Username : {currentUser.username}</p>
                    <p>Email : {currentUser.email}</p>
                    <p>User Type : {cap(currentUser.userType)}</p>
                    <p>Number of communities joined : {currentUser.community.length}</p>
                </div>
                <div className="col-8 p-3 text-center">
                    <h4 className="fs-2 user-profile-heading" style={{ marginTop: '50px' }}>View your communities</h4>
                    <button className="btn btn-success d-block mx-auto" onClick={() => navigate('/communities')}>View</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile