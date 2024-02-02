import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import { Button, Img, Line, List, SelectBox, Text, PropertiesList } from "../../components";

import LandingPageFooter from "../../components/LandingPageFooter";
import LandingPageHeader from "../../components/LandingPageHeader";

import { getProfile } from "../../features/profiles/profileSlice";


const buttonmediumOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];


const AgentProfilePage = () => {
  const id = useParams("id")

  const { profile, isLoading, isError, message } = useSelector(
		(state) => state.profile
	);

  const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.log(message)
		}

		dispatch(getProfile(id));
	}, [dispatch, isError, message, id]);

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-center mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope md:px-5 relative w-full">
            <div className="flex flex-1 flex-col items-center justify-start mx-auto w-full">
              <Img
                className="h-[250px] sm:h-auto object-cover w-full"
                src="data:image/jpeg;base64,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"
                alt="coverimage"
              />
            </div>
            <div className="flex flex-1 flex-col gap-[58px] items-center justify-start mt-[-46px] mx-auto w-full z-[1]">
              <div className="flex md:flex-col flex-row gap-[30px] items-end justify-start md:px-10 sm:px-5 px-[140px] w-full">
                <Img
                  className="h-[150px] md:h-auto object-cover rounded-[10px] w-[150px]"
                  src={profile ? (profile.profile_photo) : (null)}
                  alt="rectangle5599"
                />
                <div className="flex flex-1 md:flex-col flex-row md:gap-10 gap-[60px] items-center justify-start w-full">
                  <div className="flex flex-1 md:flex-col flex-row gap-8 items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                        size="txtManropeBold24Gray900"
                      >
                        {profile ? (
                          `${profile.full_name}`
                        ) : (
                          null
                        )}
                        
                      </Text>
                      <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                        <div className="flex flex-row items-center justify-evenly w-1/4">
                          <Img
                            className="h-4 w-4"
                            src="images/img_star.svg"
                            alt="star"
                          />
                          <Img
                            className="h-4 w-4"
                            src="images/img_star.svg"
                            alt="star_One"
                          />
                          <Img
                            className="h-4 w-4"
                            src="images/img_star.svg"
                            alt="star_Two"
                          />
                          <Img
                            className="h-4 w-4"
                            src="images/img_star.svg"
                            alt="star_Three"
                          />
                          <Img
                            className="h-4 w-4"
                            src="images/img_star_gray_600.svg"
                            alt="star_Four"
                          />
                        </div>
                        <Text
                          className="flex-1 text-base text-gray-900 w-auto"
                          size="txtManropeSemiBold16"
                        > 
                          {profile ? (
                            `${profile.num_reviews} review(s)`
                          ) : (
                            null
                          )}
                          
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 items-start justify-start w-full">
                      <div className="flex flex-row gap-3 items-center justify-start w-full">
                        <Img
                          className="h-6 w-6"
                          src="images/img_call_gray_900.svg"
                          alt="call"
                        />
                        <Text
                          className="flex-1 text-gray-900 text-lg w-auto"
                          size="txtManropeSemiBold18"
                        >
                          {profile ? (
                            `${profile.phone_number}`
                          ) : (
                            null
                          )}
                          
                        </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center justify-start w-full">
                        <Img
                          className="h-6 w-6"
                          src="images/img_mail_gray_900.svg"
                          alt="mail"
                        />
                        <Text
                          className="text-gray-900 text-lg w-auto"
                          size="txtManropeSemiBold18"
                        >
                          {profile ? (
                            `${profile.email}`
                          ) : (
                            null
                          )}
                          
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gray-900 cursor-pointer font-semibold min-w-[112px] py-[13px] rounded-[10px] text-base text-center text-white-A700">
                    Contact
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                <div className="flex flex-col gap-12 items-center justify-center w-full">
                  <div className="gap-3 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-start justify-start w-full">
                    <Button className="bg-gray-900 cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-white-A700 w-full">
                      For rent
                    </Button>
                    <Button className="border border-gray-600 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                      For sale
                    </Button>
                    <Button className="border border-gray-600 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                      About
                    </Button>
                    <Button className="border border-gray-600 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                      Review
                    </Button>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                      <PropertiesList/>
                    </div>
                  </div>
                  <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                    <div className="flex flex-row gap-[5px] items-start justify-start w-auto">
                      <Button className="border border-gray-700 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                        1
                      </Button>
                      <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                        2
                      </Button>
                      <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                        3
                      </Button>
                      <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                        4
                      </Button>
                      <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                        5
                      </Button>
                    </div>
                    <Button
                      className="border border-bluegray-102 border-solid cursor-pointer flex items-center justify-center min-w-[134px] px-[17px] py-[13px] rounded-[10px]"
                      rightIcon={
                        <Img
                          className="h-4 mt-px mb-[5px] ml-1"
                          src="images/img_arrowright_gray_900.svg"
                          alt="arrow_right"
                        />
                      }
                    >
                      <div className="font-semibold text-base text-gray-900 text-left">
                        Next Page
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-center justify-center max-w-[1200px] mx-auto p-[42px] md:px-5 rounded-[10px] w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex md:flex-col flex-row md:gap-10 gap-[65px] items-start justify-center w-full">
                <div className="flex flex-1 flex-col gap-[57px] items-start justify-start w-full">
                  <div className="flex flex-col gap-6 items-start justify-start w-full">
                    <div className="flex sm:flex-col flex-row gap-[30px] items-center justify-start w-full">
                      <Img
                        className="h-[182px] md:h-auto object-cover rounded-[10px] w-[182px]"
                        src="images/img_rectangle5599.png"
                        alt="rectangle5616"
                      />
                      <div className="flex flex-1 flex-col gap-[7px] items-start justify-start w-full">
                        <Text
                          className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                          size="txtManropeBold24Gray900"
                        >
                          {profile ? (
                            `${profile.full_name}`
                          ) : (
                            null
                          )}
                        </Text>
                        <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                          <div className="flex flex-row items-center justify-evenly w-[31%]">
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Five"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Six"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Seven"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Eight"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star_gray_600.svg"
                              alt="star_Nine"
                            />
                          </div>
                          <Text
                            className="flex-1 text-base text-gray-900 w-auto"
                            size="txtManropeSemiBold16"
                          >
                            {profile ? (
                              `${profile.num_reviews}`
                            ) : (
                              null
                            )} review(s)
                          </Text>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start w-full">
                          <Img
                            className="h-6 w-6"
                            src="images/img_call_gray_900.svg"
                            alt="call_One"
                          />
                          <Text
                            className="flex-1 text-gray-900 text-lg w-auto"
                            size="txtManropeSemiBold18"
                          >
                            {profile ? (
                              `${profile.phone_number}`
                            ) : (
                              null
                            )}
                          </Text>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start w-full">
                          <Img
                            className="h-6 w-6"
                            src="images/img_mail_gray_900.svg"
                            alt="mail_One"
                          />
                          <Text
                            className="text-gray-900 text-lg w-auto"
                            size="txtManropeSemiBold18"
                          >
                            {profile ? (
                              `${profile.email}`
                            ) : (
                              null
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Text
                      className="leading-[180.00%] text-gray-600 text-lg"
                      size="txtManropeRegular18Gray600"
                    >
                      <>
                        {profile ? (
                          `${profile.about_me}`
                        ) : (
                          null
                        )}
                      </>
                    </Text>
                  </div>
                  <Button className="bg-gray-900 cursor-pointer font-semibold min-w-[525px] sm:min-w-full py-[13px] rounded-[10px] text-base text-center text-white-A700">
                    Contact
                  </Button>
                </div>
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Experiences
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      15+ years experience
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Property Types
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      Private House, Villa, Townhouse, Apartment
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Area
                    </Text>
                    <Text
                      className="text-gray-900 text-lg w-full"
                      size="txtManropeSemiBold18"
                    >
                      {profile ? (
                        `${profile.country} ${profile.city}`
                      ) : (
                        null
                      )}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Address
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      59 Orchard, NY 5005, US
                    </Text>
                  </div>
                  <div className="flex sm:flex-col flex-row sm:gap-10 gap-[60px] items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                      <Text
                        className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                        size="txtManropeSemiBold20Gray900"
                      >
                        License
                      </Text>
                      <Text
                        className="text-gray-600 text-lg w-full"
                        size="txtManropeSemiBold18Gray600"
                      >
                        {profile ? (
                          `${profile.license}`
                        ) : (
                          null
                        )}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[13px] items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Social
                    </Text>
                    <div className="flex flex-row gap-4 items-start justify-start w-full">
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_clock_gray_600.svg"
                        alt="clock"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_linkedin_gray_600.svg"
                        alt="linkedin"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_twitter_gray_600.svg"
                        alt="twitter"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_play.svg"
                        alt="play"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_signal.svg"
                        alt="signal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start max-w-[1200px] mx-auto md:px-5 py-[30px] rounded-[10px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-10 items-start justify-start w-full">
                <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-5 items-center justify-between md:px-10 sm:px-5 px-[42px] w-full">
                    <Text
                      className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                      size="txtManropeExtraBold28"
                    >
                      Clients Review
                    </Text>
                    <Button
                      className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[190px] px-4 py-[17px] rounded-[10px]"
                      rightIcon={
                        <Img
                          className="h-5 mt-px mb-[3px] ml-2.5"
                          src="images/img_plus_white_a700.svg"
                          alt="plus"
                        />
                      }
                    >
                      <div className="font-bold text-left text-lg text-white-A700">
                        Write a Reveiw
                      </div>
                    </Button>
                  </div>
                  <Line className="bg-bluegray-100 h-px w-full" />
                </div>
                <div className="flex flex-col gap-[25px] items-start justify-center sm:px-5 px-[25px] w-full">
                  <List
                    className="flex flex-col gap-[25px] items-center w-full"
                    orientation="vertical"
                  >
                    {profile.reviews ? (
                      profile.reviews.map((review) => (
                        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col items-start justify-start sm:px-5 px-[30px] py-[39px] rounded-[20px] w-full"
                        key={review.id}>
                          <div className="flex flex-col gap-10 items-start justify-start w-full">
                            <Text
                              className="leading-[165.00%] max-w-[1090px] md:max-w-full text-2xl md:text-[22px] text-gray-600 sm:text-xl"
                              size="txtManropeSemiBold24Gray600"
                            >
                              {review.comment}
                            </Text>
                            <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                              <div className="flex sm:flex-col flex-row gap-[50px] items-start justify-start md:pr-10 sm:pr-5 pr-[552px] w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="flex flex-row gap-2 items-center justify-between w-1/2">
                                    <Img
                                      className="h-6 w-6"
                                      src="images/img_star_gray_900.svg"
                                      alt="star"
                                    />
                                    <Img
                                      className="h-6 w-6"
                                      src="images/img_star_gray_900.svg"
                                      alt="star_One"
                                    />
                                    <Img
                                      className="h-6 w-6"
                                      src="images/img_star_gray_900.svg"
                                      alt="star_Two"
                                    />
                                    <Img
                                      className="h-6 w-6"
                                      src="images/img_star_gray_900_24x24.svg"
                                      alt="star_Three"
                                    />
                                  </div>
                                  <Text
                                    className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                                    size="txtManropeSemiBold20Gray600"
                                  >
                                    {review.rating} review
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                                  size="txtManropeSemiBold20Gray600"
                                >
                                  {moment(review.created_at).format("YYYY/MM/DD kk:mm")}
                                </Text>
                              </div>
                              <div className="flex md:flex-col flex-row gap-4 items-center justify-start w-full">
                                <Img
                                  className="h-20 md:h-auto rounded-[50%] w-20"
                                  src="images/img_ellipse2695.png"
                                  alt="ellipse2695"
                                />
                                <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                                  <Text
                                    className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                                    size="txtManropeExtraBold28"
                                  >
                                    {review.rater}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (null)}
                  </List>
                  <SelectBox
                    className="border border-gray-600 border-solid font-semibold px-[18px] py-3 rounded-[10px] text-base text-gray-900 text-left w-[12%] sm:w-full"
                    placeholderClassName="text-gray-900"
                    indicator={
                      <Img
                        className="h-4 w-4"
                        src="images/img_arrowdown_gray_900.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="buttonmedium"
                    options={buttonmediumOptionsList}
                    isSearchable={false}
                    placeholder="See more"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default AgentProfilePage;
