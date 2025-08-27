interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

function Button({children, onClick}: ButtonProps) {
    return (
        <div>
            <button 
            onClick={onClick}
            style = {{
                backgroundColor: 'red',
                color: 'white',
                border: '1px solid white',
                padding: '10px',
                borderRadius: '5px',
            }}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;