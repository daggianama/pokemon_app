import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/pokemon/jigglypuff");
    }, [navigate]);

    return (
        <div>
            
        </div>
    );
}