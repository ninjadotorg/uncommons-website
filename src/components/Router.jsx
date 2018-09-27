import React from 'react';
import { createDynamicImport } from '@/services/app';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

const Home = createDynamicImport(() => import('@/pages/Home'), Loading);
const Discover = createDynamicImport(() => import('@/pages/Discover'), Loading);
const Download = createDynamicImport(() => import('@/pages/Download'), Loading);
const FAQs = createDynamicImport(() => import('@/pages/FAQs'), Loading);
const About = createDynamicImport(() => import('@/pages/About'), Loading);
const Profile = createDynamicImport(() => import('@/pages/Profile'), Loading);
const Login = createDynamicImport(() => import('@/pages/Login'), Loading);
const Submit = createDynamicImport(() => import('@/pages/Submit'), Loading);

const routers = [
  { path: '/', exact: true, component: Home },
  { path: '/discover', component: Discover },
  { path: '/download', component: Download },
  { path: '/faqs', component: FAQs },
  { path: '/about', component: About },
  { path: '/profile/:address', component: Profile },
  { path: '/submit', component: Submit },
];

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth } = this.props;
    return (
      <Switch>
        {
          routers.map(route => (
            <Route key={route.path} {...route} />
          ))
        }
        {auth.isLogged ? <Redirect from="/login" to={`/profile/${auth.address}`} exact /> : <Route path="/login" component={Login} />}
      </Switch>
    );
  }
}

export default connect(state => ({ auth: state.auth, state }), null)(Router);
