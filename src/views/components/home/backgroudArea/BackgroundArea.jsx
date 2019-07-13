import React from 'react';
import { translate } from 'react-i18next';
import Base from '../../../core/Base';
import {HeaderSubPage} from '../../HeaderSubPage'
import SearchField from "react-search-field";

class BackgroundArea extends Base {
    onChange = () =>{
        alert("aa")
    }
    renderRightComponentHeader = () =>(
        <SearchField
        placeholder="Search..."
        onChange={this.onChange}
        searchText="This is initial search text"
        classNames="test-class"
      />
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