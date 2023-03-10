import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../config/firebase";
import { BASE_URL } from "../config/api";
import Loading from "./Loading";

const ForgotPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const [emailExists, setEmailExists] = React.useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const onSubmit = (data) => {
        const submit = async () => {
            setLoading(true);
            await sendPasswordResetEmail(auth, data.email, {
                url: "http://localhost:3000/auth/login",
            })
                .then(() => {
                    setIsReset(true);
                    setEmailExists(true);
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found") {
                        setError("email", {
                            type: "invalid",
                        });
                        setEmailExists(false);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        submit();
    };
    return (
        <div className='forgot-password__form bg-light fade-in rounded-3 shadow-lg p-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='forgot-password__form__heading mb-3 col-3'>
                <img
                    src={BASE_URL + "images/logo2.png"}
                    alt=''
                    className='w-100 object-fit-cover'
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div className='mb-3'>
                    <div
                        className={`p-3 bg-opacity-25 border rounded ${
                            emailExists
                                ? "border-success bg-success"
                                : "border-danger bg-danger"
                        }`}
                    >
                        <p
                            className={`text-center mb-0 ${
                                emailExists ? "text-success" : "text-danger"
                            }`}
                        >
                            {!emailExists
                                ? "Ch??ng t??i kh??ng t??m th???y t??i kho???n n??o li??n k???t v???i email n??y"
                                : !isReset
                                ? "Nh???p Email c???a b???n v?? h?????ng d???n s??? ???????c g???i ?????n b???n!"
                                : "Ki???m tra th?? c???a b???n v?? ?????t l???i m???t kh???u c???a b???n."}
                        </p>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='form-label'>
                        Email ????ng nh???p
                    </label>
                    <input
                        type='email'
                        className={`form-control ${
                            errors.email && "is-invalid"
                        }`}
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Nh???p email'
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <div className='form-text text-danger'>
                            Vui l??ng nh???p tr?????ng n??y
                        </div>
                    )}
                    {errors.email?.type === "invalid" && (
                        <div className='form-text text-danger'>
                            Email n??y ch??a ???????c ????ng k??
                        </div>
                    )}
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn--color-1 w-100'>
                        G???i th??ng tin
                    </button>
                </div>
                <div className='text-center'>
                    <span className='me-2'>B???n v???n nh??? m???t kh???u ?</span>
                    <Link
                        to='/auth/login'
                        className='color-1 fw-semibold hover-text--underline'
                    >
                        ????ng nh???p
                    </Link>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default ForgotPassword;
