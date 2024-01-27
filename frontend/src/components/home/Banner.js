import React from "react"
import { SearchOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";


const items = [
    {
        key: "1",
        title: "Buy/sell properties",
        content: "Bla bla bla bla Bla bla bla bla Bla bla bla bla",
    },
    {
        key: "2",
        title: "Buy/sell land",
        content:  "Bla bla bla bla Bla bla bla bla Bla bla bla bla",
    },
    {
        key: "3",
        title: "Buy/sell office space",
        content:  "Bla bla bla bla Bla bla bla bla Bla bla bla bla",
    },
]


function Banner(){

    return (
        <div className="banner-section" id="banner">
            <Carousel>
                {items.map((item) => {
                    return (
                        <div className="fluid-container" key={item.key}>
                            <div className="content">
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                                <div className="btn-group">
                                    <Button type="primary" size="large">Learn more...</Button>
                                    <Button type="primary" size="large" icon={<SearchOutlined/>}>Search</Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Banner