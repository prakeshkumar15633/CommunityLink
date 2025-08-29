import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCommunityThunk } from '../../../redux/slices/communitySlice'
import axios from 'axios'
import ReactLoading from 'react-loading'

function Feedback() {
    let dispatch = useDispatch()
    let { cid } = useParams()
    let { currentUser } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityStatus, communityArray, communityErrorOccurred, communityErrMsg } = useSelector((state) => state.getCommunityReducer);
    let [f, setF] = useState(false)
    let [arr, setArr] = useState([])
    let [userType, setUserType] = useState()
    useEffect(() => {
        setArr(communityArray.filter((ele) => {
            return ele.id == cid
        })[0])
        setF(true)
        setUserType(localStorage.getItem('userType'))
    })
    let [text, setText] = useState("")
    async function commentSubmit() {
        let res = await axios.put('http://localhost:4000/user-api/feedback', {
            id: cid,
            username: currentUser.username,
            comment: text,
            time: new Date()
        })
        console.log(res.data.message)
        if (res.data.message == "Feedback updated successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div>
                <h3>Feedback</h3>
                <p>Give your opinios and feedbacks here</p>
                {f && communityArray.map((ele) => {
                    if (ele.id == cid) {
                        return (
                            <div>
                                {ele.feedback.map((com) => {
                                    return (<div className={`border border-1 p-1 m-3 ${com.username == currentUser.username ? "text-end" : ""} rounded rounded-3 bg-light`}>
                                        <b style={{
                                            color: `${communityArray.filter((comarrele) => {
                                                if (comarrele.id == cid) {
                                                    return comarrele
                                                }
                                            })[0].admins.map((arrele) => arrele.username).includes(com.username) ? "blue" : ""}`
                                        }}>{com.username == currentUser.username ? "You" : cap(com.username)}</b>
                                        <br />
                                        {com.comment}
                                    </div>)
                                })}
                                {ele.feedback.length == 0 && <p>No comments yet</p>}
                                < div >
                                    <div>
                                        <input className='form-control' type='text' placeholder='Add a comment' onChange={(e) => setText(e.target.value)} />
                                    </div>
                                    <div>
                                        <button className='btn btn-success m-3 d-block mx-auto' onClick={() => commentSubmit()}>Post</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div >}
        </div>
    )
}

export default Feedback
