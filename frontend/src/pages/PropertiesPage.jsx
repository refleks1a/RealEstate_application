import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Property from "../components/Property";
import MySpinner from "../components/UI/Spinners/MySpinner";
import MyTitle from "../components/UI/Titles/MyTitle";
import { getALLProperties } from "../Real_estate_API_v1/PropertyAPISlice";


const PropertiesPage = () => {
	const { properties, isLoading, isError, message } = useSelector(
		(state) => state.properties
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getALLProperties());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <MySpinner />;
	}
	return (
		<>
			<MyTitle title="Our Properties Catalog" />
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>Our Catalog of properties</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				{
					<>
						<Row className="mt-3">
							{properties.map((property) => (
								<Col
									key={property.id}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<Property property={property} />
								</Col>
							))}
						</Row>
					</>
				}
			</Container>
		</>
	);
};

export default PropertiesPage;