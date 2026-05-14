import { Typography } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/userAccounts";

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation();

  if (loadingUserInfo) return <Typography>Loading...</Typography>;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
