import { Navigate } from "react-router-dom";

type ProtectProps = {
  isAuth: boolean;
  element: React.JSX.Element;
};

const Protect = ({ isAuth, element }: ProtectProps) => {
  return isAuth ? element : <Navigate to="/" />;
};

export default Protect;
