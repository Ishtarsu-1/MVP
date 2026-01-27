import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="menu">
        <ul>
          <li><Link to="/">Map</Link></li>
          <li><Link to="/Chat">Chat</Link></li>
          <li><Link to="/feed">Feed</Link></li>
          <li><Link to="/User">Mon compte</Link></li>
        </ul>
      </nav>
  );
};

export default Navbar;