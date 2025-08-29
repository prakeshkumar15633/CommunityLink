import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css'
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { resetUserState } from '../../redux/slices/userSlice';
import { resetCommunityState } from '../../redux/slices/communitySlice';
import logo from '../../assets/logo_cropped_2.png'
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { MdOutlineLogin } from "react-icons/md";

function Navbar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [s1, setS1] = useState({})
    let [s2, setS2] = useState({})
    let [s3, setS3] = useState({})
    let [s4, setS4] = useState({})
    let [s5, setS5] = useState({})
    let [f, setF] = useState(false)
    let style = {
        // backgroundImage: "radial-gradient(rgb(0, 0, 255),rgb(0, 0, 255, 0.25))",
        // backgroundImage:'linear-gradient(-45deg, #df4adf, #520852)',
        backgroundColor: '#B235B2',
        borderRadius: '7px'
    }
    let path = useLocation().pathname
    useEffect(() => {
        if (path == '/') {
            setS1(style)
            setS2({})
            setS3({})
            setS4({})
            setS5({})
        }
        else if (path == '/login') {
            setS1({})
            setS2(style)
            setS4({})
            setS5({})
            setF(false)
        }
        else if (path == '/communities') {
            setS1({})
            setS2({})
            setS3(style)
            setS4({})
        }
        else if (path == '/user-profile') {
            setS1({})
            setS2({})
            setS3({})
            setS4(style)
            setF(true)
        }
    })
    let menuOptions = [
        {
            text: 'Home',
            to: '',
            icon: <HomeIcon style={{ fontSize: '30px' }} />
        },
        !f && {
            text: 'Login',
            to: 'login',
            icon: <MdOutlineLogin style={{ fontSize: '30px' }} />
        },
        f && {
            text: 'Community',
            to: 'communities',
            icon: <MdOutlineLogin style={{ fontSize: '30px' }} />
        },
        f && {
            text: 'Signout',
            to: 'login',
            icon: <MdOutlineLogin style={{ fontSize: '30px' }} />
        },
        f && {
            text: 'Profile',
            to: 'user-profile',
            icon: <FaUser style={{ fontSize: '30px' }} />
        }
    ]
    let [openMenu, setOpenMenu] = useState(false);
    const [dropDownFlag, setDropDownFlag] = useState(false);
    function handleResize() {
        if (window.innerWidth < 700) {
            setDropDownFlag(true)
        }
        else {
            setDropDownFlag(false)
        }
    }
    window.addEventListener("resize", () => handleResize);
    useEffect(() => {
        handleResize()
    })
    function signout() {
        dispatch(resetUserState())
        dispatch(resetCommunityState())
    }
    return (
        <div>
            {!dropDownFlag && <div className='row header-element'>
                <div className='col-3' onClick={()=>navigate('/')} style={{ position: 'relative' }}>
                    <img className='m-2' src={logo} style={{ height: '55px', position: 'absolute', top: 0, left: 0 }} />
                </div>
                <div className='col-9 d-flex justify-content-end p-2'>
                    <ul className="nav text-center" style={{ fontSize: '1.3rem' }}>
                        <li className="nav-item li">
                            <NavLink className="nav-link text-white" to="/" style={{ ...s1, width: '10rem' }}>
                                Home
                            </NavLink>
                        </li>
                        {!f && <div className='d-flex pe-2'>
                            <li className="nav-item li">
                                <NavLink className="nav-link text-white" to="login" style={{ ...s2, width: '10rem' }}>
                                    Login
                                </NavLink>
                            </li>
                            {/* <li className="nav-item li">
                            <NavLink className="nav-link text-white" to="signin" style={{ ...s3, width: '10rem' }}>
                                Signin
                            </NavLink>
                        </li> */}
                        </div>}
                        {f && <div className='d-flex'>
                            <li className="nav-item li">
                                <NavLink className="nav-link text-white" to="communities" style={{ ...s3, width: '10rem' }}>
                                    Community
                                </NavLink>
                            </li>
                            <li className="nav-item li">
                                <NavLink className="nav-link text-white" to="login" style={{ width: '10rem' }} onClick={() => {
                                    signout()
                                    setF(false)
                                }}>
                                    Signout
                                </NavLink>
                            </li>
                            <li className="nav-item li pe-2">
                                <NavLink className="nav-link text-white" to="user-profile" style={{ ...s4, width: '5rem' }}>
                                    <FaUser />
                                </NavLink>
                            </li>
                        </div>}
                    </ul>
                </div>
            </div>}
            {dropDownFlag && <div>
                <div className='row navbar-menu-container' style={{ padding: '10px' }}>
                    <div className='col-4'>
                        <img className='p-1 rounded-4' src={logo} height={'70px'} style={{ right: 0 }} />
                    </div>
                    <div className='col-8 d-flex justify-content-end'>
                        <HiOutlineBars3 style={{ color: 'black', fontSize: '30px', marginTop: '20px' }} onClick={() => setOpenMenu(true)} />
                    </div>
                </div>
                <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='top' >
                    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
                        <List>
                            {menuOptions.filter((item)=>{
                                if(item==false){
                                    return false
                                }
                                else{
                                    return true
                                }
                            }).map((item) => {
                                return(<ListItem key={item.text} disablePadding>
                                    <ListItemButton onClick={() => {
                                        navigate(item.to)
                                        if (item.text == 'Signout') {
                                            signout()
                                            setF(false)
                                        }
                                    }} style={{ width: '100%' }}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.text}</ListItemText>
                                    </ListItemButton>
                                </ListItem>)
                            })}
                        </List>
                    </Box>
                </Drawer>
            </div>}
        </div>
    )
}

export default Navbar