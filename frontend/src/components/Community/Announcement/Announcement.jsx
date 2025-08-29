import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';

function Announcement() {
    let dispatch = useDispatch()
    let { cid } = useParams()
    let { currentUser, } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } = useSelector((state) => state.getCommunityReducer);
    let [edit, setEdit] = useState(true)
    let [userType, setUserType] = useState("resident")
    let [textarea, setTextarea] = useState()
    let [arr, setArr] = useState()
    let [index, setIndex] = useState(-1)
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    useEffect(() => {
        if (arr !== undefined) {
            setArr(arr = communityArray.filter((ele) => {
                return ele.id === cid
            })[0])
        }
        if (localStorage.getItem('userType') === 'comAdmin') {
            setUserType('admin')
        }
        else {
            setUserType('resident')
        }
    })
    async function editAnnouncement(ind) {
        let res = await axios.put("http://localhost:4000/com-admin-api/announcement/edit", {
            id: cid,
            index: ind,
            announcement: textarea
        })
        if (res.data.message === "Announcement updated successfully") {
            console.log("Announcement updated successfully")
            dispatch(getCommunityThunk(currentUser.community));
        }
    }
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let [formErr, setFormErr] = useState("")
    let [formF, setFormF] = useState(true)
    async function handleFormSubmit(announcement) {
        let res = await axios.put('http://localhost:4000/com-admin-api/announcement', {
            id: cid,
            username: currentUser.username,
            announcement: announcement.announcement,
            time: new Date()
        })
        if (res.data.message === "Announcement added successfully") {
            setFormErr(res.data.message)
            setFormF(true)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            setFormErr(res.data.message)
            setFormErr(true)
        }
    }
    async function deleteSubmitButton(ind) {
        let res = await axios.put('http://localhost:4000/com-admin-api/announcement/delete', {
            id: cid,
            index: ind
        })
        console.log(res.data.message)
        if (res.data.message = "Announcement successfully deleted") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending && <div>
                {localStorage.getItem('userType') === 'comAdmin' && currentUser.userType !== 'security' && <div>
                    <h3>Make an Announcement</h3>
                    {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Announcement</button>}
                    {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                    {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 border border-1 bg-light">
                        <h3 className="text-center mb-3">Make an Announcement</h3>
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="mb-3">
                                <label htmlFor="announcement" className="form-label">
                                    Announcement Text
                                </label>
                                <input type="text" id="announcement" className="form-control shadow-sm" placeholder='Announcement Text'
                                    {...register("announcement", {
                                        required: true
                                    })}
                                />
                                {errors.announcement?.type === "required" && (
                                    <p className="text-danger">Announcement Text is required</p>
                                )}
                            </div>
                            <button className="btn btn-success d-block mx-auto mb-1">Submit</button>
                        </form>
                    </div>}
                    {formF && <p>{formErr}</p>}
                </div>}
                <h3>Announcements</h3>
                <div className='row row-cols-2'>
                    {communityArray.filter((ele) => {
                        return ele.id === cid
                    })[0].announcements.length === 0 && <p>No Announcements yet</p>}
                    {communityArray.filter((ele) => {
                        return ele.id === cid
                    })[0].announcements.map((ele, ind) => {
                        return (<div className='px-3'>
                            <div className='col bg-light border border-1 rounded-3 p-3'>
                                <h5>{cap(ele.username)}</h5>
                                {index !== ind && <p>{ele.announcement}</p>}
                                {index !== ind && userType === 'admin' && currentUser.userType !== 'security' && <button className='btn btn-success' onClick={() => {
                                    setEdit(false)
                                    setIndex(ind)
                                    setTextarea(ele.announcement)
                                }}>Edit</button>}
                                {!edit && index === ind && <button className='btn btn-primary mb-3' onClick={() => {
                                    setEdit(true)
                                    setIndex(-1)
                                    setTextarea("")
                                }}>Back</button>}
                                {!edit && index === ind && <textarea className='form-control mb-3' style={{ wcidth: '100%' }} onChange={(e) => setTextarea(e.target.value)} onMouseEnter={(e) => setTextarea(e.target.value)} onMouseLeave={(e) => setTextarea(e.target.value)}>
                                    {ele.announcement}
                                </textarea>}
                                {!edit && index === ind && <button className='btn btn-success' onClick={() => {
                                    setIndex(-1)
                                    setEdit(true)
                                    editAnnouncement(ind)
                                }}>Submit</button>}
                                {index !== ind && userType === 'admin' && currentUser.userType !== 'security' && <button className='btn btn-danger' onClick={() => {
                                    deleteSubmitButton(ind)
                                }} style={{ marginLeft: '10px' }}>Delete</button>}
                            </div>
                        </div>)
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Announcement
