import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';
import { visitorThunk } from '../../../redux/slices/visitorSlice';

function Visitor() {
    let { cid } = useParams()
    let dispatch = useDispatch()
    let { currentUser, } =
        useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } =
        useSelector((state) => state.getCommunityReducer);
    let { isVisitorPending, visitorStatus, currentVisitor } =
        useSelector((state) => state.visitorReducer);
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let [formF, setFormF] = useState(true)
    async function handleFormSubmit(obj) {
        obj.id = cid
        let res = await axios.put('http://localhost:4000/security-api/visitor', obj)
        console.log(res.data.message)
        if (res.data.message === "Visitor request sent") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    async function securityAcceptButton(name, phno, houseNo) {
        let res = await axios.put('http://localhost:4000/security-api/visitor/delete', {
            id: cid,
            houseNo: houseNo
        })
        console.log(res.data.message)
        dispatch(getCommunityThunk(currentUser.community))
    }
    let [f, setF] = useState(false)
    async function reload() {
        setF(false)
        dispatch(getCommunityThunk(currentUser.community))
        dispatch(visitorThunk(currentUser.username))
        setF(true)
    }
    useEffect(() => {
        if (visitorStatus === false) {
            dispatch(visitorThunk(currentUser.username))
        }
        setF(true)
    },[f,visitorStatus, dispatch, currentUser.username])
    console.log(currentVisitor)
    async function userAccept(name, phno, houseNo, status) {
        let res = await axios.put('http://localhost:4000/user-api/visitor', {
            id: cid,
            name: name,
            phno: phno,
            houseNo: houseNo,
            status: status
        })
        console.log(res.data)
        if (res.data.message === "Message sent successfully") {
            reload()
        }
        dispatch(visitorThunk(currentUser.username))
    }
    return (
        <div className='pt-3 pb-3'>
            {isVisitorPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isVisitorPending && <div>
                <button className='btn btn-success mb-3' onClick={() => reload()}>Reload</button>
                {<div>
                    {currentUser.userType !== 'security'&&<h3>Visitors</h3>}
                    {isVisitorPending && isCommunityPending && f && currentUser.userType !== 'security' && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
                    {!isVisitorPending && !isCommunityPending && f && currentUser.userType !== 'security' && currentVisitor.map((ele) => {
                        return (<div className='mb-3 col-lg-6 col-md-8 col-sm-10 rounded rounded-3 bg-light'>
                            <h5>Name : {ele.name}</h5>
                            <p> Phone No : {ele.phno}</p>
                            <button className='btn btn-danger' style={{ marginRight: '10px' }} onClick={() => (userAccept(ele.name, ele.phno, communityArray.filter((ele2) => {
                                return ele2.id === cid
                            })[0].residents.filter((ele2) => {
                                return ele2.username === currentUser.username
                            })[0].houseNo, -1))}>Reject</button>
                            <button className='btn btn-success' onClick={() => (userAccept(ele.name, ele.phno, communityArray.filter((ele2) => {
                                return ele2.id === cid
                            })[0].residents.filter((ele2) => {
                                return ele2.username === currentUser.username
                            })[0].houseNo, 1))}>Accept</button>
                        </div>)
                    })}
                    {currentUser.userType !== 'security'&&communityArray.filter((ele, ind) => {
                        if (ele.id === cid) {
                            return true
                        }
                        else{
                            return null
                        }
                    })[0].visitor.length === 0 && <p>No visitors yet</p>}
                </div>}
                {isVisitorPending && isCommunityPending && f && currentUser.userType === 'security' && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
                {!isVisitorPending && !isCommunityPending && f && currentUser.userType === 'security' && <div>
                    <div className='mb-3'>
                        <h3>Make a request</h3>
                        {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Request</button>}
                        {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                        {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 border border-1 bg-light">
                            <h3 className="text-center mb-3">Make a Request</h3>
                            <form
                                className="w-100 ps-3 pe-3"
                                onSubmit={handleSubmit(handleFormSubmit)}
                            >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input type="text" id="name" className="form-control shadow-sm" placeholder='Name'
                                        {...register("name", {
                                            required: true
                                        })}
                                    />
                                    {errors.name?.type === "required" && (
                                        <p className="text-danger">Name is required</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phno" className="form-label">
                                        Phone No
                                    </label>
                                    <input type="number" id="phno" className="form-control shadow-sm" placeholder='Phone No'
                                        {...register("phno", {
                                            required: true
                                        })}
                                    />
                                    {errors.phno?.type === "required" && (
                                        <p className="text-danger">Phone No is required</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="houseNo" className="form-label">
                                        House No
                                    </label>
                                    <input type="number" id="houseNo" className="form-control shadow-sm" placeholder='House No'
                                        {...register("houseNo", {
                                            required: true
                                        })}
                                    />
                                    {errors.houseNo?.type === "required" && (
                                        <p className="text-danger">House No is required</p>
                                    )}
                                </div>
                                <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-1">Submit</button>
                            </form>
                        </div>}
                    </div>
                    <div>
                        <h3 className='mb-3'>Requests</h3>
                        {communityArray.map((ele, ind) => {
                            if (ele.id === cid) {
                                return (
                                    <div>
                                        {<div>
                                            {ele.visitor.map((ele2, ind2) => {
                                                return (<div className='border border-1 p-3 mb-3 rounded rounded-3 bg-light' style={{ width: '300px' }}>
                                                    <h3>{cap(ele2.name)}</h3>
                                                    <p>
                                                        Phone Number : {ele2.phno} <br /> House No : {ele2.houseNo}
                                                    </p>
                                                    {console.log(ele2)}
                                                    {ele2.status === 1 && <p className='text-success'>Accepted</p>}
                                                    {ele2.status === 0 && <p className='text-primary'>Pending...</p>}
                                                    {ele2.status === -1 && <p className='text-danger'>Rejected</p>}
                                                    {ele2.status !== 0 && <button className={`btn ${ele2.status === 1 ? "btn-success" : "btn-danger"} px-5`} onClick={() => { securityAcceptButton(ele2.name, ele2.phno, ele2.houseNo) }}>Ok</button>}
                                                </div>)
                                            })}
                                            {ele.visitor.length === 0 && <p>No requests yet</p>}
                                        </div>}
                                    </div>
                                )
                            }
                            else{
                                return null
                            }
                        })}
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default Visitor
