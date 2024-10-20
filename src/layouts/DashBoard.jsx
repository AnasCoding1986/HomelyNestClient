import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dshboard/sidebar/Sidebar";


const DashBoard = () => {
    return (
        <div>
            {/* sidebar */}
            <div>
                <Sidebar></Sidebar>
            </div>

            {/* outlet */}
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;