import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';

function Event() {
    let dispatch = useDispatch()
    // let navigate = useNavigate()
    let path = useLocation().pathname.split('/')
    let { cid} = useParams()
    let { currentUser, } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } = useSelector((state) => state.getCommunityReducer);
    // let [textarea, setTextarea] = useState()
    let [arr, setArr] = useState()
    // let [index, setIndex] = useState(-1)
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    useEffect(() => {
        if (arr !== undefined) {
            setArr(arr = communityArray.filter((ele) => {
                return ele.id === cid
            })[0])
        }
    })
    // async function editAnnouncement(ind) {
    //     let res = await axios.put("http://localhost:4000/com-admin-api/announcement/edit", {
    //         id: cid,
    //         index: ind,
    //         announcement: textarea
    //     })
    //     if (res.data.message === "Announcement updated successfully") {
    //         console.log("Announcement updated successfully")
    //         dispatch(getCommunityThunk(currentUser.community));
    //     }
    // }
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // let [err, setErr] = useState('')
    let [formErr, setFormErr] = useState("")
    let [formF, setFormF] = useState(true)
    async function handleFormSubmit(event) {
        console.log(event)
        let res = await axios.put('http://localhost:4000/com-admin-api/event', {
            cid: cid,
            id: `${Date.now()}`,
            hostUsername: event.hostUsername,
            eventName: event.eventName,
            date: event.date,
            type: event.eventType,
            venue: event.venue,
            volunteer: []
        })
        console.log(res.data.message)
        if (res.data.message === "Event created successfully") {
            setFormErr(res.data.message)
            setFormF(true)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            setFormErr(res.data.message)
            setFormErr(true)
        }
    }
    async function deleteEventSubmit(idd) {
        let res = await axios.put('http://localhost:4000/com-admin-api/event/delete', {
            cid: cid,
            id: idd
        })
        if (res.data.message === "Event deleted successfully") {
            console.log(res.data.message)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            console.log(res.data.message)
        }
    }
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div>
                {localStorage.getItem('userType') === 'comAdmin' && currentUser.userType !== 'security' && <div>
                    <h3>Make an Event</h3>
                    {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Event</button>}
                    {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                    {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 bg-light border border-1">
                        <h3 className="text-center mb-3">Make an Event</h3>
                        {/* {err.length !== 0 && <p className="text-danger fs-3">{err}</p>} */}
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="mb-3">
                                <label htmlFor="hostUsername" className="form-label">
                                    Host Username
                                </label>
                                <input type="text" id="hostUsername" className="form-control shadow-sm" placeholder='Host Username'
                                    {...register("hostUsername", {
                                        required: true
                                    })}
                                />
                                {errors.hostUsername?.type === "required" && (
                                    <p className="text-danger">Host Username is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eventName" className="form-label">
                                    Event Name
                                </label>
                                <input type="text" id="eventName" className="form-control shadow-sm" placeholder='Event Name'
                                    {...register("eventName", {
                                        required: true
                                    })}
                                />
                                {errors.eventName?.type === "required" && (
                                    <p className="text-danger">Event Name is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">
                                    Date
                                </label>
                                <input type="date" id="date" className="form-control shadow-sm" placeholder='Dsate'
                                    {...register("date", {
                                        required: true
                                    })}
                                />
                                {errors.date?.type === "required" && (
                                    <p className="text-danger">Date is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <div>
                                    <label className='form-label' htmlFor='eventType'>Event Type :</label>
                                    <select className='form-control' style={{ width: '50%' }}
                                        {...register("eventType", {
                                            required: true
                                        })}
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>
                                {errors.eventType?.type === "required" && (
                                    <p className="text-danger">Event Type is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="venue" className="form-label">
                                    Venue
                                </label>
                                <input type="text" id="venue" className="form-control shadow-sm" placeholder='Venue'
                                    {...register("venue", {
                                        required: true
                                    })}
                                />
                                {errors.venue?.type === "required" && (
                                    <p className="text-danger">Venue is required</p>
                                )}
                            </div>
                            <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-1">Submit</button>
                        </form>
                    </div>}
                    {formF && <p>{formErr}</p>}
                </div>}
                <h3>Events</h3>
                <div className='row row-cols-2 mb-3'>
                    {communityArray.filter((ele) => {
                        return ele.id === cid
                    })[0].event.length === 0 && <p>No Events yet</p>}
                    {communityArray.filter((ele) => {
                        return ele.id === cid
                    })[0].event.map((ele, ind) => {
                        return (<div className='px-3'>
                            <div className='col border border-1 rounded-3 p-3 bg-light'>
                                <h5>{ele.eventName}</h5>
                                <p>- {ele.hostUsername}</p>
                                <p>Date : {ele.date}</p>
                                <p>{cap(ele.type)} Events</p>
                                <p>Venue : {ele.venue}</p>
                                <h6>Volunteers :</h6>
                                {ele.volunteer.map((v) => {
                                    return (
                                        <p>{v}</p>
                                    )
                                })}
                                {localStorage.getItem('userType') === 'comAdmin' && currentUser.userType !== 'security' && <button className='btn btn-danger' onClick={() => { deleteEventSubmit(ele.id) }}>Delete</button>}
                            </div>
                        </div>)
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Event