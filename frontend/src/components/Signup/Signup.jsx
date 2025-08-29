import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup({ fun }) {
    let [err, setErr] = useState('')
    let navigate = useNavigate();
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function handleFormSubmit(newUser) {
        newUser.community = []
        newUser.visitor = []
        const res = await axios.post('http://localhost:4000/user-api/user', newUser)
        if (res.data.message == "User created") {
            fun(1)
        }
        else {
            setErr(res.data.message)
        }
    }

    return (
        <div>
            <h1 className="display-3 fs-3 text-center mb-3">Signup</h1>
            {err.length !== 0 && <p className="text-danger fs-3">{err}</p>}
            <form
                className="w-100 row mx-auto ps-3 pe-3"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="mb-1">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" className="form-control shadow-sm" placeholder="Username"
                        {...register("username", {
                            required: true
                        })}
                    />
                    {errors.username?.type === "required" && (
                        <span className="text-danger">Username is required</span>
                    )}
                </div>
                <div className="mb-1">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" id="email" className="form-control shadow-sm" placeholder="Email"
                        {...register("email", {
                            required: true
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <span className="text-danger">Email is required</span>
                    )}
                </div>
                <div className="mb-1">
                    <label htmlFor="password" className="form-label ">
                        Password
                    </label>
                    <input type="password" id="password" className="form-control shadow-sm" placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="text-danger">Password is required</span>
                    )}
                </div>
                <div className="mb-3">
                    <div>
                        <label className='form-label' htmlFor='userType'>User Type</label>
                        <select className='form-control'
                            {...register("userType", {
                                required: true
                            })}
                        >
                            <option value="resident">Resident</option>
                            <option value="security">Security</option>
                        </select>
                    </div>
                    {errors.userType?.type === "required" && (
                        <span className="text-danger">User Type is required</span>
                    )}
                </div>
                <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-3">Signup</button>

            </form>
        </div>
    );
}

export default Signup;