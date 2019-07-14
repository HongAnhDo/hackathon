import React, { Component } from 'react';
import { Container } from 'reactstrap';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import './style.scss'
import { ContentPage } from './components/ContentPage';
import ItemQuestion from './components/ItemQuestion';
import { HeaderSubPage } from '../HeaderSubPage';
import dataQuestions from '../../../dataTest/QuestionDatas.json';
import listMenu from '../../../dataTest/ListMenu.json'
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
        const { lang } = this.props;

        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                selectedKeys={this.state.selectedKeys}
                mode="inline"
                className="content-right">
                {listMenu && listMenu.map((item, index) => (
                    <SubMenu
                        key={"sub" + index}
                        title={<span>{lang == "en" ? item.category_en : item.category}</span>}
                    >
                        {item.sub_category && item.sub_category.map((sub) =>
                            <Menu.Item key={sub.id}>{lang == "en" ? sub.category_en : sub.category}</Menu.Item>
                        )}
                    </SubMenu>
                ))}
            </Menu>)
    }

    renderRightComponentHeader = () => (
        <TextInput
            placeholder={this.props.lang == "en" ? "Enter question here" : "Nhập câu hỏi ở đây"}
            className='input-search'
            onChange={this.handleChange}
            value={this.state.search}
            name="search"
            icon={<Icon type="search" onClick={this.handleSearch} />}
        />
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
            <div className="Faqs">
                <HeaderSubPage
                    idTitle="footer.menu.faq"
                    rightComponent={this.renderRightComponentHeader}
                    type={2}
                />
                <Container className="container-pag">
                    <ContentPage
                        leftComponent={this.renderLeftComponent}
                        rightComponent={this.renderRightComponent}
                    />
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    lang: state.lang,
})

export default connect(mapStateToProps)(Faqs)

