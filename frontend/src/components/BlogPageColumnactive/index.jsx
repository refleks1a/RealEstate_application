import React from "react";

import moment from "moment";

import { Img, Text } from "..";
import { Link } from "react-router-dom";

const BlogPageColumnactive = (props) => {

  const post = props.post

  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <Img
            className="h-[350px] sm:h-auto object-cover rounded-bl-lg rounded-br-lg w-full"
            src={post.photo1}
            alt="rectangle5617"
          />
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <Text
                className="leading-[135.00%] md:max-w-full max-w-sm text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px]"
                size="txtManropeBold24Gray900"
              >
                {post.title} by {post.author.full_name} ({post.author.username})
              </Text>
              <div className="flex flex-row gap-6 items-start justify-start md:pr-10 sm:pr-5  w-full">
                <div className="flex flex-row gap-1.5 items-center justify-start pr-0.5 pt-0.5 w-[44%]">
                  <div className="bg-bluegray-100 h-[5px] my-1.5 rounded-sm w-[5px]"></div>
                  <Text
                    className="text-gray-600 text-xs"
                    size="txtManropeSemiBold12"
                  >
                    Ref.code {post.reference_code}
                  </Text>
                </div>
                <div className="flex flex-row gap-1.5 items-center justify-center w-[34%]">
                  <div className="bg-bluegray-100 h-[5px] my-1.5 rounded-sm w-[5px]"></div>
                  <Text
                    className="mr-[17px] text-gray-600 text-xs"
                    size="txtManropeSemiBold12"
                  >
                    {post.views} views(s)
                  </Text> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start w-full">
          <Text
            className="text-gray-600 text-lg w-auto"
            size="txtManropeBold18Gray600"
          >
            {post.published_status ? 
            (<Link to={`/blog/details/${post.id}`}>
              {props?.active}
            </Link>) : 
            (`Will be published on ${moment(post.publish_date).format("YYYY/MM/DD")}`)}
          </Text>
          <Img
            className="h-6 w-6"
            src="images/img_arrowright_gray_600.svg"
            alt="arrowright"
          />
        </div>
      </div>
    </>
  );
};

BlogPageColumnactive.defaultProps = {
  business: "Business",
  p10delightfuldinone: "10 Delightful Dining Room Decor Trends for Spring",
  july202022: "July 20, 2022",
  time: "7 min read",
  active: "Continue Reading The Post",
};

export default BlogPageColumnactive;
