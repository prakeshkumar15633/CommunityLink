import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCommunityThunk } from '../../redux/slices/communitySlice';

function Community() {
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // let [err, setErr] = useState('')
    let [formErr, setFormErr] = useState("")
    let [f, setF] = useState(true)
    let [submitButton, setSubmitButton] = useState(false)
    let navigate = useNavigate()
    let { currentUser } =
        useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityStatus, communityArray } =
        useSelector((state) => state.getCommunityReducer);
    let dispatch = useDispatch();
    // communityArray = [
    //     {
    //         _id: {
    //             $oid: "662fbd226c406e487b9e6746"
    //         },
    //         id: "1714404642",
    //         passwordResident: "$2a$06$LnqWwMzDjCA2eUfk3T0Ny.e9BtknTYub4TWq.0eBMjgTvXBdIMNmG",
    //         passwordSecurity: "$2a$06$uRp8z2/XTIEd5aDXaQNvP.NaEmJy6FqPnNADEmRN1skLd85TzTyGW",
    //         name: "Praneeth Pranav Enclave",
    //         houseType: "villa",
    //         houseCount: 400,
    //         address: {
    //             area: "bachupally",
    //             city: "hyderabad",
    //             state: "telangana",
    //             country: "india"
    //         },
    //         guidelines: [
    //             "Property upkeep: Residents are expected to maintain their properties in a clean and tidy manner, including regular lawn care and removal of debris.",
    //             "Parking regulations: Park vehicles only in designated areas and adhere to any specified parking restrictions to ensure accessibility and safety for all residents.",
    //             "Waste management: Dispose of trash and recycling properly in designated bins, and refrain from littering or dumping items in common areas.",
    //             "Pet policies: Keep pets under control at all times, clean up after them, and adhere to leash laws when walking them within the community.",
    //             "Compliance with local laws: Abide by all applicable laws and regulations, including those related to noise, public disturbances, and property use, to maintain a peaceful and law-abiding community."
    //         ],
    //         admins: [
    //             {
    //                 username: "ravi",
    //                 houseNo: 28
    //             }
    //         ],
    //         residents: [
    //             {
    //                 username: "ravi",
    //                 houseNo: 28
    //             },
    //             {
    //                 username: "vikas",
    //                 houseNo: 30
    //             }
    //         ],
    //         security: [
    //             "rahul"
    //         ],
    //         announcements: [
    //             {
    //                 username: "ravi",
    //                 announcement: "Community gates will be closed by 11pm today. Please carry a spare key in case of late arrival."
    //             }
    //         ],
    //         lostItems: [],
    //         disforum: [
    //             {
    //                 id: "1714803092",
    //                 username: "ravi",
    //                 topic: "Opinion needed regarding the planning of a new community hall",
    //                 comments: [
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "Post your opinions here",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "hi",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "hbghrsg",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "hbvh",
    //                         time: null
    //                     },
    //                     {
    //                         username: "vikas",
    //                         userType: "resident",
    //                         comment: "ttb",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "gg",
    //                         time: null
    //                     },
    //                     {
    //                         username: "vikas",
    //                         userType: "resident",
    //                         comment: "wfergs",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "gfyg",
    //                         time: null
    //                     },
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "nhynh",
    //                         time: null
    //                     }
    //                 ],
    //                 time: "2024-05-04T06:11:32.032Z"
    //             }
    //         ],
    //         poll: [
    //             {
    //                 id: "1714486839",
    //                 username: "ravi",
    //                 question: "Vote for the type of dinner you wish for ganesh chaturthi",
    //                 options: {
    //                     service: 5,
    //                     buffet: 7
    //                 },
    //                 voted: [
    //                     "ravi",
    //                     "vikas"
    //                 ],
    //                 time: "2024-04-30T14:20:39.860Z"
    //             },
    //             {
    //                 id: 1715579608770,
    //                 username: "ravi",
    //                 question: "gfffbg",
    //                 options: {
    //                     grf: 1,
    //                     gt: 0
    //                 },
    //                 voted: [
    //                     "ravi"
    //                 ],
    //                 time: "2024-05-13T05:53:28.770Z"
    //             }
    //         ],
    //         business: [
    //             {
    //                 id: "1714488060",
    //                 username: "vikas",
    //                 shopName: "Venkateswara Grocery Store",
    //                 shopNo: 5
    //             }
    //         ],
    //         event: [
    //             {
    //                 id: "1714492642",
    //                 username: "ravi",
    //                 hostUsername: "ravi",
    //                 eventName: "ganesh Chaturthi",
    //                 date: "06-04-2024",
    //                 type: "public",
    //                 venue: "community hall",
    //                 volunteer: [
    //                     "vikas",
    //                     "ravi"
    //                 ]
    //             }
    //         ],
    //         feedback: [
    //             {
    //                 username: "vikas",
    //                 comment: "Some painting works needed at the kids park",
    //                 time: "2024-05-05T13:08:52.964Z"
    //             },
    //             {
    //                 username: "ravi",
    //                 comment: "hahha",
    //                 time: "2024-05-05T13:31:00.084Z"
    //             },
    //             {
    //                 username: "ravi",
    //                 comment: "hah",
    //                 time: "2024-05-05T13:32:07.612Z"
    //             },
    //             {
    //                 username: "ravi",
    //                 comment: "ok done",
    //                 time: "2024-05-05T13:34:08.087Z"
    //             }
    //         ],
    //         visitor: [],
    //         sports: [
    //             {
    //                 id: "1714557295",
    //                 name: "Badminton",
    //                 noOfCourts: 2,
    //                 slots: [
    //                     {
    //                         username: "ravi",
    //                         date: "2024-05-02",
    //                         slot: 20
    //                     }
    //                 ]
    //             },
    //             {
    //                 id: 1714929007713,
    //                 name: "Tennis",
    //                 slots: []
    //             }
    //         ]
    //     }
    // ]
    // currentUser = {
    //     username: "ravi",
    //     email: "ravi@gmail.com",
    //     password: "$2a$06$7PoRNw7b9kA8P.n9AFjC6Ob.a/8UrWirwQyeW/ZbVbyjNpx0lxkmK",
    //     community: [
    //         "1714404642",
    //         1715019840610
    //     ],
    //     userType: "resident",
    //     visitor: []
    // }
    function remove(obj, st) {
        let keys = Object.keys(obj)
        keys = keys.filter(obj => obj !== st)
        let newObj = {}
        keys.map((key) => {
            newObj[key] = obj[key]
            return null
        })
        return newObj
    }
    useEffect(() => {
        if (communityStatus === false) {
            dispatch(getCommunityThunk(currentUser.community));
        }
    })
    async function handleFormSubmit(community) {
        community.id = `${Date.now()}`
        community.houseCount = parseInt(community.houseCount)
        community.houseCount = parseInt(community.houseCount)
        community.houseNo = parseInt(community.houseNo)
        community.address = {
            area: community.area,
            city: community.city,
            state: community.state,
            country: community.country
        }
        community = remove(community, 'area')
        community = remove(community, 'city')
        community = remove(community, 'state')
        community = remove(community, 'country')
        community.admins = [{
            username: currentUser.username,
            houseNo: community.houseNo
        }]
        community.residents = community.admins
        community.security = []
        community.security = []
        community.announcements = []
        community.lostItems = []
        community.disforum = []
        community.poll = []
        community.business = []
        community.event = []
        community.feedback = []
        community.visitor = []
        community.sports = []
        community = remove(community, 'houseNo')
        if (submitButton) {
            let res = await axios.post('http://localhost:4000/com-admin-api/community', community)
            if (res.data.message === 'Community created') {
                setF(true)
                setFormErr(res.data.message)
            }
            else {
                setF(true)
                setFormErr(res.data.message)
            }
        }
    }
    function setFun(s) {
        localStorage.setItem('userType', s)
        console.log(localStorage.getItem('userType'))
    }
    let [ff, setFf] = useState(false)
    async function handleFormSubmit1(obj) {
        console.log(obj)
        if (currentUser.userType === 'resident') {
            let subObj = {
                username: currentUser.username,
                id: obj.id,
                passwordResident: obj.password,
                houseNo: parseInt(obj.houseNo)
            }
            console.log(subObj)
            let res = await axios.put('http://localhost:4000/user-api/community/resident', subObj)
            if (res.data.message === "Community joined successfully") {
                setFf(false)
            }
        }
    }
    let [hoverId, setHoverId] = useState(-1);
    console.log(hoverId)
    async function handleFormSubmit2(obj) {
        if (currentUser.userType === 'security') {
            let subObj = {
                username: currentUser.username,
                id: obj.id,
                passwordSecurity: obj.password,
                userType: "security"
            }
            let res = await axios.put('http://localhost:4000/security-api/community/security', subObj)
            if (res.data.message === "Community joined successfully") {
                setFf(true)
            }
            console.log(res.data.message)
        }
    }
    return (
        <div>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending && <div className='m-4'>
                {currentUser.userType === 'resident' && <div className='row' style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
                    <div className='col'>
                        <div>
                            <h3>Make a community</h3>
                            {f && <button className='btn btn-success mb-1 px-3' onClick={() => setF(false)}>New Community</button>}
                            {!f && <button className='btn btn-success mb-1 px-3' onClick={() => setF(true)}>Back</button>}
                            {!f && <div className="rounded p-4 border border-1" style={{ backgroundImage: 'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))' }}>
                                <h1 className="display-3 fs-1 text-center mb-3">Make a community</h1>
                                {/* {err.length !== 0 && <p className="text-danger fs-3">{err}</p>} */}
                                <form
                                    className="w-100 row mx-auto ps-3 pe-3"
                                    onSubmit={handleSubmit(handleFormSubmit)}
                                >
                                    <div className="mb-1">
                                        <label htmlFor="name" className="form-label">
                                            Name of the community
                                        </label>
                                        <input type="text" id="name" className="form-control shadow-sm" placeholder='Name of the community'
                                            {...register("name", {
                                                required: true
                                            })}
                                        />
                                        {errors.name?.type === "required" && (
                                            <span className="text-danger">Name is required</span>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="passwordResident" className="form-label ">
                                            Joining password for resident
                                        </label>
                                        <input type="password" id="passwordResident" className="form-control shadow-sm" placeholder='Resident Password'
                                            {...register("passwordResident", {
                                                required: true,
                                            })}
                                        />
                                        {errors.passwordResident?.type === "required" && (
                                            <span className="text-danger">Joining password for resident is required</span>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="passwordSecurity" className="form-label">
                                            Joining password for security
                                        </label>
                                        <input type="password" id="passwordSecurity" className="form-control shadow-sm" placeholder='Security Password'
                                            {...register("passwordSecurity", {
                                                required: true,
                                            })}
                                        />
                                        {errors.passwordSecurity?.type === "required" && (
                                            <span className="text-danger">Joining password for security is required</span>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <div>
                                            <label className='form-label'>House Type :</label>
                                            <select className='form-control' style={{ width: '50%' }}
                                                {...register("houseType", {
                                                    required: true
                                                })}
                                            >
                                                <option value="villa">Villa</option>
                                                <option value="apartment">Apartment</option>
                                            </select>
                                        </div>
                                        {errors.houseType?.type === "required" && (
                                            <span className="text-danger">House Type is required</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="houseCount" className="form-label">
                                            House Count
                                        </label>
                                        <input type="number" id="houseCount" className="form-control shadow-sm" placeholder='House Count'
                                            {...register("houseCount", {
                                                required: true,
                                            })}
                                        />
                                        {errors.houseCount?.type === "required" && (
                                            <span className="text-danger">House Count is required</span>
                                        )}
                                    </div>
                                    <div className='p-2 mb-1'>
                                        <div className='p-3 border border-1 rounded rounded-3'>
                                            <h4>Address</h4>
                                            <div className="mb-1">
                                                <label htmlFor="area" className="form-label">
                                                    Area
                                                </label>
                                                <input type="text" id="area" className="form-control shadow-sm" placeholder='Area'
                                                    {...register("area", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.area?.type === "required" && (
                                                    <span className="text-danger">Area is required</span>
                                                )}
                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor="city" className="form-label">
                                                    City
                                                </label>
                                                <input type="text" id="city" className="form-control shadow-sm" placeholder='City'
                                                    {...register("city", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.city?.type === "required" && (
                                                    <span className="text-danger">City is required</span>
                                                )}
                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor="state" className="form-label">
                                                    State
                                                </label>
                                                <input type="text" id="state" className="form-control shadow-sm" placeholder='State'
                                                    {...register("state", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.state?.type === "required" && (
                                                    <span className="text-danger">State is required</span>
                                                )}
                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor="country" className="form-label">
                                                    Country
                                                </label>
                                                <input type="text" id="country" className="form-control shadow-sm" placeholder='Country'
                                                    {...register("country", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.country?.type === "required" && (
                                                    <span className="text-danger">Country is required</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="guidelines" className="form-label">
                                            Guidelines
                                        </label>
                                        <input type="text" id="guidelines" className="form-control shadow-sm" placeholder='Enter guidelines with $ in between 2 guidelines without enter space'
                                            {...register("guidelines", {
                                                required: true,
                                            })}
                                        />
                                        {errors.guidelines?.type === "required" && (
                                            <span className="text-danger">Guidelines is required</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="houseNo" className="form-label">
                                            Your house number
                                        </label>
                                        <input type="text" id="houseNo" className="form-control shadow-sm" placeholder='House Number'
                                            {...register("houseNo", {
                                                required: true,
                                            })}
                                        />
                                        {errors.houseNo?.type === "required" && (
                                            <span className="text-danger">House Number is required</span>
                                        )}
                                    </div>
                                    <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-3" onClick={() => {
                                        setSubmitButton(true)
                                        console.log(submitButton)
                                    }}>Submit</button>
                                </form>
                            </div>}
                            {submitButton && <div>
                                <p>{formErr}</p>
                                {formErr === "Community created" && <p>To see updated changes please login again</p>}
                            </div>}
                        </div>
                        <div>
                            <h3>Your communities</h3>
                            {communityArray.map((ele, ind) => {
                                if (ele.admins.filter((ele) => {
                                    return ele.username === currentUser.username
                                }).length === 1) {
                                    return (<div key={ind} className='p-3 border border-1 rounded-3' style={{
                                        width: '250px', backgroundImage: 'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))', cursor: 'pointer', transition: 'transform 0.5s',
                                        transform: ele.id === hoverId ? 'scale(1.05)' : 'scale(1)'
                                    }} onMouseEnter={() => setHoverId(ele.id)} onMouseLeave={() => { setHoverId(-1) }} onClick={() => {
                                        setFun("comAdmin")
                                        navigate(`/community/${ele.id}`)
                                    }}>
                                        <h5>{ele.name}</h5>
                                        <p>{ele.address.area}, {ele.address.city}, {ele.address.state}</p>
                                    </div>)
                                }
                                else {
                                    return null
                                }
                            })}
                            {communityArray.map((ele, ind) => {
                                if (ele.admins.filter((ele) => {
                                    return ele.username === currentUser.username
                                }).length === 1) {
                                    return (<div key={ind} className='p-3 border border-1 bg-light rounded-3' style={{ width: '250px' }} onClick={() => {
                                        navigate(`/community/${ele.id}`)
                                    }}>
                                        <h4>{ele.name}</h4>
                                        <p>{ele.address.area}, {ele.address.city}, {ele.address.state}</p>
                                    </div>)
                                }
                                else {
                                    return null
                                }
                            }).filter((ele) => {
                                return ele !== undefined
                            }).length === 0 && <p>Your communities not created yet</p>}
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <h3>Join a community</h3>
                            {!ff && <button className='btn btn-success mb-1' onClick={() => setFf(true)}>Join</button>}
                            {ff && <button className='btn btn-success mb-1' onClick={() => setFf(false)}>Back</button>}
                            {ff && <div className="rounded p-4 border border-1" style={{ backgroundImage: 'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))' }}>
                                <h1 className="display-3 fs-1 text-center mb-3">Join a community</h1>
                                {/* {err.length !== 0 && <p className="text-danger fs-3">{err}</p>} */}
                                <form
                                    className="w-100 row mx-auto ps-3 pe-3"
                                    onSubmit={handleSubmit(handleFormSubmit1)}
                                >
                                    <div className="mb-1">
                                        <label htmlFor="id" className="form-label">
                                            Community Id
                                        </label>
                                        <input type="text" id="id" className="form-control shadow-sm" placeholder='Community Id'
                                            {...register("id", {
                                                required: true
                                            })}
                                        />
                                        {errors.id?.type === "required" && (
                                            <span className="text-danger">Community Id is required</span>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="password" className="form-label ">
                                            Password
                                        </label>
                                        <input type="password" id="password" className="form-control shadow-sm" placeholder='Password'
                                            {...register("password", {
                                                required: true,
                                            })}
                                        />
                                        {errors.password?.type === "required" && (
                                            <span className="text-danger">Password is required</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="houseNo" className="form-label">
                                            Your house number
                                        </label>
                                        <input type="text" id="houseNo" className="form-control shadow-sm" placeholder='House Number'
                                            {...register("houseNo", {
                                                required: true,
                                            })}
                                        />
                                        {errors.houseNo?.type === "required" && (
                                            <span className="text-danger">House Number is required</span>
                                        )}
                                    </div>
                                    <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-3">Submit</button>
                                </form>
                            </div>}
                        </div>
                        <div>
                            <h3>Joined communities</h3>
                            {communityArray.map((ele, ind) => {
                                if (ele.residents.filter((resident) => {
                                    return resident.username === currentUser.username
                                }).length === 1) {
                                    if (ele.admins.filter((admin) => {
                                        return admin.username === currentUser.username
                                    }).length === 0) {
                                        return (<div key={ind} className='p-3 border border-1 rounded-3' style={{ width: '250px', backgroundImage: 'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))', cursor: 'pointer', transition: 'transform 0.5s', transform: ele.id === hoverId ? 'scale(1.05)' : 'scale(1)' }} onMouseEnter={() => setHoverId(ele.id)} onMouseLeave={() => { setHoverId(-1) }} onClick={() => {
                                            setFun('resident')
                                            navigate(`/community/${ele.id}`)
                                        }}>
                                            <h4>{ele.name}</h4>
                                            <p>{ele.address.area}, {ele.address.city}, {ele.address.state}</p>
                                        </div>)
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    return (<p>You are not present in any community</p>)
                                }
                            })}
                            {communityArray.map((ele, ind) => {
                                if (ele.residents.filter((resident) => {
                                    return resident.username === currentUser.username
                                }).length === 1) {
                                    if (ele.admins.filter((admin) => {
                                        return admin.username === currentUser.username
                                    }).length === 0) {
                                        return (<div key={ind} className='p-3 border border-1 bg-light rounded-3' style={{ width: '250px' }} onClick={() => {
                                            navigate(`/community/${ele.id}`)
                                        }}>
                                            <h3>{ele.name}</h3>
                                            <p>{ele.address.area}, {ele.address.city}, {ele.address.state}</p>
                                        </div>)
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    return null
                                }
                            }).filter((ele) => {
                                return ele !== undefined
                            }).length === 0 && <p>You are not present in any community</p>}
                        </div>
                    </div>
                </div>}
                {currentUser.userType === "security" && <div>
                    <div>
                        <h3>Join a community</h3>
                        {!ff && <button className='btn btn-success mb-1' onClick={() => setFf(true)}>Join</button>}
                        {ff && <button className='btn btn-success mb-1' onClick={() => setFf(false)}>Back</button>}
                        {ff && <div className="col-lg-6 col-md-1 sol-sm-12 rounded p-4 border border-1" style={{ backgroundImage: 'linear-gradient(135deg,rgb(242, 242, 242),rgb(248, 249, 250))' }}>
                            <h1 className="display-3 fs-1 text-center mb-3">Join a community</h1>
                            {/* {err.length !== 0 && <p className="text-danger fs-3">{err}</p>} */}
                            <form
                                className="w-100 row mx-auto ps-3 pe-3"
                                onSubmit={handleSubmit(handleFormSubmit2)}
                            >
                                <div className="mb-1">
                                    <label htmlFor="id" className="form-label">
                                        Community Id
                                    </label>
                                    <input type="text" id="id" className="form-control shadow-sm" placeholder='Community Id'
                                        {...register("id", {
                                            required: true
                                        })}
                                    />
                                    {errors.id?.type === "required" && (
                                        <span className="text-danger">Community Id is required</span>
                                    )}
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label ">
                                        Password
                                    </label>
                                    <input type="password" id="password" className="form-control shadow-sm" placeholder='Password'
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password?.type === "required" && (
                                        <span className="text-danger">Password is required</span>
                                    )}
                                </div>
                                <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-3">Submit</button>
                            </form>
                        </div>}
                    </div>
                    {ff && <p>Community joined successfully login again</p>}
                    <h1>Your communities</h1>
                    {communityArray
                        .filter((ele) => ele.security.includes(currentUser.username))
                        .map((ele, ind) => (
                            <div
                                key={ind}
                                className='p-3 border border-1 rounded-3 bg-light'
                                style={{
                                    width: '250px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.5s',
                                    transform: ele.id === hoverId ? 'scale(1.05)' : 'scale(1)',
                                }}
                                onMouseEnter={() => setHoverId(ele.id)}
                                onMouseLeave={() => setHoverId(-1)}
                                onClick={() => {
                                    setFun("comAdmin");
                                    navigate(`/community/${ele.id}`);
                                }}
                            >
                                <h4>{ele.name}</h4>
                                <p>
                                    {ele.address.area}, {ele.address.city}, {ele.address.state}
                                </p>
                            </div>
                        ))}
                    {communityArray
                        .filter(ele => ele.security.includes(currentUser.username)) // ✅ keep only joined communities
                        .map((ele, ind) => (
                            <div
                                key={ind}
                                className="p-3 border border-1 rounded-3"
                                style={{ width: "250px" }}
                                onClick={() => navigate(`/community/${ele.id}`)}
                            >
                                <h4>{ele.name}</h4>
                                <p>
                                    {ele.address.area}, {ele.address.city}, {ele.address.state}
                                </p>
                            </div>
                        ))
                    }
                    {communityArray.filter(ele => ele.security.includes(currentUser.username)).length === 0 && (
                        <p>No community joined yet</p>
                    )}
                </div>}
            </div>}
        </div>
    )
}

export default Community
