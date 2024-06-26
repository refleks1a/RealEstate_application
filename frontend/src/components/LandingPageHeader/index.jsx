import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Button, Img, List, Text } from "..";
import { logout, reset } from "../../features/auth/authSlice";


const LandingPageHeader = (props) => {

	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
		dispatch(reset());
	};

  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row my-px">
            <Link to="/" >
              <div className="flex flex-row gap-[11px] items-center justify-start">
                <Img className="h-10 w-10" src="images/img_home.svg" alt="home" />
                <Text
                  className="text-orange-A700 text-xl w-auto"
                  size="txtMarkoOneRegular20"
                >
                  Relasto
                </Text>
              </div>
            </Link>
            
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-center w-[492px] sm:w-full">
            <List
              className="sm:flex-col flex-row gap-10 grid grid-cols-4"
              orientation="horizontal"
            >
              <div className="flex flex-row gap-1.5 items-start justify-center w-[77px]">
                <Text
                  className="text-base text-gray-900 w-auto"
                  size="txtManropeSemiBold16"
                >
                  <Link to={"/"}>Home</Link>
                </Text>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-center w-[77px]">
                <Text
                  className="text-base text-gray-900 w-auto"
                  size="txtManropeSemiBold16"
                >
                  <Link to={"/listing"} >Listing</Link>
                </Text>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-center w-[77px]">
                <Text
                  className="text-base text-gray-900 w-auto"
                  size="txtManropeSemiBold16"
                >
                  {user ? (<Link to={"/agentlist"} >Agents</Link>) : (null)}
                </Text>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-center w-[77px]">
                <Text
                  className="text-base text-gray-900 w-auto"
                  size="txtManropeSemiBold16"
                >
                  {user ? ( <Link to={"/blogpage"}>Blog</Link>) : (null)}
                </Text>
              </div>

            </List>
          </div>
          <div className="flex flex-row gap-10 h-[42px] md:h-auto sm:hidden items-center justify-start w-[228px]">
            <Button
              className="bg-transparent cursor-pointer flex items-center justify-center min-w-[94px]"
              leftIcon={
                <Img
                  className="h-6 mb-px mr-2"
                  src="images/img_search.svg"
                  alt="search"
                />
              }
            >
              <div className="font-bold font-manrope text-gray-900 text-left text-lg">
                Search
              </div>
            </Button>
            {user ? (
                <Button className="bg-gray-900 cursor-pointer font-manrope font-semibold py-2.5 rounded-[10px] text-base text-center text-white-A700 w-full"
                onClick={logoutHandler}
                >
                  Log out
                </Button>   
            ): (
              <Link to={"/login"} className="py-2.5 w-full" >
                <Button className="bg-gray-900 cursor-pointer font-manrope font-semibold py-2.5 rounded-[10px] text-base text-center text-white-A700 w-full">
                  Log in
                </Button>   
              </Link>   
            )}
          </div>
        </div>
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
