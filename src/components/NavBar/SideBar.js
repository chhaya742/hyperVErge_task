import React, { useRef } from 'react';
import { BsCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the CSS file

const SideBar = ({ user }) => {
    const sideNavRef = useRef(null);

    const SidebarData = [];
    const isAdmin = JSON.parse(user)?.userDetials.Role

    if (isAdmin == 2) {
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
    } else {
        SidebarData.push({
            title: "Home",
            path: "Home",
            icon: <BsCircle />,
        },

            {
                title: "Setting",
                path: "/setting",
                icon: <BsCircle />,

            }
            ,
            {
                title: "Setting",
                path: "/setting",
                icon: <BsCircle />,

            }
        )
    }
    const selector = () => {
        if (sideNavRef.current) {
            const sideNavItems = sideNavRef.current.querySelectorAll(".side-nav-item");
            sideNavItems.forEach(element => {
            });
        }
    }

    return (
        <div>
            <nav className="main">
                <div className="sidebar-con">
                    <ul ref={sideNavRef} className="navigation-main">
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
            </nav >
        </div >
    )
}

export default SideBar;
