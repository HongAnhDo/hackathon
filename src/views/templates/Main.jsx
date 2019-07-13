import React from 'react';
import { Route, Switch } from "react-router-dom";
import { translate } from 'react-i18next';

import Base from '../core/Base';
import Home from '../components/home/Home';
import InsurancePolicy from '../components/company/policy/InsurancePolicy';
import Incident from '../components/company/policy/Incident';
import PartnerPolicy from '../components/company/policy/PartnerPolicy';
import ServicePolicy from '../components/company/policy/ServicePolicy';
import Company from '../components/company/introducation/InfoCompany';
import InfoPartner from '../components/company/introducation/InfoPartner';
import InfoRecruitment from '../components/company/introducation/InfoRecruitment';
import News from '../components/company/introducation/News';
import RentalGuide from '../components/company/support/Guide';
import PersonInfo from '../components/user/personInfo/PersonInfo';
import Promotion from '../components/company/promotion/Promotion';
import PartnerPage from '../components/home/PartnerPage';
import MyUtil from './MyUtil';

const routes = [
    {
        path: "/",
        path_en: "/:language",
        component: Home
    },
    {
        path: "/:typeName(oto|xemay)",
        path_en: "/:language/:typeName(oto|xemay)",
        component: Home
    },
    {
        path: "/thong-tin-tai-khoan/:content/:bookId",
        path_en: "/:language/thong-tin-tai-khoan/:content/:bookId",
        component: PersonInfo
    },
    {
        path: "/thong-tin-tai-khoan/:content",
        path_en: "/:language/thong-tin-tai-khoan/:content",
        component: PersonInfo
    },
    {
        path: "/chinh-sach/khuyen-mai",
        path_en: "/:language/chinh-sach/khuyen-mai",
        component: Promotion
    },
    {
        path: "/introduction/about",
        path_en: "/:language/introduction/about",
        component: Company
    },
    {
        path: "/introduction/partner",
        path_en: "/:language/introduction/partner",
        component: InfoPartner
    },
    {
        path: "/introduction/recruitment",
        path_en: "/:language/introduction/recruitment",
        component: InfoRecruitment
    },
    {
        path: "/introduction/news",
        path_en: "/:language/introduction/news",
        component: News
    },
    {
        path: "/policy/insurance",
        path_en: "/:language/policy/insurance",
        component: InsurancePolicy
    },
    {
        path: "/policy/partner",
        path_en: "/:language/policy/partner",
        component: PartnerPolicy
    },
    {
        path: "/policy/service",
        path_en: "/:language/policy/service",
        component: ServicePolicy
    },
    {
        path: "/policy/incident",
        path_en: "/:language/policy/incident",
        component: Incident
    },
    {
        path: "/support/car_rental/:index",
        path_en: "/:language/support/car_rental/:index",
        component: RentalGuide
    },
    {
        path: "/support/car_rental",
        path_en: "/:language/support/car_rental",
        component: RentalGuide
    },
    {
        path: "/chinh-sach/tro-thanh-doi-tac",
        path_en: "/:language/chinh-sach/tro-thanh-doi-tac",
        component: PartnerPage
    }];

class Main extends Base {
    async componentDidMount() {
        await MyUtil.webPsupport();
    }

    render() {
        return (
            <main>
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} exact path={route.path} component={route.component} />
                    ))}
                    {routes.map((route, i) => (
                        <Route key={i} exact path={route.path_en} component={route.component} />
                    ))}

                    <Route component={NoMatch} />

                </Switch>
            </main>
        );
    }
}

const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);
export default translate('common')(Main);