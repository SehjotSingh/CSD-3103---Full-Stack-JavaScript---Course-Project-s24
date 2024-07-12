const Popup = ({ message, type }) => {
    return (
        <div className={`popup ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default Popup;
