import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../redux/slices/communitySlice';

function Sports() {
    let dispatch = useDispatch()
    let { cid } = useParams()
    let { currentUser, } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } = useSelector((state) => state.getCommunityReducer);
    let [reserve, setReserve] = useState(true)
    let [index, setIndex] = useState(-1)
    let [id, setId] = useState()
    let slotArr = [
        '0:00 to 0:30',
        '0:30 to 1:00',
        '1:00 to 1:30',
        '1:30 to 2:00',
        '2:00 to 2:30',
        '2:30 to 3:00',
        '3:00 to 3:30',
        '3:30 to 4:00',
        '4:00 to 4:30',
        '4:30 to 5:00',
        '5:00 to 5:30',
        '5:30 to 6:00',
        '6:00 to 6:30',
        '6:30 to 7:00',
        '7:00 to 7:30',
        '7:30 to 8:00',
        '8:00 to 8:30',
        '8:30 to 9:00',
        '9:00 to 9:30',
        '9:30 to 10:00',
        '10:00 to 10:30',
        '10:30 to 11:00',
        '11:00 to 11:30',
        '11:30 to 12:00',
        '12:00 to 12:30',
        '12:30 to 13:00',
        '13:00 to 13:30',
        '13:30 to 14:00',
        '14:00 to 14:30',
        '14:30 to 15:00',
        '15:00 to 15:30',
        '15:30 to 16:00',
        '16:00 to 16:30',
        '16:30 to 17:00',
        '17:00 to 17:30',
        '17:30 to 18:00',
        '18:00 to 18:30',
        '18:30 to 19:00',
        '19:00 to 19:30',
        '19:30 to 20:00',
        '20:00 to 20:30',
        '20:30 to 21:00',
        '21:00 to 21:30',
        '21:30 to 22:00',
        '22:00 to 22:30',
        '22:30 to 23:00',
        '23:00 to 23:30',
        '23:30 to 24:00'
    ]
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    async function handleFormSubmit(obj) {
        obj.option = parseInt(obj.option)
        let res = await axios.put('http://localhost:4000/user-api/book-slot', {
            cid: cid,
            id: id,
            details: {
                username: currentUser.username,
                date: obj.date,
                slot: obj.option
            }
        })
        console.log(res.data.message)
        if (res.data.message === "Slot booked successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
    }
    let [f, setF] = useState(true)
    async function handleFormSubmit1(obj) {
        console.log(obj)
        let res = await axios.put('http://localhost:4000/com-admin-api/sports', {
            cid: cid,
            id: `${Date.now()}`,
            name: obj.name,
            noOfCourts: obj.noofCourts,
            slots: []
        })
        if (res.data.message === "Sports added successfully") {
            dispatch(getCommunityThunk(currentUser.community))
        }
        else {
            console.log(res.data.message)
        }
    }
    function sortSlotArray(arr) {
        console.log(arr)
        let retArr = [], temp, i, j;
        arr.map((ele) => {
            retArr.push(ele)
            return null
        })
        for (i = 0; i < retArr.length - 1; i++) {
            for (j = 0; j < retArr.length - i - 1; j++) {
                if (retArr[j].date > retArr[j + 1].date) {
                    temp = retArr[j];
                    retArr[j] = retArr[j + 1];
                    retArr[j + 1] = temp;
                }
                else if (retArr[j].date === retArr[j + 1].date) {
                    if (retArr[j].slot > retArr[j + 1].slot) {
                        temp = retArr[j];
                        retArr[j] = retArr[j + 1];
                        retArr[j + 1] = temp;
                    }
                }
            }
        }
        console.log(retArr)
        return retArr
    }
    return (
        <div className='pt-3 pb-3'>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending && <div>
                {localStorage.getItem('userType') === 'comAdmin' && <div>
                    <h3>Register a Sport</h3>
                    {f && <button className='btn btn-success px-3' onClick={() => setF(false)}>New Sport</button>}
                    {!f && <button className='btn btn-success mb-3 px-3' onClick={() => setF(true)}>Back</button>}
                    {!f && <div className="col-lg-6 col-md-8 col-sm-10 rounded p-4 border border-1 bg-light">
                        <h3 className="display-3 fs-1 text-center mb-3">Register a Sport</h3>
                        <form
                            className="w-100 ps-3 pe-3"
                            onSubmit={handleSubmit(handleFormSubmit1)}
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
                                <label htmlFor="noOfCourts" className="form-label">
                                    No Of Courts
                                </label>
                                <input type="text" id="noOfCourts" className="form-control shadow-sm" placeholder='No Of Courts'
                                    {...register("noOfCourts", {
                                        required: true
                                    })}
                                />
                                {errors.noOfCourts?.type === "required" && (
                                    <p className="text-danger">No Of Courts are required</p>
                                )}
                            </div>
                            <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-1">Submit</button>
                        </form>
                    </div>}
                </div>}
                <h3 className='mt-2 mb-3'>Sports</h3>
                {communityArray.map((ele) => {
                    if (ele.id === cid) {
                        return (
                            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2'>
                                {ele.sports.map((sport, ind) => {
                                    return (<div className='col'>
                                        <div className='p-2 border border-1 rounded rounded-2 bg-light'>
                                            <h5>{sport.name}</h5>
                                            <p>No of Courts/Fields : {sport.noOfCourts}</p>
                                            {index !== ind && <button className='btn btn-success' onClick={() => {
                                                setReserve(false)
                                                setIndex(ind)
                                            }}>Reserve Court</button>}
                                            {!reserve && index === ind && <button className="btn btn-primary m-3 mr-2" onClick={() => {
                                                setIndex(-1)
                                                setReserve(true)
                                            }}>Back</button>}
                                            {!reserve && index === ind && <form
                                                className="w-100 ps-3 pe-3"
                                                onSubmit={handleSubmit(handleFormSubmit)}
                                            >
                                                <div className="mb-3">
                                                    <label htmlFor="date" className="form-label">
                                                        Date
                                                    </label>
                                                    <input type="date" id="date" className="form-control shadow-sm" placeholder='Date'
                                                        {...register("date", {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.date?.type === "required" && (
                                                        <p className="text-danger">Date is required</p>
                                                    )}
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='option'>Reservation Slot :</label>
                                                    <select className='form-control' required
                                                        {...register("option", {
                                                            required: true
                                                        })}
                                                    >
                                                        {slotArr.map((s, ind) => {
                                                            return (
                                                                <option value={ind + 1}>{s}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {errors.option?.type === "required" && (
                                                        <p className="text-danger">Reservation Slot is required</p>
                                                    )}
                                                </div>
                                                <button className="btn btn-success mb-1" onClick={() => setId(sport.id)}>Submit</button>
                                            </form>}
                                        </div>
                                    </div>)
                                })}
                            </div>
                        )
                    }
                    else{
                        return null
                    }
                })}
                {communityArray.filter((ele) => {
                    if (ele.id === cid) {
                        return true
                    }
                    else{
                        return null
                    }
                })[0].sports.length === 0 && <p>No sports registered yet</p>}
                {localStorage.getItem('userType') === 'comAdmin' && <div className='mt-3'>
                    <h3 className='mb-3'>Sports Reserved</h3>
                    {communityArray.map((ele) => {
                        if (ele.id === cid) {
                            return (<div className='row row-cols-1 row-cols-sm-1 row-cols-md-2'>
                                {ele.sports.map((sport) => {
                                    return (<div>
                                        <div className='bg-light border border-1 p-2 rounded-2'>
                                        <h5>{sport.name}</h5>
                                        <p>No of Courts/Fields : {sport.noOfCourts}</p>
                                        <h6>Reservations till now : </h6>
                                        {sortSlotArray(sport.slots).map((slot)=>{
                                            return(<div className='p-1 mb-1 border border-1 rounded-1'>
                                                <p>Username : {slot.usernae}</p>
                                                <p>Date : {slot.date}</p>
                                                <p>Time : {slotArr[slot.slot-1]}</p>
                                            </div>)
                                        })}
                                    </div>
                                    </div>)
                                })}
                            </div>)
                        }
                        else{
                            return null
                        }
                    })}
                </div>}
            </div>}
        </div>
    )
}

export default Sports
