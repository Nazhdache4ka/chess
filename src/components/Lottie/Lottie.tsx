import Lottie from 'lottie-react';
import { memo, useCallback } from 'react';
import animationData from './animation.json';
import styles from './Lottie.module.css';

interface LottieComponentProps {
    isShow: boolean;
    onComplete: () => void;
}

export const LottieComponent = memo(function LottieComponent({onComplete, isShow}: LottieComponentProps) {
    // too much renders, mb useRef??? -> (prevProps, nextProps) => {....} solved issue
    
    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);

    return isShow ? <Lottie animationData={animationData} onComplete={handleComplete} loop={false} className={styles.lottie}/> : null;
}, (prevProps, nextProps) => {
    return prevProps.isShow === nextProps.isShow;
});