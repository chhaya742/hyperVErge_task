import React, { useRef } from 'react';
import './Sidebar.css'; 
import { BsCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
const Sidebar = ({ user }) => {
    const SidebarData = [];
    const sideNavRef = useRef(null);

    SidebarData.push({
        title: "Admin",
        path: "/dashboard/admin",
        icon: <BsCircle />,
    },
        {
            title: "Users",
            path: "/dashboard/user",
            icon: <BsCircle />,

        },)

    const selector = () => {
        if (sideNavRef.current) {
            const sideNavItems = sideNavRef.current.querySelectorAll(".side-nav-item");
            sideNavItems.forEach(element => {
            });
        }
    }

    return (
        <div className="sidebar">
            <ul>
                {SidebarData.map((item, index) => (
                    <li key={item.title} className='side-nav-item'>
                        <Link className="nav-item-link" to={item.path} onClick={selector}>
                            <div>
                                <BsCircle className='Icon' />
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
