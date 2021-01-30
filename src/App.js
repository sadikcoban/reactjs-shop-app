import './App.css';
import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import HomePage from "./pages/homepage/homepage.component"
import "./pages/homepage/homepage.styles.scss"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import AuthPage from './pages/auth/auth.component';
import { auth, createUserProfile } from "./firebase/firebase.utils"
import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/user.actions"


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userauth => {
      if (userauth) {
        const ref = await createUserProfile(userauth);
        await ref.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userauth)
      }
    });
  }

  componentWillUnmount() {

    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/auth"
            render={() => this.props.currentUser ?
              (<Redirect to="/" />)
              : (<AuthPage />)
            } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})
export default connect(mapStateToProps, mapDispatchToProps)(App);