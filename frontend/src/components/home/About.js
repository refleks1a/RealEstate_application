import React from "react"
import { Col, Row } from "antd";


const items = [
    {
        key: "1",
        icon: <i className="fas fa-search-location"></i>,
        title: "Simplified Search",
        content: "Smth bla bla bla !",
    },
    {
        key: "2",
        icon: <i className="fas fa-search-database"></i>,
        title: "Lots of properties",
        content: "Smth bla bla bla !",
    },
    {
        key: "3",
        icon: <i className="fas fa-globe-africa"></i>,
        title: "Proudly Azerbaijan",
        content: "Smth bla bla bla !",
    }
]

function About(){
    return (
        <div id="about" className="block about-section">
            <div className="fluid-container">
                <div className="title-section">
                    <h2>About Us</h2>
                    <p>You will find us very interesting!</p>
                </div>
                <div className="content-section">
                    <p>
                        Bla bla bla bla Bla bla bla bla
                        Bla bla bla bla Bla bla bla bla Bla bla bla bla
                        Bla bla bla bla Bla bla bla bla 
                        Bla bla bla bla Bla bla bla bla
                    </p>
                </div>
                <Row gutter={[16, 16]}>
                    {items.map((item) => {
                        return (
                            <Col md={{span: 8}} key={item.key}>
                                <div className="content">
                                    <div className="icon">
                                        {item.icon}
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}

export default About;