import React from "react";

import { useParams } from "react-router-dom";

import LandingPageFooter from "../../components/LandingPageFooter";
import LandingPageHeader from "../../components/LandingPageHeader";

import EnterOTPModal from "../../modals/EnterOTP";


const ActivatePage = () => {

    const { uid, token } = useParams();

    return (
        <>
            <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-center w-full">
                <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
                <EnterOTPModal uid={uid} token={token} />
            </div>    
            <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
            </div>
        </>
    );
};

export default ActivatePage;
