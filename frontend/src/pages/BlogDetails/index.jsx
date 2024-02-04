import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createColumnHelper } from "@tanstack/react-table";

import { Img, List, ReactTable, Text } from "../../components";
import BlogPageColumnactive from "../../components/BlogPageColumnactive";
import LandingPageFooter from "../../components/LandingPageFooter";
import LandingPageHeader from "../../components/LandingPageHeader";

import { getPostDetails } from "../../features/blog/blogSlice";

const BlogDetailsPage = () => {
  const params = useParams()

  const {post, isLoading, isError, message} = useSelector(
      (state) => state.blog
  )

  const { user, isLoadingUser, isErrorUser, isSuccessUser, messageUser } = useSelector(
		(state) => state.auth
	);


  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
			console.log(message)
		}

    const data = {
      "token": user.access,
      "id": params.id,
    }

    dispatch(getPostDetails(data));

  }, [dispatch, isError, message]);

  const tableData = React.useRef([
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
  ]);
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("fullname", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[9px] pt-[17px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Full Name
          </Text>
        ),
      }),
      tableColumnHelper.accessor("title", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[7px] pt-[19px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Title
          </Text>
        ),
      }),
      tableColumnHelper.accessor("emailaddress", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[7px] pt-[19px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Email Address
          </Text>
        ),
      }),
      tableColumnHelper.accessor("phonenumber", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[9px] pt-[17px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[214px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Phone Number
          </Text>
        ),
      }),
    ];
  }, []);

  console.log(post)
  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[111px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
        <div className="flex flex-col font-manrope items-start justify-start pl-[120px] pr-[324px] md:px-10 sm:px-5 w-full">
          <div className="flex flex-col gap-10 items-start justify-start w-full">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
              size="txtManropeExtraBold36"
            >
              {post.title}
            </Text>
            <div className="flex flex-col md:gap-10 gap-[84px] items-start justify-start w-full">
              <div className="flex md:flex-col flex-row gap-4 items-end justify-between w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <Img
                    className="h-[550px] sm:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-full"
                    src={post.photo1}
                    alt="rectangle5618"
                  />
                  <Text
                    className="leading-[180.00%] text-gray-600 text-lg"
                    size="txtManropeRegular18Gray600"
                  >
                    <>
                      {post.body}
                    </>
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-12 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                    size="txtManropeExtraBold28"
                  >
                    Subtitle
                  </Text>
                  <Text
                    className="text-gray-600 text-lg w-full"
                    size="txtManropeRegular18Gray600"
                  >
                    <>
                      {post.subtitle}
                    </>
                  </Text>
                </div>
                
              </div>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                    size="txtManropeExtraBold28"
                  >
                    Images
                  </Text>
                </div>
                <Img
                  className="h-[532px] md:h-auto object-cover rounded-tl-[10px] rounded-tr-[10px] w-full"
                  src={post.photo2}
                  alt="rectangle5619"
                />
                <Img
                  className="h-[532px] md:h-auto object-cover rounded-tl-[10px] rounded-tr-[10px] w-full"
                  src={post.photo3}
                  alt="rectangle5619"
                />
              </div>
              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <Text
                  className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                  size="txtManropeExtraBold28"
                >
                  About the author: {post.author ? (`${post.author.full_name} (${post.author.username})`) : (null)}
                </Text>
                <Text
                  className="leading-[180.00%] text-gray-600 text-lg"
                  size="txtManropeRegular18Gray600"
                >
                  <>
                    {post.author ? (`${post.author.about_me}`) : (null)}
                  </>
                </Text>
              </div>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <Text
                  className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                  size="txtManropeBold24Gray900"
                >
                  Writen by
                </Text>
                <div className="flex flex-col items-center justify-between md:pr-10 sm:pr-5 pr-[568px] w-full">
                  <div className="flex sm:flex-col flex-row gap-6 items-center justify-start max-w-[836px] w-full">
                    <Img
                      className="h-[100px] md:h-auto rounded-[50%] w-[100px]"
                      src="images/img_profilepicture.png"
                      alt="profilepicture"
                    />
                    <div className="flex flex-col gap-2 items-start justify-start w-[165px]">
                      <Text
                        className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-auto"
                        size="txtManropeBold24Gray900"
                      >
                        Kristin Watson
                      </Text>
                      <Text
                        className="text-base text-gray-600 w-full"
                        size="txtManropeSemiBold16Gray600"
                      >
                        Co-founder and CDO
                      </Text>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                      <div className="bg-bluegray-100 h-2 rounded-[50%] w-2"></div>
                      <Text
                        className="text-base text-gray-600 w-auto"
                        size="txtManropeSemiBold16Gray600"
                      >
                        July 20, 2022
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="flex flex-col gap-10 items-start justify-start max-w-[1200px] mx-auto w-full">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
              size="txtManropeExtraBold36"
            >
              Recent News
            </Text>
            <List
              className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
              orientation="horizontal"
            >
              {/* {new Array(3).fill({}).map((props, index) => (
                <React.Fragment key={`BlogPageColumnactive${index}`}>
                  <BlogPageColumnactive
                    className="flex flex-1 flex-col gap-6 items-start justify-start w-full"
                    {...props}
                  />
                </React.Fragment>
              ))} */}
            </List>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default BlogDetailsPage;
