import React from 'react';
import {Link} from 'react-router-dom'


class Header extends React.Component{


  render(){
    return ( 
<div>
<div className="container">

            <div className="row m-auto">
         <nav className="navbar justify-content-end navbar-expand-lg bg-dark">

            <ul className="navbar-nav">
          <li className="nav-item">
          <Link className='nav-link' to="/">Home</Link>
          </li>
          <li className="nav-item">
          <Link className='nav-link' to="/timer">Timer</Link>
          </li>
          <li className="nav-item">
          <Link className='nav-link' to="/users">Users</Link>
          </li>
          
        </ul>
            
               </nav>
            </div>
        </div>
    
 </div>
    );
  }
}





export default Header;