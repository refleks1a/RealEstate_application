import axios from "axios";


const getAllProperties = async () => {
	const response = await axios.get("http://127.0.0.1:8080/api/v1/properties/all");
	return response.data;
};


const getPropertyDetail = async (name) => {
    const response = await axios.get("http://127.0.0.1:8080/api/v1/properties/details/" + name);
    return response.data;
};


const deleteProperty = async (slug) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDI4NDMwLCJpYXQiOjE3MDM0MjEyMzAsImp0aSI6IjZiYzAyMjliMDA5MTQ1ZGY5Mzg1N2E4Njg2ZjIyZDRmIiwidXNlcl9pZCI6ImRkMzJlNmY3LTNmYzItNGQ0MC05ZmM5LWFmMjE3YTAzYjIzMCJ9.rcTixrWsRc1j7yzwNAF2GW0Eq5lmrk5yP3L_yAxvyu0';
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete("http://127.0.0.1:8080/api/v1/properties/delete/" + slug,
        config
    )
    return response.data
}


const updateProperty = async (slug, country, title, city) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDI4NDMwLCJpYXQiOjE3MDM0MjEyMzAsImp0aSI6IjZiYzAyMjliMDA5MTQ1ZGY5Mzg1N2E4Njg2ZjIyZDRmIiwidXNlcl9pZCI6ImRkMzJlNmY3LTNmYzItNGQ0MC05ZmM5LWFmMjE3YTAzYjIzMCJ9.rcTixrWsRc1j7yzwNAF2GW0Eq5lmrk5yP3L_yAxvyu0';
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "country": country,
            "title": title,
            "city": city,
        }
    };
    const response = await axios.put("http://127.0.0.1:8080/api/v1/properties/update/" + slug + "/",
        config
    )
    return response.data
}


const createProperty = async (country, title, city, description,
        postal_code, street_address, price, tax,
        plot_area, total_floors, bedrooms, advert_type,
        property_type, cover_photo, photo1, photo2, photo3, photo4) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDI4NDMwLCJpYXQiOjE3MDM0MjEyMzAsImp0aSI6IjZiYzAyMjliMDA5MTQ1ZGY5Mzg1N2E4Njg2ZjIyZDRmIiwidXNlcl9pZCI6ImRkMzJlNmY3LTNmYzItNGQ0MC05ZmM5LWFmMjE3YTAzYjIzMCJ9.rcTixrWsRc1j7yzwNAF2GW0Eq5lmrk5yP3L_yAxvyu0';
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/properties/create/",
        config
    )
}


const PropertyAPIService = { getAllProperties, getPropertyDetail, 
    deleteProperty, updateProperty, createProperty};

    
export default PropertyAPIService;