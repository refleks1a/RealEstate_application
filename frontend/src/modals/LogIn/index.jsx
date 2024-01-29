import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import { Button, CheckBox, Img, Input, Line, Text } from "../../components";

import { login, reset } from "../../features/auth/authSlice";


const LogInModal = (props) => {

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
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
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email) {
			toast.error("An email must be provided");
		}

		if (!password) {
			toast.error("A password must be provided");
		}

		const userData = {
			email,
			password,
		};

    dispatch(login(userData));
	};

  return (

      <div className="sm:h-auto md:h-auto max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start md:px-5 px-[30px] py-10 rounded-[10px] w-full">
          <div className="flex flex-col gap-8 items-center justify-center w-full">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-row gap-2 items-center justify-start w-full">
                    <Text
                      className="flex-1 text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                      size="txtManropeExtraBold36"
                    >
                      Log in
                    </Text>

                  </div>
                  <div className="flex flex-col gap-3 items-start justify-start w-full">
                    <Input
                      name="textfieldlarge"
                      placeholder="email address"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                    <Input
                      name="textfieldlarge_One"
                      placeholder="Password"
                      className="font-semibold p-0 placeholder:text-gray-600 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex px-4 py-[17px] rounded-[10px] w-full"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user_gray_600.svg"
                          alt="user"
                        />
                      }
                      suffix={
                        <Img
                          className="mt-auto mb-px h-6 ml-[35px]"
                          src="images/img_airplane.svg"
                          alt="airplane"
                        />
                      }
                    ></Input>
                  </div>
                </div>
                <div className="flex flex-row gap-5 items-center justify-between w-full">
                  <CheckBox
                    className="font-bold sm:pr-5 text-gray-900 text-left text-lg"
                    inputClassName="border-2 border-gray-900 border-solid h-[18px] mr-[5px] rounded w-[18px]"
                    name="remember"
                    id="remember"
                    label="Remember"
                  ></CheckBox>
                  <Text
                    className="text-gray-900 text-lg text-right w-auto"
                    size="txtManropeBold18Gray900"
                  >
                    Email must be confirmed!
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-[18px] items-start justify-start w-full">
                <Button className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full">
                  Log in
                </Button>
              </div>
            </form>
            <Line className="bg-bluegray-100 h-px w-full" />
            <div className="flex flex-row gap-2 items-start justify-center w-full">
              <Text
                className="text-center text-gray-600 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray600"
              >
                Don’t have an account?
              </Text>
              <Text
                className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray900"
              >
                <Link to="/register"  >Create Account</Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LogInModal;
