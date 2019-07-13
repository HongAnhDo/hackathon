import React from "react";
import { translate } from 'react-i18next';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'rc-tabs/assets/index.css';
import '../css/Tabs.css'
import Base from "../../../core/Base";
import Register from "./Register";
import Login from "./Login";

class MyTabs extends Base {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: props.isLogged,
            activeKey: "2",
            isOpenMomal: props.isOpenMomal
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.isOpenMomal !== nextProps.isOpenMomal) this.setState({isOpenMomal: nextProps.isOpenMomal})
    }

    onChange = (activeKey) => {
        this.setState({ activeKey })
    }

    toggle = (e) => {
        this.props.handleCloseMomal(null);
    }

    render() {
        const { t } = this.props;
        const {isOpenMomal} = this.state;
        console.log("my tab");

        return (
            <Modal isOpen={isOpenMomal} toggle={this.toggle} className="modal_signin">
                <ModalHeader toggle={this.toggle} style={{ display: 'none' }}>
                </ModalHeader>

                <ModalBody>
                    <Tabs
                        defaultActiveKey="2"
                        renderTabBar={() => <SwipeableInkTabBar pageSize={2} />}
                        renderTabContent={() => <TabContent />}
                        activeKey={this.state.activeKey}
                        onChange={this.onChange}
                    >
                        <TabPane tab={t("menu.register")} key="1" > <Register handleCloseMomal={this.props.handleCloseMomal} /> </TabPane>
                        <TabPane tab={t("menu.login")} key="2"> <Login handleCloseMomal={this.props.handleCloseMomal} /> </TabPane>
                    </Tabs>
                </ModalBody>
                <ModalFooter style={{ display: 'none' }}>
                </ModalFooter>
            </Modal>
        );
    }
}

export default translate('common')(MyTabs);