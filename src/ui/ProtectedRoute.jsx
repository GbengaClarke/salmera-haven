import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";
import useGetUser from "../features/authentication/useGetUser";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate("/login");
    }
  }, [isPending, isAuthenticated, navigate]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
