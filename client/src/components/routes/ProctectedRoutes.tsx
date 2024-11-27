import { useUserContext } from '@/context/AuthContext';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const {user} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    } 
  }, [navigate, user]);


  return <>{user && children}</>;
};

export default ProtectedRoutes;
