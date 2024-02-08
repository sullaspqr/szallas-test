import { useNavigate } from "react-router-dom";
import { logout } from "./AuthService";

export default function Kijelentkezes() {
    const navigate = useNavigate();
    return (
        <button
        className="btn btn-danger m-3 float-right"
        onClick={() => {
            logout().finally(() => {
                navigate("/");
            });
        }}
        >
            Kijelentkezés
        </button>
    );
}