import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLoginThunk } from "../../redux/slices/userSlice";
import './Signin.css';

function Signin() {
    let [err, setErr] = useState('');
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let navigate = useNavigate();

    let { isUserPending, currentUser, userLoginStatus, userErrorOccurred, userErrMsg } =
        useSelector((state) => state.userLoginReducer);
    let dispatch = useDispatch();

    function handleFormSubmit(user) {
        dispatch(userLoginThunk(user));
    }

    useEffect(() => {
        if (userLoginStatus) {
            navigate("/user-profile");
        }
    }, [userLoginStatus, navigate]);

    useEffect(() => {
        if (userErrorOccurred) {
            setErr(userErrMsg);
        }
    }, [userErrorOccurred, userErrMsg]);

    return (
        <div>
            <h1 className="display-3 fs-2 text-center mb-3">Signin</h1>
            {err.length !== 0 && <p className="text-danger fs-3">{err}</p>}
            {isUserPending && <ReactLoading className="mx-auto" type={'spinningBubbles'} color={'grey'} height={100} width={100} />}
            {!isUserPending && <form
                className="w-100 row mx-auto ps-3 pe-3"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="mb-1">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control shadow-sm"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                    {errors.username?.type === "required" && (
                        <span className="text-danger">Username is required</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control shadow-sm"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="text-danger">Password is required</span>
                    )}
                </div>
                <button className="btn btn-success col-sm-6 col-md-4 col-lg-3 d-block mx-auto mb-3">Signin</button>
            </form>}
        </div>
    );
}

export default Signin;
