import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import bulldogAnimation from "./bulldog flying on the rocket.json";
import styles from "./LottieBulldog.module.css";

export function LottieBulldog() {
    return (
        <Link to="/game">
            <Lottie 
            className={styles.lottieBulldog}
                animationData={bulldogAnimation} 
                loop={true} 
            />
        </Link>
    )    
}