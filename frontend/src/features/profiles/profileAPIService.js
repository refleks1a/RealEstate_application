import axios from "axios";


//get agents
const getAgents = async (data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response = await axios.get("/api/v1/profile/agents/all", config);
	return response.data;
};


//get user's profile
const getProfile = async (data) => {
	const response = await axios.get("/api/v1/profile/" + data.id);
	return response.data;
}


const profileAPIService = { getAgents, getProfile };

export default profileAPIService;
