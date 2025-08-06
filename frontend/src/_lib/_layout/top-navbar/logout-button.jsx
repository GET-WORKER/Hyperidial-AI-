/* import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../../_pages/log-in/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    sessionStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <Button
      variant="light"
      size="sm"
      className="pull-right"
      onClick={handleLogout}
    >
      Logout <CiLogout />
    </Button>
  );
};

export default LogoutButton;
 */
