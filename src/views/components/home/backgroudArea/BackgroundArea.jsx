import React from 'react';
import { translate } from 'react-i18next';
import Base from '../../../core/Base';
import {HeaderSubPage} from '../../HeaderSubPage'
import './Background.css'
class BackgroundArea extends Base {
    state ={
        ipSearch: ""
    }
    onChange = (e) =>{
        this.setState({ipSearch: e.target.value})

    }
    handleSearch =() =>{
        alert("aa")

    }
    renderRightComponentHeader = () =>(
        <div class="search">
        <span class="fa fa-search" onClick ={this.handleSearch}></span>
        <input placeholder="Tìm kiếm chủ đề" value ={this.state.ipSearch}  onChange = {this.onChange}/>
      </div>
    )
    
    render() {
        return (
            <section className="background-area">
                <HeaderSubPage
                    idTitle="Chắp cánh "
                    rightComponent={this.renderRightComponentHeader}
                    type={2}
                />
             
            </section>

        );
    }
}

export default translate('common')(BackgroundArea);