import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { activate, reset } from "../../features/auth/authSlice";

import { Button, Line, Text } from "../../components";

const EnterOTPModal = (props) => {

  const uid = props.uid
  const token = props.token
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
		}

		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	const submitHandler = () => {
		const userData = {
			uid,
			token,
		};

		dispatch(activate(userData));
		toast.success("Your account has been activated! You can login now");
	};

  return (

    <div className="sm:h-auto md:h-auto max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
      <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start md:px-5 px-[30px] py-10 rounded-[10px] w-full">
        <div className="flex flex-col gap-8 items-center justify-center w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                  <Text
                    className="flex-1 text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                    size="txtManropeExtraBold36"
                    style={{textAlign: "center"}}
                  >
                    Confirm account
                  </Text>
                </div>
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtManropeRegular18"
                >
                  Please click the button, to confirm email
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[18px] items-start justify-start w-full">
            <Button className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full"
            type="submit"
            onClick={submitHandler}
            >
              Confirm
            </Button>
          </div>
          <Line className="bg-bluegray-100 h-px w-full" />
          <div className="flex flex-row gap-2 items-start justify-center w-full">
            <Text
              className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
              size="txtManropeSemiBold20Gray900"
            >
              <Link to="/login" >Log in</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOTPModal;
