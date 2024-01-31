import React from 'react'
import { BsCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './navBar.css'
import { SidebarData } from "./SidebarData";
const selector = () => {
        console.log( document?.querySelector(".side-nav-item").forEach(element => {
            console.log(element);
        }));
    // }
}
const SideBar = () => {
    return (
        <div>
            <nav className="sc-dMVFSy bPouWk">
                <div className="sc-lkkFJn jsltpP">
                    <ul className="navigation-main">
                        {SidebarData.map((item, index) => {
                            return <li key={item.title} className='side-nav-item'><Link className="sc-gFvbXA erhRXx" to={item.path} onClick={selector}>
                                <div>
                                    <BsCircle className='Icon' />
                                    <span className="sc-jwKbUx dYqQfd">{item.title}</span>
                                </div>
                            </Link>
                            </li>
                        })}
                    </ul>
                </div>
            </nav >
        </div >
    )
}

export default SideBar


