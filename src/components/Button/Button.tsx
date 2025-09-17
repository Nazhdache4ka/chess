import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

function Button({children, onClick, disabled}: ButtonProps) {
    return (
        <div>
            <button 
                onClick={onClick}
                className={styles.button}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;