import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';

function Business() {
    let dispatch = useDispatch()
    let { cid } = useParams()
    let { currentUser } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityStatus, communityArray, communityErrorOccurred, communityErrMsg } = useSelector((state) => state.getCommunityReducer);
    let [arr, setArr] = useState()
    useEffect(() => {
        if (arr != undefined) {
            setArr(arr = communityArray.filter((ele) => {
                return ele.id == cid
            })[0])
        }
    })
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let [formErr, setFormErr] = useState("")
    let [formF, setFormF] = useState(true)
    async function handleFormSubmit(business) {
        let res = await axios.put('http://localhost:4000/com-admin-api/business', {
            cid: cid,
            id: `${Date.now()}`,
            username: business.username,
            shopName: business.shopName,
            shopNo: business.shopNo
        })
        console.log(res.data.message, cid)
        if (res.data.message == "Business created successfully") {
            setFormErr(res.data.message)
            setFormF(true)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            setFormErr(res.data.message)
            setFormErr(true)
        }
    }
    async function deleteBusinessSubmit(idd) {
        let res = await axios.put('http://localhost:4000/com-admin-api/business/delete', {
            cid: cid,
            id: idd
        })
        if (res.data.message == "Business deleted successfully") {
            console.log(res.data.message)
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            console.log(res.data.message)
        }
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending&&<div>
                {localStorage.getItem('userType') == 'comAdmin' && currentUser.userType != 'security' && <div>
                    <h3>Make a Business</h3>
                    {formF && <button className='btn btn-success px-3' onClick={() => setFormF(false)}>New Business</button>}
                    {!formF && <button className='btn btn-success mb-3 px-3' onClick={() => setFormF(true)}>Back</button>}
                    {!formF && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-2 border border-1 bg-light">
                        <h3 className="text-center mb-3">Make a Business</h3>
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input type="text" id="username" className="form-control shadow-sm" placeholder='Username'
                                    {...register("username", {
                                        required: true
                                    })}
                                />
                                {errors.username?.type === "required" && (
                                    <p className="text-danger">Username is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="shopName" className="form-label">
                                    Shop Name
                                </label>
                                <input type="text" id="shopName" className="form-control shadow-sm" placeholder='Shop Name'
                                    {...register("shopName", {
                                        required: true
                                    })}
                                />
                                {errors.shopName?.type === "required" && (
                                    <p className="text-danger">Shop Name is required</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="shopNo" className="form-label">
                                    Shop No
                                </label>
                                <input type="number" id="shopNo" className="form-control shadow-sm" placeholder='Shop No'
                                    {...register("shopNo", {
                                        required: true
                                    })}
                                />
                                {errors.shopNo?.type === "required" && (
                                    <p className="text-danger">Shop No is required</p>
                                )}
                            </div>
                            <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-1">Submit</button>
                        </form>
                    </div>}
                    {formF && <p>{formErr}</p>}
                </div>}
                <h3>Business</h3>
                <div className='row row-cols-2'>
                    {communityArray.filter((ele) => {
                        return ele.id == cid
                    })[0].business.length == 0 && <p>No businesses yet</p>}
                    {communityArray.filter((ele) => {
                        return ele.id == cid
                    })[0].business.map((ele, ind) => {
                        return (<div className='px-3'>
                            <div className='col border border-1 rounded-3 p-3 bg-light'>
                                <h5>{ele.shopName}</h5>
                                <p>- {ele.username}</p>
                                <p>Shop No : {ele.shopNo}</p>
                                {localStorage.getItem('userType') == 'comAdmin' && currentUser.userType != 'security' && <button className='btn btn-danger' onClick={() => { deleteBusinessSubmit(ele.id) }}>Delete</button>}
                            </div>
                        </div>)
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Business
