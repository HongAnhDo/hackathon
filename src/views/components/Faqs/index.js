import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import './style.css'
import { ContentPage } from './components/ContentPage';
import ItemQuestion from './components/ItemQuestion';
import { HeaderSubPage } from '../HeaderSubPage';
import dataQuestions from '../../../dataTest/QuestionDatas.json';
import listMenu from '../../../dataTest/category.json'
const { SubMenu } = Menu;

class Faqs extends Component {
    state = {
        search: "",
        questions: dataQuestions,
        selectedKeys: []
    }

    handleLoadQuestion = () => {
        return dataQuestions;
    }

    handleClick = e => {
        var key = [e.keyPath[0]];
        var questions = this.handleLoadQuestion()
        this.setState({ selectedKeys: key, questions });
    };

    handleSearch = () => {
        var { search, questions } = this.state;
        this.setState({ questions: [questions[0]], selectedKeys: [] })

    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }


    renderLeftComponent = () => {

        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 256, boxShadow: 'box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.06)' }}
                selectedKeys={this.state.selectedKeys}
                mode="inline"
                className="content-right">
                {listMenu && listMenu.map((item, index) => (
                    <Menu.Item
                        key={"sub" + index}
                    >
                     <span>{item.name}</span>
                    </Menu.Item>
                ))}
            </Menu>)
    }

    renderRightComponentHeader = () => (
        <div class="search">
            <span class="fa fa-search" onClick={this.handleSearch}></span>
            <input placeholder="Tìm kiếm chủ đề" value={this.state.ipSearch} onChange={this.onChange} />
        </div>
    )
    renderRightComponent = () => {
        const { questions } = this.state;
        return (
            <div className="list-question">
                {questions && questions.map((item, index) =>
                    <ItemQuestion key={index} question={item} />)}

            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="container-page-sub">
                    <div className="Faqs">

                        <HeaderSubPage
                            idTitle="footer.menu.faq"
                            rightComponent={this.renderRightComponentHeader}
                            type={2}
                        />
                        <Container className="container-pag" style ={{paddingTop:"30px"}}>
                            <ContentPage
                                leftComponent={this.renderLeftComponent}
                                rightComponent={this.renderRightComponent}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}


export default Faqs

