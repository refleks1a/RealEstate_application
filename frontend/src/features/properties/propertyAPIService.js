import axios from "axios";


//get properties
const getProperties = async () => {
	const response = await axios.get("/api/v1/properties/all/");
	return response.data;
};


//get property details
const getPropertyDetails = async (data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response = await axios.get("/api/v1/properties/details/" + data.title , config);
	return response.data;
};


const propertyAPIService = { getProperties, getPropertyDetails };

export default propertyAPIService;
