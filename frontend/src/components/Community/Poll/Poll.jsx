import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCommunityThunk } from '../../../redux/slices/communitySlice'
import ProgressLine from './ProgressLine'

function Poll() {
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
    async function handleFormSubmit(poll) {
        let obj = {}
        poll.options = poll.options.split('$')
        poll.options.map((ele) => {
            obj[ele] = 0
        })
        let res = await axios.put('http://localhost:4000/com-admin-api/poll', {
            cid: cid,
            id: `${Date.now()}`,
            username: currentUser.username,
            question: poll.question,
            options: obj,
            voted: [],
            time: new Date()
        })
        if (res.data.message == "Poll created successfully") {
            setFormErr(res.data.message)
            setFormF(true)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            setFormErr(res.data.message)
            setFormErr(true)
        }
    }
    async function deletePoll(ind) {
        let res = await axios.put('http://localhost:4000/com-admin-api/poll/delete', {
            cid: cid,
            id: ind
        })
        console.log(res.data.message)
        if (res.data.message == "Poll deleted successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let [pollIndex, setPollIndex] = useState(-1)
    let [pollId, setPollId] = useState()
    let [index, setIndex] = useState(-1)
    async function onSubmitButton(option) {
        let res = await axios.put('http://localhost:4000/user-api/poll/', {
            cid: cid,
            id: pollId,
            option: option.option,
            username: currentUser.username
        })
        console.log(res.data.message)
        if (res.data.message == "Voted in poll successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    function sum(arr) {
        let s = 0
        Object.keys(arr).map((ele) => {
            s += arr[ele]
        })
        return s
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div>
                {localStorage.getItem('userType') == 'comAdmin' && <div>
                    <h3>Make a Poll</h3>
                    {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Poll</button>}
                    {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                    {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 border border-1 bg-light">
                        <h3 className="text-center mb-3">Make a Poll</h3>
                        {err.length !== 0 && <p className="text-danger fs-3">{err}</p>}
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">
                                    Question
                                </label>
                                <input type="text" id="question" className="form-control shadow-sm" placeholder='Question'
                                    {...register("question", {
                                        required: true
                                    })}
                                />
                                {errors.question?.type === "required" && (
                                    <p className="text-danger">Question is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="options" className="form-label">
                                    Options
                                </label>
                                <input type="text" id="options" className="form-control shadow-sm" placeholder='Enter options seperated by $'
                                    {...register("options", {
                                        required: true
                                    })}
                                />
                                {errors.options?.type === "required" && (
                                    <p className="text-danger">Options are required</p>
                                )}
                            </div>
                            <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-1">Submit</button>
                        </form>
                    </div>}
                    {formF && <p>{formErr}</p>}
                </div>}
                <h3>Poll</h3>
                <div className='row row-cols-2'>
                    {f && communityArray.map((ele) => {
                        if (ele.id == cid) {
                            return (
                                ele.poll.map((poll, pollInd) => {
                                    return (
                                        <div className='px-3'>
                                            <div className='col border border-1 rounded-3 p-3 bg-light'>
                                                <h5>{poll.question}</h5>
                                                {poll.voted.includes(currentUser.username) && <p>Voted</p>}
                                                {pollIndex != pollInd && <button className='btn btn-success' onClick={(() => { setPollIndex(pollInd) })} style={{ marginRight: '7px' }}>{!poll.voted.includes(currentUser.username) ? "Vote" : "See Poll Result"}</button>}
                                                {pollIndex == pollInd && <button className='btn btn-primary mb-3' onClick={(() => { setPollIndex(-1) })}>Back</button>}
                                                {pollIndex == pollInd && <form onSubmit={handleSubmit(onSubmitButton)}>
                                                    {!poll.voted.includes(currentUser.username) && Object.keys(poll.options).map((opt, ind) => {
                                                        return (<div>
                                                            <label className='form-label' htmlFor={opt}>
                                                                <input
                                                                    {...register("option")}
                                                                    type="radio"
                                                                    value={opt}
                                                                    id={opt}
                                                                    onChange={() => {
                                                                        setIndex(ind)
                                                                        setPollIndex(pollInd)
                                                                    }}
                                                                />
                                                                <span className='mx-2'>{cap(opt)}</span>
                                                            </label>
                                                            <ProgressLine
                                                                label="Full progressbar"
                                                                visualParts={[
                                                                    {
                                                                        percentage: `${(pollIndex == pollInd) ? (
                                                                            (index == ind) ? (
                                                                                ((poll.options[opt] + 1) / (sum(poll.options) + 1)) * 100
                                                                            ) : (
                                                                                ((poll.options[opt]) / (sum(poll.options) + 1)) * 100
                                                                            )
                                                                        ) : (
                                                                            ((poll.options[opt]) / (sum(poll.options))) * 100
                                                                        )}%`,
                                                                        color: "green"
                                                                    }
                                                                ]}
                                                            />
                                                        </div>)
                                                    })}
                                                    {poll.voted.includes(currentUser.username) && Object.keys(poll.options).map((opt, ind) => {
                                                        return (<div>
                                                            <label className='form-label'>
                                                                <span className='mx-2'>{cap(opt)}</span>
                                                            </label>
                                                            <ProgressLine
                                                                label="Full progressbar"
                                                                visualParts={[
                                                                    {
                                                                        percentage: `${(pollIndex == pollInd) ? (
                                                                            (index == ind) ? (
                                                                                ((poll.options[opt] + 1) / (sum(poll.options) + 1)) * 100
                                                                            ) : (
                                                                                ((poll.options[opt]) / (sum(poll.options) + 1)) * 100
                                                                            )
                                                                        ) : (
                                                                            ((poll.options[opt]) / (sum(poll.options))) * 100
                                                                        )}%`,
                                                                        color: "green"
                                                                    }
                                                                ]}
                                                            />
                                                        </div>)
                                                    })}
                                                    {!poll.voted.includes(currentUser.username) && <button className='btn btn-success p-2 mb-3' type="submit" onClick={() => { setPollId(poll.id) }}>
                                                        Save Options
                                                    </button>}
                                                </form>}
                                                {localStorage.getItem('userType') == 'comAdmin' && <button className='btn btn-danger' onClick={() => deletePoll(poll.id)}>Delete</button>}
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
                    })[0].poll.length == 0 && <p>No polls created yet</p>}
                </div>
                <Outlet />
            </div >}
        </div>
    )
}

export default Poll
