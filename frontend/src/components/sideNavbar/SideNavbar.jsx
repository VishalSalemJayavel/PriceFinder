import React from 'react'
import './sideNavbar.css';
import { sidebardata } from './sidebardata';
import { images } from '../../constants';

const SideNavbar = () => {
  return (
    <div className='app__sidebar'>
      <ul className='app__sidebar-list'>
        <div className='app__sidebar-logo' >
          <img src= {images.logo} alt='logo'/>
        </div>
        {sidebardata.map((val, key) => {
          return (
            <li 
            key={key} 
            onClick={() => {window.location.pathname = val.link}}
            className='app__sidebar-row'>
              <div className='app__sidebar-row_icon'>
                {val.icon}
              </div>
              <div className='app__sidebar-row_title'>
                {val.title}
                </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

}
export default SideNavbar;
