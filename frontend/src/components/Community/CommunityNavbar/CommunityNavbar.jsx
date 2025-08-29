import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import './CommunityNavbar.css'

function CommunityNavbar() {
    let path = useLocation().pathname.split('/')
    let { currentUser, } =
        useSelector((state) => state.userLoginReducer);
    let [arr] = useState([
        {
            name: "Manage",
            path: ""
        },
        currentUser.userType !== "security" && {
            name: "Discussion Forum",
            path: "discussion-forums"
        },
        {
            name: "Announcements",
            path: "announcements"
        },
        currentUser.userType !== "security" && {
            name: "Poll",
            path: "polls"
        },
        {
            name: "Business",
            path: "businesses"
        },
        {
            name: "Events",
            path: "events"
        },
        currentUser.userType !== "security" && {
            name: "Feedback",
            path: "feedback"
        },
        currentUser.userType !== "security" && {
            name: "Sports Reservation",
            path: "sports"
        },
        currentUser.userType !== "security" && {
            name: "Volunteer",
            path: "volunteer"
        },
        {
            name: "Visitor",
            path: "visitor"
        }
    ])
    let [farr, setFarr] = useState([false, false, false, false, false, false, false, false, false, false])
    let style = {
        // backgroundImage: 'radial-gradient(ellipse at 0% 50%, rgb(0, 0, 255, 1),rgb(0, 0, 255, 0))'
        // backgroundImage: 'linear-gradient(rgb(0,0,255,0), rgb(0,0,255,1), rgb(0,0,255,0))'
        backgroundColor:'#B235B2',
        borderRadius:'7px'
    }
    useEffect(() => {
        if (path.length === 3) {
            let ar = [false, false, false, false, false, false, false, false, false, false]
            ar[0] = true
            setFarr(ar)
        }
        else {
            let ar = [false, false, false, false, false, false, false, false, false, false]
            ar = ar.map((ele, ind) => {
                if (arr[ind].path === path[3]) {
                    return true
                }
                else {
                    return false
                }
            })
            setFarr(ar)
        }
    },[farr,path,arr])
    return (
        <div className='comnavbar p-3'>
            <ul className="nav text-center" style={{ fontSize: '1.3rem' }}>
                {arr.map((ele, ind) => {
                    if (ele) {
                        return (
                            <li className="nav-item my-auto li text-start px-2" style={farr[ind] ? { ...style, width: "100%" } : { width: "100%" }}>
                                <NavLink className="nav-link text-white" to={ele.path}>
                                    {ele.name}
                                </NavLink>
                            </li>
                        )
                    }
                    else{
                        return null
                    }
                })}
            </ul>
        </div>
    )
}

export default CommunityNavbar
