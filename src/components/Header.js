import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <button className="header-button" onClick={() => navigate('/')}>
                Webdev Dictionary
            </button>
            <button className="header-button" onClick={() => navigate('/about')}>
                About
            </button>
            <button className="header-button" onClick={() => navigate('/contact')}>
                Contact
            </button>
        </header>
      );
};

export default Header;
