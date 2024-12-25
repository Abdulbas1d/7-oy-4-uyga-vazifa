import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className="conatiner">
            <div className='logo-container'>
                <h2>LOGO</h2>

                <div className="data">
                    <NavLink className='information' to='/'>Homework One</NavLink>
                    <NavLink className='information' to='/homeworkTwo'>Homework Two</NavLink>
                    <NavLink className='information' to='/homeworkThree'>Homework Three</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header
