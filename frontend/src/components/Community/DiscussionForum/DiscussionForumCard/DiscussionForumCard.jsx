import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommunityThunk } from '../../../../redux/slices/communitySlice';

function DiscussionForumCard() {
    let { cid, id } = useParams()
    let { currentUser, } = useSelector((state) => state.userLoginReducer);
    let { isCommunityPending, communityArray } = useSelector((state) => state.getCommunityReducer);
    let [obj, setObj] = useState()
    let [f, setF] = useState(false)
    let [ff, setFF] = useState(true)
    let [text, setText] = useState(null)
    let [message, setMessage] = useState("")
    let [err, setErr] = useState(false)
    let dispatch = useDispatch()
    // communityArray = [
    //     {
    //         _cid: "662fbd226c406e487b9e6746",
    //         cid: "1714404642",
    //         passwordRescident: "$2a$06$LnqWwMzDjCA2eUfk3T0Ny.e9BtknTYub4TWq.0eBMjgTvXBdIMNmG",
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
    //             "Property upkeep: Rescidents are expected to maintain their properties in a clean and tcidy manner, including regular lawn care and removal of debris.",
    //             "Parking regulations: Park vehicles only in designated areas and adhere to any specified parking restrictions to ensure accessibility and safety for all rescidents.",
    //             "Waste management: Dispose of trash and recycling properly in designated bins, and refrain from littering or dumping items in common areas.",
    //             "Pet policies: Keep pets under control at all times, clean up after them, and adhere to leash laws when walking them within the community.",
    //             "Compliance with local laws: Abcide by all applicable laws and regulations, including those related to noise, public disturbances, and property use, to maintain a peaceful and law-abciding community."
    //         ],
    //         admins: [
    //             {
    //                 username: "ravi",
    //                 houseNo: 28
    //             },
    //             {
    //                 username: "vikas",
    //                 houseNo: 30
    //             }
    //         ],
    //         rescidents: [
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
    //             {
    //                 username: "rahul"
    //             },
    //             "rahul"
    //         ],
    //         announcements: [
    //             {
    //                 username: "ravi",
    //                 announcement: "Community gates will be closed by 11.30pm today. Please carry a spare key in case of late arrival."
    //             }
    //         ],
    //         events: [],
    //         lostItems: [],
    //         disforum: [
    //             {
    //                 cid: "1714473402",
    //                 username: "ravi",
    //                 topic: "Opinion needed regarding the planning of a new community hall",
    //                 comments: [
    //                     {
    //                         username: "ravi",
    //                         userType: "admin",
    //                         comment: "Hey everyone, voice your opinions regarding this matter here",
    //                         time: "2024-04-30T13:17:28.099Z"
    //                     }
    //                 ],
    //                 time: "2024-04-30T10:36:42.123Z"
    //             }
    //         ],
    //         poll: [
    //             {
    //                 cid: "1714486839",
    //                 username: "ravi",
    //                 question: "Vote for the type of dinner you wish for ganesh chaturthi",
    //                 options: {
    //                     service: 0,
    //                     buffet: 0
    //                 },
    //                 time: "2024-04-30T14:20:39.860Z"
    //             }
    //         ],
    //         business: [
    //             {
    //                 cid: "1714488060",
    //                 username: "vikas",
    //                 shopName: "Venkateswara Grocery Store",
    //                 shopNo: 5
    //             }
    //         ],
    //         event: [
    //             {
    //                 cid: "1714492642",
    //                 username: "ravi",
    //                 hostUsername: "ravi",
    //                 eventName: "ganesh Chaturthi",
    //                 date: "06-04-2024",
    //                 type: "public",
    //                 venue: "community hall",
    //                 volunteer: [
    //                     "vikas"
    //                 ]
    //             }
    //         ],
    //         feedback: [
    //             {
    //                 username: "vikas",
    //                 time: "2024-04-30T16:33:55.085Z"
    //             }
    //         ],
    //         visitor: [],
    //         sports: [
    //             {
    //                 cid: "1714557295",
    //                 name: "Badminton",
    //                 noOfCourts: 2,
    //                 slots: [
    //                     {
    //                         username: "ravi",
    //                         date: "2024-05-02",
    //                         slot: 20
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
    useEffect(() => {
        if (!f && ff) {
            if (communityArray !== undefined) {
                setObj((communityArray.filter((ele) => {
                    return ele.id === cid
                }))[0].disforum)
            }
            if (obj !== undefined) {
                setObj(obj.filter((ele) => {
                    if (ele.id === id) {
                        setF(true)
                        setFF(false)
                    }
                    return ele.id === id
                })[0])
            }
        }
    },[cid,id,communityArray,f,ff,obj])
    function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    async function commentSubmit() {
        if (text !== null) {
            let newObj = {
                cid: cid,
                id: id,
                username: currentUser.username,
                userType: localStorage.getItem('userType') === "comAdmin" ? "admin" : "resident",
                comment: text
            }
            let res = await axios.put('http://localhost:4000/user-api/discussion-forum/comment', newObj)
            if (res.data.message === "Comment added successfully") {
                dispatch(getCommunityThunk(currentUser.community));
                setMessage("Comment added successfully")
                setErr(true)
                setTimeout(() => {
                    setErr(false)
                }, 10000)
            }
            else {
                setErr("Error occurres")
            }
        }
    }
    return (
        <div>
            {isCommunityPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isCommunityPending && <div>
                {f && communityArray.filter((ele) => {
                    return ele.id === cid
                })[0].disforum.map((eleo) => {
                    if (eleo.id === id) {
                        return (<div>
                            <h3>{eleo.topic}</h3>
                            <p>- {eleo.username}</p>
                            <p>Time : {eleo.time}</p>
                            <div className='m-1 p-2'>
                                {eleo.comments.map((ele) => {
                                    return (<div className={`border border-1 p-1 m-3 ${ele.username === currentUser.username ? "text-end" : ""} rounded rounded-3 bg-light`}>
                                        <b style={{ color: `${ele.userType === "admin" ? "blue" : ""}` }}>{ele.username === currentUser.username ? "You" : cap(ele.username)}</b>
                                        <br />
                                        {ele.comment}
                                    </div>)
                                })}
                                {eleo.comments.length === 0 && <p>No Comments yet</p>}
                            </div>
                            <div>
                                <div>
                                    <input className='form-control' type='text' placeholder='Add a comment' onChange={(e) => setText(e.target.value)} />
                                </div>
                                <div>
                                    <button className='btn btn-success m-3 d-block mx-auto' onClick={() => commentSubmit()}>Post</button>
                                </div>
                            </div>
                            {err && <p className='text-center'>{message}</p>}
                        </div>)
                    }
                    else{
                        return null
                    }
                })
                }
            </div>}
        </div>
    )
}

export default DiscussionForumCard