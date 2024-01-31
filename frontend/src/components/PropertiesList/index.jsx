import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LandingPageCard from "../LandingPageCard";

import { getProperties } from "../../features/properties/propertySlice";


const PropertiesList = () => {
    const {properties, isLoading, isError, message} = useSelector(
        (state) => state.properties
    )

    const dispatch = useDispatch();

	useEffect(() => {

		dispatch(getProperties());
	}, [dispatch, isError, message]);

    return (
        <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
            {properties.map((property) => (
                <React.Fragment key={`LandingPageCard${property.id}`}>
                <LandingPageCard
                    className="flex flex-1 flex-col h-full items-start justify-start w-full"
                    property={property}
                />
                </React.Fragment>
            ))}
        </div>
    )
}


export { PropertiesList };
