import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="dark-theme py-8 sticky  top-0 bg-black px-12 border-b-2  border-gray-800 text-primary-foreground ">
            <nav className="flex items-center justify-between">
                <div className="text-white text-2xl ml-12 font-medium">
                    VibeWave
                </div>
                <ul className="flex space-x-12  text-l  font-medium">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-blue-200 border-b-2 border-blue-200 font-bold  "
                                        : "text-white"
                                }
                                 hover:text-gray-400 font-medium py-2`
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/play"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-blue-200 border-b-2 border-blue-200 font-bold  "
                                        : "text-white"
                                }
                                 hover:text-gray-400 font-medium py-2`
                            }
                        >
                            Listen
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/upload"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-blue-200 border-b-2 border-blue-200 font-bold  "
                                        : "text-white"
                                }
                                 hover:text-gray-400 font-medium py-2`
                            }
                        >
                            Upload
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-blue-200 border-b-2 border-blue-200 font-bold  "
                                        : "text-white"
                                }
                                 hover:text-gray-400 font-medium py-2`
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-blue-200 border-b-2 border-blue-200 font-bold  "
                                        : "text-white"
                                }
                                 hover:text-gray-400 font-medium py-2`
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
