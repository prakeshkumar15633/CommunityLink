import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCommunityThunk } from '../../../redux/slices/communitySlice'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading'

function DiscussionForum() {
    let { cid } = useParams()
    let path = useLocation().pathname.split('/')
    let navigate = useNavigate()
    let { currentUser, } =
        useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityStatus, communityArray, communityErrorOccurred, communityErrMsg } =
        useSelector((state) => state.getCommunityReducer);
    let dispatch = useDispatch()
    let [arr, setArr] = useState()
    let [f, setF] = useState(false)

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let [err, setErr] = useState('')
    let [formErr, setFormErr] = useState("")
    let [formF, setFormF] = useState(true)
    useEffect(() => {
        setArr(communityArray.filter((ele) => {
            return ele.id == cid
        })[0].disforum)
        setF(true)
    })
    async function handleFormSubmit(disforum) {
        let res = await axios.put('http://localhost:4000/com-admin-api/discussion-forum', {
            cid: cid,
            id: `${Date.now()}`,
            username: currentUser.username,
            topic: disforum.disforum,
            comments: [],
            time: new Date()
        })
        if (res.data.message == "Discussion Forum added successfully") {
            setFormErr(res.data.message)
            setFormF(true)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            setFormErr(res.data.message)
            setFormErr(true)
        }
    }
    async function deleteDisforum(ind) {
        let res = await axios.put('http://localhost:4000/com-admin-api/discussion-forum/delete', {
            cid: cid,
            index: ind
        })
        if (res.data.message == "Discussion Forum deleted successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div>
                {localStorage.getItem('userType') == 'comAdmin' && <div>
                    <h3>Disscussion Forum</h3>
                    {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Discussion Forum</button>}
                    {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                    {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 border border-1 bg-light">
                        <h3 className="text-center mb-3">Make a Discussion Forum</h3>
                        {err.length !== 0 && <p className="text-danger fs-3">{err}</p>}
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="mb-3">
                                <label htmlFor="disforum" className="form-label">
                                    Discussion Forum Topic
                                </label>
                                <input type="text" id="disforum" className="form-control shadow-sm" placeholder='Name of the Discussion Forum'
                                    {...register("disforum", {
                                        required: true
                                    })}
                                />
                                {errors.disforum?.type === "required" && (
                                    <p className="text-danger">Discussion Forum Topic is required</p>
                                )}
                            </div>
                            <button className="btn btn-success px-2 mb-1">Submit</button>
                        </form>
                    </div>}
                    {formF && <p>{formErr}</p>}
                </div>}
                <h3>Discussion Forums</h3>
                <div className='row row-cols-2'>
                    {f && communityArray.map((ele) => {
                        if (ele.id == cid) {
                            return (
                                ele.disforum.map((dis, ind) => {
                                    return (
                                        <div className='px-3' style={{cursor:'pointer'}} onClick={() => {
                                            navigate(`discussion-forum/${dis.id}`)
                                        }}>
                                            <div className='col border border-1 rounded-3 p-3 bg-light'>
                                                <h5>{dis.topic}</h5>
                                                <p>- {dis.username}</p>
                                                <p>{dis.comments.length} {dis.comments.length == 1 ? 'comment' : 'comments'}</p>
                                                {localStorage.getItem('userType') == 'comAdmin' && <button className='btn btn-danger' onClick={() => deleteDisforum(ind)}>Delete</button>}
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    })}
                    {f && communityArray.filter((ele) => {
                        if (ele.id == cid) {
                            return true
                        }
                    })[0].disforum.length == 0 && <p>No Discussion Forums created yet</p>}
                </div>
                <Outlet />
            </div>}
        </div>
    )
}

export default DiscussionForum
