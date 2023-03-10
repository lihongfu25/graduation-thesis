import React from "react";
import { applyActionCode } from "firebase/auth";
import { BASE_URL } from "../config/api";
import auth from "../config/firebase";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const VerifyEmail = () => {
    const [loading, setLoading] = React.useState(false);
    const [verified, setVerified] = React.useState(false);
    const [countdown, setCountdown] = React.useState(10);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (verified) {
            var interval = setInterval(() => {
                if (countdown === 1) {
                    clearInterval(interval);
                    navigate("/auth/login");
                } else {
                    setCountdown((prev) => prev - 1);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [verified, countdown, navigate]);
    const handleRedict = () => {
        navigate("/auth/login");
    };
    const handleSubmit = () => {
        const verify = async () => {
            setLoading(true);
            await applyActionCode(auth, searchParams.get("oobCode"))
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                    setVerified(true);
                });
        };
        verify();
    };
    return (
        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-secondary-subtle d-flex justify-content-center align-items-center'>
            <div className='container'>
                {verified ? (
                    <div className='col-4 p-4 shadow-lg rounded-3 mx-auto fade-in'>
                        <div className='col-4 mx-auto mb-4'>
                            <img
                                src={BASE_URL + "images/icon/check.svg"}
                                alt=''
                                className='w-100 object-fit-cover'
                            />
                        </div>
                        <div className='text-center'>
                            <p className='fs-3 color-1'>
                                X??c th???c t??i kho???n th??nh c??ng
                            </p>
                            <p className='color-10'>
                                B??y gi??? b???n ???? c?? th??? ????ng nh???p v?? s??? d???ng ???ng
                                d???ng c???a ch??ng t??i.
                            </p>
                            <button
                                className='btn btn--color-1 col-6 mb-3'
                                onClick={handleRedict}
                            >
                                Tr??? v??? trang ch???
                            </button>
                            <p className='color-3'>
                                T??? ?????ng v??? trang ch??? sau {countdown} gi??y.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='col-4 p-4 shadow-lg rounded-3 mx-auto'>
                        <div className='col-4 mx-auto mb-4'>
                            <img
                                src={BASE_URL + "images/icon/email.svg"}
                                alt=''
                                className='w-100 object-fit-cover'
                            />
                        </div>
                        <div className='text-center'>
                            <p className='fs-3 color-1'>
                                X??c th???c t??i kho???n email
                            </p>
                            <p className='color-10'>
                                C???m ??n b???n ???? ????ng k?? s??? d???ng d???ch v??? c???a ch??ng
                                t??i. Vui l??ng b???m <label htmlFor=''>n??t</label>{" "}
                                b??n d?????i ????? ho??n t???t vi???c x??c th???c t??i kho???n
                                email c???a b???n.
                            </p>
                            <button
                                className='btn btn--color-1 col-6 mb-3'
                                onClick={handleSubmit}
                            >
                                X??c th???c
                            </button>
                            <p className='color-3'>
                                N???u b???n kh??ng y??u c???u x??c th???c email n??y, vui
                                l??ng b??? qua.
                            </p>
                        </div>
                    </div>
                )}
                {loading && <Loading />}
            </div>
        </div>
    );
};

export default VerifyEmail;
