import React from "react"
import { Button, Collapse } from "antd";


const {Panel} = Collapse


function Banner(){
    return (
        <div id="faq" className=" block faq-block">
            <div className="fluid-container">
                <div className="title-section">
                    <h2>Frequently asked questions</h2>
                    <p>What are the most frequently asked 
                        questions regarding properties
                    </p>
                </div>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="How do I find the right property">
                        <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                        </p>
                    </Panel>
                    <Panel header="How do I know that I cant trust your agents?">
                        <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                        </p>
                    </Panel>
                    <Panel header="Who are your major clients?">
                        <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                        </p>
                    </Panel>
                    <Panel header="How do I get in touch?">
                        <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                        </p>
                    </Panel>
                    <Panel header="Do I need to create an account?">
                        <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                        </p>
                    </Panel>
                </Collapse>
                <div className="quick-support">
                    <h3>Want expedited support?</h3>
                    <p>Bla bla bla Bla bla bla Bla bla bla
                        Bla bla bla Bla bla bla Bla bla bla 
                    </p>
                    <Button type="primary" size="large">
                        <i className="fas fa-envelope"></i>
                        Email your questions!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Banner;