import Lottie from 'lottie-react';
import { memo, useCallback } from 'react';
import animationData from './animation.json';
import styles from './Lottie.module.css';

interface LottieComponentProps {
    isShow: boolean;
    onComplete: () => void;
}

export const LottieComponent = memo(function LottieComponent({onComplete, isShow}: LottieComponentProps) {
    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);
    return isShow ? <Lottie animationData={animationData} onComplete={handleComplete} loop={false} className={styles.lottie}/> : null;
});