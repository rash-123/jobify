import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
    const [showlogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    return (
        <Wrapper>
            <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showlogout)}>
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showlogout ? "dropdown show-dropdown" : "dropdown"}>
                <button type="button" className="dropdown-btn" onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    )
}

export default LogoutContainer;