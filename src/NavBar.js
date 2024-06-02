import {useContext,useEffect,useState} from "react";
import Cookies from "js-cookie";
import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {AuthContext} from './AuthProvider';
import './App.css';


export default function NavBar() {
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const {updateNavbar, setUpdateNavbar} = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get('secret');
        if (token === undefined) {
            setSuccess(false);
        } else {
            setSuccess(true);
        }
        setUpdateNavbar(false)
    }, [updateNavbar])
    const logOut = () => {
        Cookies.remove("secret");
        setSuccess(false)
        navigate("../");
    }

    return (
        <nav className="nav">
            <div>
                {
                    success ?
                        <ul>
                            <CustomLink to="/Profile">Profile</CustomLink>
                            <CustomLink to="/TableLeague">TableLeague</CustomLink>
                            <CustomLink to="/dashboard">Live Game</CustomLink>
                            <CustomLink to="/MyBets">My bets</CustomLink>
                            <CustomLink to="/FutureGames">Future Games</CustomLink>
                        </ul>
                        :
                        <ul>
                            <CustomLink to="/">login</CustomLink>
                            <CustomLink to="/SignUp">SignUp</CustomLink>
                            <CustomLink to="/TableLeague">Table League</CustomLink>
                            <CustomLink to="/dashboard">Live Game</CustomLink>
                            <CustomLink to="/FutureGames">Future Games</CustomLink>
                        </ul>
                }
            </div>
            {
                <div className="site-title">
                    {
                        success &&
                        <div>
                            <button className="title-element" id={"title-button"} onClick={logOut}>
                                Log Out
                            </button>
                        </div>
                    }

                </div>
            }
        </nav>



    )
}


function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
