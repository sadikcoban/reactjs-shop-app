import './App.css';
import React from "react"
import { Route, Switch } from "react-router-dom"

import HomePage from "./pages/homepage/homepage.component"
import "./pages/homepage/homepage.styles.scss"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import AuthPage from './pages/auth/auth.component';
import { auth, createUserProfile } from "./firebase/firebase.utils"



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userauth => {
      if (userauth) {
        const ref = await createUserProfile(userauth);
        await ref.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userauth })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;