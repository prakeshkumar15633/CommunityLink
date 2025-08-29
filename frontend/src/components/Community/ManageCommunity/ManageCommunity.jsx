import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCommunityThunk } from '../../../redux/slices/communitySlice'
import axios from 'axios'
import ReactLoading from 'react-loading'

function ManageCommunity() {
    let navigate = useNavigate()
    let { currentUser, } =
        useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray, communityStatus, communityErrorOccurred, communityErrMsg } =
        useSelector((state) => state.getCommunityReducer);
    let dispatch = useDispatch();
    let { cid } = useParams()
    let [arr, setArr] = useState(undefined)
    let [f, setF] = useState(false)
    let [userType, setUserType] = useState()
    useEffect(() => {
        setArr(communityArray.filter((ele) => {
            return ele.id == cid
        })[0])
        setF(true)
        setUserType(localStorage.getItem('userType'))
    })
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    let [index, setIndex] = useState(-1)
    let [textarea, setTextarea] = useState("")
    function editGuideline(ind) {
        setIndex(ind)
    }
    async function editSubmitGuideline(ind) {
        setIndex(-1)
        let newObj = {
            id: cid,
            index: ind,
            guideline: textarea
        }
        const res = await axios.put('http://localhost:4000/com-admin-api/guidelines/edit', newObj)
        if (res.data.message == "Guidelines updated successfully") {
            setF(false)
            dispatch(getCommunityThunk(currentUser.community));
            setArr(communityArray.filter((ele) => {
                return ele.id == cid
            })[0])
            if (arr != undefined) {
                setF(true)
                setUserType(localStorage.getItem('userType'))
            }
        }
        else {
            console.log(res.data.message)
        }
    }
    let [addGuideline, setAddGuideline] = useState(false)
    let [addGuidelineText, setAddGuidelinetext] = useState("")
    async function addSubmitGuideline() {
        let newObj = {
            id: cid,
            guideline: addGuidelineText
        }
        const res = await axios.put('http://localhost:4000/com-admin-api/guidelines/add', newObj)
        if (res.data.message == "Guideline added successfully") {
            console.log(res.data.message)
            setF(false)
            dispatch(getCommunityThunk(currentUser.community));
            setArr(communityArray.filter((ele) => {
                return ele.id == cid
            })[0])
            setF(true)
            setUserType(localStorage.getItem('userType'))
            setArr(communityArray.filter((ele) => {
                return ele.id == cid
            })[0])
            if (arr != undefined) {
                setF(true)
                setUserType(localStorage.getItem('userType'))
            }
        }
        else {
            console.log(res.data.message)
        }
    }
    async function deleteSubmitGuideline(ind) {
        let res = await axios.put('http://localhost:4000/com-admin-api/guidelines/delete', {
            id: cid,
            index: ind
        })
        if (res.data.message == "Guideline deleted successfully") {
            dispatch(getCommunityThunk(currentUser.community))
            console.log(res.data.message)
        }
        else {
            console.log(res.data.message)
        }
    }
    let [admin, setAdmin] = useState("")
    let [adminErr, setAdminErr] = useState("")
    async function addAdmin() {
        if (admin == "") {
            setAdminErr("Admin username cannot be empty")
        }
        else {
            let res = await axios.put('http://localhost:4000/com-admin-api/new-admin', {
                id: cid,
                username: admin
            })
            if (res.data.message == "Admin added successfully") {
                setAdminErr(res.data.message)
                dispatch(getCommunityThunk(currentUser.community))
            }
            else {
                setAdminErr(res.data.message)
            }
        }
    }
    return (
        <div>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div className='rounded rounded-3 p-3 my-3 bg-light border border-1' >
                {f && <div>
                    <h3>{arr.name}</h3>
                    <p>{arr.houseType}</p>
                    <p>House Count : {arr.houseCount}</p>
                    <p>Address : {cap(arr.address.area)}, {cap(arr.address.city)}, {cap(arr.address.state)}</p>
                    <h5>Guidelines :</h5>
                    <ul>
                        {communityArray.filter((ele) => {
                            return ele.id == cid
                        })[0].guidelines.map((ele, ind) => {
                            return (
                                <div className='row m-2'>
                                    {index != ind && <div className='col-8'>
                                        <li>{ele}</li>
                                    </div>}
                                    {index == ind && <div className='col-8'>
                                        <textarea className='form-control' style={{ width: '100%' }} onChange={(e) => setTextarea(e.target.value)} onMouseEnter={(e) => setTextarea(e.target.value)} onMouseLeave={(e) => setTextarea(e.target.value)}>
                                            {ele}
                                        </textarea>
                                    </div>}
                                    {userType == "comAdmin" && currentUser.userType != 'security' && index != ind && <div className='col-4'>
                                        <button className='btn btn-success' onClick={() => {
                                            setTextarea(ele)
                                            editGuideline(ind)
                                        }}>Edit</button>
                                        {index != ind && <button className='btn btn-danger mx-2' onClick={(() => deleteSubmitGuideline(ind))} Delete>Delete</button>}
                                    </div>}
                                    {userType == "comAdmin" && currentUser.userType != 'security' && index == ind && <div className='col-4'>
                                        <button className='btn btn-success' onClick={() => editSubmitGuideline(ind)}>Submit</button>
                                    </div>}
                                </div>
                            )
                        })}
                    </ul>
                    {userType == "comAdmin" && currentUser.userType != 'security' && <div className='m-3'>
                        <p className='text-center'>Want to add a new guideline?</p>
                        {addGuideline && <textarea className='form-control mx-auto' style={{ wcidth: '100%' }} onChange={(e) => setAddGuidelinetext(e.target.value)} onMouseEnter={(e) => setAddGuidelinetext(e.target.value)} onMouseLeave={(e) => setAddGuidelinetext(e.target.value)}></textarea>}
                        {!addGuideline && <button className='btn btn-success d-block mx-auto' onClick={() => setAddGuideline(true)}>Add</button>}
                        {addGuideline && <button className='btn btn-success d-block mx-auto' onClick={() => addSubmitGuideline()}>Submit</button>}
                    </div>}
                    {localStorage.getItem('userType') == 'comAdmin' && currentUser.userType != 'security' && <div className='col-10'>
                        <h5>Add an admin</h5>
                        <div className="mb-3">
                            <label htmlFor="admin" className="form-label">
                                Enter the username of the resident you want to make admin
                            </label>
                            <input type="text" id="admin" className="form-control shadow-sm" placeholder='Resident username' name='admin' onChange={(e) => { setAdmin(e.target.value) }} />
                            <p>{adminErr}</p>
                            <button className='btn btn-success' onClick={() => addAdmin()}>Submit</button>
                        </div>
                    </div>}
                </div>}
            </div>}
        </div>
    )
}

export default ManageCommunity