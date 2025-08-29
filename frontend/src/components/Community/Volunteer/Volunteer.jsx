import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';
import axios from 'axios';
import ReactLoading from 'react-loading'

function Volunteer() {
    let dispatch = useDispatch()
    let { cid } = useParams()
    let { currentUser, } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } = useSelector((state) => state.getCommunityReducer);
    async function applySubmitButton(id) {
        let res = await axios.put('http://localhost:4000/user-api/volunteer', {
            cid: cid,
            id: id,
            username: currentUser.username
        })
        console.log(res.data.message)
        if (res.data.message == "Registered for volunteering successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending && <div>
                <h3>Volunteer</h3>
                {communityArray.map((ele) => {
                    if (ele.id == cid) {
                        return (
                            <div>
                                {ele.event.filter((event) => {
                                    return event.type == 'public'
                                }).map((eve) => {
                                    return (<div className='p-2'>
                                        <div className='col border border-1 rounded-3 p-3 bg-light'>
                                            <h5>{eve.eventName}</h5>
                                            <p>- {eve.hostUsername}</p>
                                            <p>Date : {eve.date}</p>
                                            <p>{cap(eve.type)} Events</p>
                                            <p>Venue : {eve.venue}</p>
                                            <h6>Volunteers :</h6>
                                            {eve.volunteer.map((v) => {
                                                return (
                                                    <p>{v}</p>
                                                )
                                            })}
                                            <button className='btn btn-success p-2' onClick={() => { applySubmitButton(eve.id) }}>Apply for volunteering</button>
                                        </div>
                                    </div>)
                                })}
                            </div>
                        )
                    }
                })}
                {communityArray.filter((ele) => {
                    if (ele.id == cid) {
                        return true
                    }
                })[0].event.length == 0 && <p>No events yet to register for volunteering</p>}
            </div>}
        </div>
    )
}

export default Volunteer
