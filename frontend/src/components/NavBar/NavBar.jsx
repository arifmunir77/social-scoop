import { Link } from "react-router-dom";

function NavBar(props) {
  const handleLogOut = () => {};
  return (
    <nav>
      <h1>Welcome, {props.user.name}</h1>
      <Link to="/orders">Order History</Link>
      &nbsp; | <Link to="/orders/new">New Order</Link>
      <br />
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}

export default NavBar;
