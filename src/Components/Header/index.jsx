import { NavLink } from "react-router-dom";

export default function Header() {


    return <>
    <div className="m-2">
        <button>Menu</button>
        <ul>
            <li><NavLink to={"/"}>Home</NavLink></li>
        </ul>
    </div>
    </>
}