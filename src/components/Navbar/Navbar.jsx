import React,{useState,useEffect} from 'react';
import {Link,NavLink} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import styles from './Navbar.module.css';
import {Sidebar} from  './SideBar';
import {logout} from '../../redux/actions/user'

const Navbar = () => {
    const {isAuth}=useSelector((state)=>state.userReducer);
    const {cartItems}=useSelector((state)=>state.cartReducer);
    const [sidebar, setSidebar] = useState(false);
    const dispatch=useDispatch()

    let  activeClassName=styles.activeClass
    let activeStyle={ color: "#fc283f" }
    // const cartItems=1;

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth >= 830) {
            setSidebar(false);
          }
        }
        window.addEventListener("resize", handleResize);
      }, []);

    const handleLogout=()=>{
        dispatch(logout())
    }
    //sidebar
    const sidebartoggle = () => {
        setSidebar(!sidebar);
    };
    return (
        <div className={`${styles.navbar} shadow-lg`}>
        <div className={`${styles.header}`}>
        <div className={`${styles.header_container}`}>
            <div
            className={`${styles.hamburger_container}`}
            onClick={sidebartoggle}
            >
            {sidebar ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            ) : (
                <>
                <div className={`${styles.stick} ${styles.stick1}`}></div>
                <div className={`${styles.stick} ${styles.stick2}`}></div>
                <div className={`${styles.stick} ${styles.stick3}`}></div>{" "}
                </>
            )}
            </div>
            <div className={`${styles.header_content} ${styles.middle_header}`}>
            <div className={`${styles.main_logo}`}>
                <Link to="/">
                <span style={{fontWeight: 900,letterSpacing: "0.5px",fontSize: "1em",padding: "1rem"}}>
                    <span style={{ color: "#fc283f" }}>H</span>
                    <span>UNGRY</span>
                </span>
                </Link>
            </div>
            <ul className={`${styles.menu_items} text-gray-700`}>
                {Sidebar.map((item, index) => {
                return (
                    <NavLink to={item.path} key={index} exact
                    className={({isActive})=>
                        isActive?activeClassName:undefined
                    }
                    style={({isActive})=>
                        isActive?activeStyle:undefined
                    }
                    >
                    <li key={index} className={`${styles.menu_item}`}>
                        {item.title}
                    </li>
                    </NavLink>
                );
                })}
            </ul>
            </div>
            <div className={`${styles.header_content}`}>
            <Link to="/cart">
                <div className="relative py-5 px-3 flex items-center">
                {/* {isAuth && ( */}
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    {Object.keys(cartItems).length > 0 && (
                        <span
                        className={` root_button text-white mt-2 `}
                        style={{ borderRadius: "7px",
                            border: "1px solid #fff",
                            fontSize: "12px",
                            width: "20px",
                            height: "18px",
                            textAlign: "center",
                            position: "absolute",
                            top: "1px",
                            left: "19px",
                            padding: "0px 3px 0px 2px",
                        }}
                        >
                        {Object.keys(cartItems).length}
                        </span>
                    )}
                    </>
                {/* )} */}
                </div>
            </Link>

            {isAuth ? (
                <div className={`${styles.login_section}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                <div className={`${styles.relative_container}`}>
                    <div
                    className={`${styles.profile_dropdown} text-gray-600  bg-white`}
                    >
                    <div className={`${styles.user_name} text-gray-700`}>
                        {/* {user.name} */}
                    </div>
                    <div className={`${styles.logoutbtn}`}>
                        <div
                        className={`${styles.logout_button} root_button`}
                          onClick={handleLogout}
                        >
                        Logout
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ) : (
                <Link to="/login">
                <div>
                    <button
                    className={`${styles.login_button} ${styles.login_button_v2} ${styles.button_color} root_button`}
                    >
                    LOGIN
                    </button>
                </div>
                </Link>
            )}
            </div>
        </div>
        <div
            className={`${styles.responsive_drawer} shadow-lg ${
            !sidebar ? styles.active : styles.active_drawer
            } `}
        >
            <div className={`${styles.responsive_drawer_content} text-gray-600`}>
            <div>
                {Sidebar.map((item, index) => {
                return (
                    <NavLink to={item.path} exact activeStyle={{ color: "#fc283f" }}
                    >
                    <div
                        key={index}
                        className={`${styles.tab_title}`}
                        onClick={sidebartoggle}
                    >
                        {item.title}
                    </div>
                    </NavLink>
                );
                })}
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar