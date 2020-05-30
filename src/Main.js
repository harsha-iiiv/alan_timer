import React, { Component ,Fragment} from 'react'
import App from './components/App';
import { Provider } from 'react-redux';
import Header from './components/Header'
import Timer from './components/Timer/Timer'
import { createStore } from 'redux';
import reducer from './reducers';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './index.css';
class Main extends Component{

   constructor(props){
       super(props)
   }
   
    render(){
        return (
        <Provider store={createStore(reducer)}>
    
        <Router>
            <div>
        
     <Header/>

        <Switch>
         <Route exact path="/">
           <App />
         </Route>
         <Route exact path="/timer">
           <Timer />
         </Route>
         {/* <Route path="/">
           <Home />
         </Route> */}
       </Switch>
       </div>
       </Router>
      
   </Provider>
        )
    }
}

export default Main