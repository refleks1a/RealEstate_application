import React from "react"
import { Button, Card, List } from "antd";
import { ChromeOutlined, HolderOutlined, TeamOutlined } from "@ant-design/icons";


const data = [
    {
        title: "Buy a property",
        content: [
            {
                icon: <HolderOutlined/>,
                description: "Buy the house of your dreams!",
            },
        ],
    },
    {
        title: "Sell a property",
        content: [
            {
                icon: <ChromeOutlined/>,
                description: "Everything you need to sell a property is our website!",
            },
        ],
    },
    {
        title: "Rent a property",
        content: [
            {
                icon: <TeamOutlined/>,
                description: "Rent the house of your dreams!",
            },
        ],
    },
]


function Options(){
    return (
        <div id="options" className="block options-block grey-bg">
            <div className="fluid-container">
                <div className="title-section">
                    <h2>Choose an option that fits your needs</h2>
                    <p>
                        Bla bla bla bla Bla bla bla bla
                        Bla bla bla bla Bla bla bla bla Bla bla bla bla
                    </p>
                </div>
                <List grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={(item)=> (
                    <List.Item>
                        <Card title={item.title}>
                            <p className="large">
                                {item.content[0].icon}
                            </p>
                            <p>
                                {item.content[0].description}
                            </p>
                            <Button type="primary" size="large">
                                <i className="fas fa-telegram-plane"></i>
                                {" "}
                                Get started!
                            </Button>
                        </Card>
                    </List.Item>
                )}
                />
            </div>
        </div>
    )
}


export default Options;