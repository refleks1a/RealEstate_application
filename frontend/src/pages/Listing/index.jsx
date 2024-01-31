import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Img,
  Input,
  SelectBox,
  Text,
  PropertiesList,
} from "../../components";

import LandingPageFooter from "../../components/LandingPageFooter";
import LandingPageHeader from "../../components/LandingPageHeader";

import { getProperties } from "../../features/properties/propertySlice";


const dropdownlargeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const priceOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const dropdownlargeOneOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];


const ListingPage = () => {
  const {properties, isLoading, isError, message} = useSelector(
      (state) => state.properties
  )

  const dispatch = useDispatch();

  useEffect(() => {

  dispatch(getProperties());
  }, [dispatch, isError, message]);

  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_3.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_5.png" },
    { image: "images/img_image_2.png" },
    { image: "images/img_image_1.png" },
    { image: "images/img_image_3.png" },
  ];

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-center w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope items-center justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                size="txtManropeExtraBold36"
              >
                Find Property
              </Text>
              <div className="flex flex-col gap-3 items-start justify-start w-full">
                <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col h-[60px] md:h-auto items-start justify-start px-4 py-3.5 rounded-[10px] w-full">
                    <Input
                      name="frame1000001565"
                      placeholder="Enter your address"
                      className="font-semibold p-0 placeholder:text-gray-700 text-gray-700 text-left text-lg w-full"
                      wrapClassName="flex pt-1 w-auto sm:w-full"
                      suffix={
                        <Img
                          className="mt-auto mb-[3px] h-6 ml-3"
                          src="images/img_search_gray_700.svg"
                          alt="search"
                        />
                      }
                    ></Input>
                  </div>
                  <div className="flex sm:flex-1 flex-col items-start justify-start w-auto sm:w-full">
                    <SelectBox
                      className="bg-white-A700 border border-bluegray-100 border-solid font-bold pb-3.5 pt-[18px] px-4 rounded-[10px] text-gray-700 text-left text-lg w-full"
                      placeholderClassName="text-gray-700"
                      indicator={
                        <Img
                          className="h-6 w-6"
                          src="images/img_arrowdown_gray_700.svg"
                          alt="arrow_down"
                        />
                      }
                      isMulti={false}
                      name="dropdownlarge"
                      options={dropdownlargeOptionsList}
                      isSearchable={false}
                      placeholder="Buy"
                    />
                  </div>
                  <SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid md:flex-1 font-bold px-4 py-[17px] rounded-[10px] text-gray-700 text-left text-lg w-[18%] md:w-full"
                    placeholderClassName="text-gray-700"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_700.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="price"
                    options={priceOptionsList}
                    isSearchable={false}
                    placeholder="$15000 - $18000"
                  />
                  <SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid md:flex-1 font-bold px-4 py-[17px] rounded-[10px] text-gray-700 text-left text-lg w-[11%] md:w-full"
                    placeholderClassName="text-gray-700"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_700.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="dropdownlarge_One"
                    options={dropdownlargeOneOptionsList}
                    isSearchable={false}
                    placeholder="Bed - 3"
                  />
                  <Button
                    className="bg-white-A700 border border-bluegray-100 border-solid cursor-pointer flex items-center justify-center min-w-[113px] px-[15px] py-[17px] rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-6 mb-px ml-3"
                        src="images/img_plus_gray_700.svg"
                        alt="plus"
                      />
                    }
                  >
                    <div className="font-bold text-gray-700 text-left text-lg">
                      More
                    </div>
                  </Button>
                  <Button
                    className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[124px] px-4 py-[17px] rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-5 mt-px mb-[3px] ml-2.5"
                        src="images/img_search_white_a700.svg"
                        alt="search"
                      />
                    }
                  >
                    <div className="font-bold text-left text-lg text-white-A700">
                      Search
                    </div>
                  </Button>
                </div>
                <div className="flex flex-row flex-wrap gap-2.5 items-start justify-start max-w-[1200px] w-full">
                  <Button
                    className="border border-bluegray-101 border-solid cursor-pointer flex items-center justify-center px-[13px] py-2 rounded-[10px] w-[145px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-0.5 mb-px ml-2"
                        src="images/img_close.svg"
                        alt="close"
                      />
                    }
                  >
                    <div className="font-semibold text-gray-700 text-left text-sm">
                      Bathrooms 2+
                    </div>
                  </Button>
                  <Button
                    className="border border-bluegray-101 border-solid cursor-pointer flex items-center justify-center min-w-[243px] px-[13px] py-2 rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-px mb-[3px] ml-2"
                        src="images/img_close.svg"
                        alt="close"
                      />
                    }
                  >
                    <div className="font-semibold text-gray-700 text-left text-sm">
                      Square Feet 750 - 2000 sq. ft
                    </div>
                  </Button>
                  <Button
                    className="border border-bluegray-101 border-solid cursor-pointer flex items-center justify-center min-w-[151px] px-[13px] py-2 rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-0.5 mb-px ml-2"
                        src="images/img_close.svg"
                        alt="close"
                      />
                    }
                  >
                    <div className="font-semibold text-gray-700 text-left text-sm">
                      Year Built 5 - 15
                    </div>
                  </Button>
                  <Button
                    className="border border-bluegray-101 border-solid cursor-pointer flex items-center justify-center min-w-[168px] px-[13px] py-2 rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-px mb-[3px] ml-2"
                        src="images/img_close.svg"
                        alt="close"
                      />
                    }
                  >
                    <div className="font-semibold text-gray-900 text-left text-sm">
                      For Sale By Agent
                    </div>
                  </Button>
                  <Button
                    className="border border-bluegray-101 border-solid cursor-pointer flex items-center justify-center min-w-[174px] px-[13px] py-2 rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-0.5 mb-px ml-2"
                        src="images/img_close.svg"
                        alt="close"
                      />
                    }
                  >
                    <div className="font-semibold text-gray-900 text-left text-sm">
                      New Construction
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[1200px] mx-auto w-full">
              <div className="flex flex-1 flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="md:gap-5 gap-6 grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                    <PropertiesList/>
                  </div>
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

export default ListingPage;
