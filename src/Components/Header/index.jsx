import { NavLink } from "react-router-dom";

export default function Header() {


    return <>
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 ">
        
        <ul>
            <li className="p-2"><NavLink to={"/"}><p className="">Home</p></NavLink></li>
        </ul>
    </div>
    </>
}