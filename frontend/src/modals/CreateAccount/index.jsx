import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { register, reset, logout } from "../../features/auth/authSlice";


import { Button, CheckBox, Img, Input, Line, Text } from "../../components";

const CreateAccountModal = (props) => {

  const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [re_password, setRePassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
      logout()
			navigate("/activate/alert");      
		}

    if (user) {
      navigate("/activate/alert")
    } 

		dispatch(reset());
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== re_password) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				username,
				first_name,
				last_name,
				email,
				password,
				re_password,
			};

      dispatch(register(userData));
		}
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
                    Create Account
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    <Input
                      name="textfieldlarge"
                      placeholder="Email address"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_email.svg"
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
                    <Input
                      name="textfieldlarge_Two"
                      placeholder="Confirm Password"
                      className="font-semibold p-0 placeholder:text-gray-600 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex px-4 py-[17px] rounded-[10px] w-full"
                      type="password"
                      value={re_password}
                      onChange={(e) => setRePassword(e)}
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
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    <Input
                      name="textfieldlarge_Two"
                      placeholder="Username"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                  <Input
                      name="textfieldlarge_Three"
                      placeholder="First name"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                    <Input
                      name="textfieldlarge_Four"
                      placeholder="Last name"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start w-full">
                <CheckBox
                  className="font-bold text-gray-600 text-left text-lg"
                  inputClassName="border-2 border-gray-900 border-solid h-[18px] mr-[5px] rounded w-[18px]"
                  name="iagreetoallterm_One"
                  id="iagreetoallterm_One"
                  label="I agree to all Terms & Conditions"
                ></CheckBox>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] items-start justify-start w-full">
              <Button className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full">
                Create Account
              </Button>
            </div>
          </form>  
          <Line className="bg-bluegray-100 h-px w-full" />
          <div className="flex flex-row gap-2 items-start justify-center w-full">
            <Text
              className="text-center text-gray-600 text-xl tracking-[-0.40px] w-auto"
              size="txtManropeSemiBold20Gray600"
            >
              Have an account?
            </Text>
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

export default CreateAccountModal;
