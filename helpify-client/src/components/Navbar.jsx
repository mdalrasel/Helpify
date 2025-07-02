import { use, useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const { user, logOut } = use(AuthContext);



    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setIsDark(savedTheme === "dark");
    }, []);

    const handleThemeToggle = (checked) => {
        const newTheme = checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setIsDark(checked);
    };

    const handleSignOut = () => {
        logOut().then().catch();
    };

    const navLink = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allPost'>Services</NavLink></li>
        {user &&
            <li tabIndex={0}  className="dropdown dropdown-start">
                <details >
                    <summary tabIndex={0}>Dashboard</summary>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                        <li><NavLink to="add-service">Add Service</NavLink></li>
                        <li><NavLink to="manage-services">Manage Service</NavLink></li>
                        <li><NavLink to="booked-services">Booked Services</NavLink></li>
                        <li><NavLink to="/service-to-do">Service To-Do</NavLink></li>
                    </ul>
                </details>
            </li>
        }
    </>

    return (
        <div className="navbar ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" lg:hidden">
                        <IoMenu size={30} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLink}
                    </ul>
                </div>
                <Link to='/' className='text-2xl font-extrabold'><img className='w-30' src="https://i.ibb.co/0RbKNMqG/logo.png" alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <label className="flex cursor-pointer gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input
                        type="checkbox"
                        className="toggle theme-controller"
                        onChange={(e) => handleThemeToggle(e.target.checked)}
                        checked={isDark}
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL} alt="User" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-40 text-center">
                            <li className='py-2 mb-2 border rounded-md'>{user.displayName}</li>
                            <li className='text-center'><button onClick={handleSignOut} className="custom-btn text-center">Sign Out</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to='/signIn' className="btn">Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;