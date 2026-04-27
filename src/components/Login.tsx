import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect } from "react";

const Login = () => {
  const { getToken, isSignedIn } = useAuth();

  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        const token = await getToken();
        console.log("Token:", token);
      }
    };
    syncUser();
  }, [getToken, isSignedIn, user]);

  return (
    <>
      <SignedOut>
        <p>Sign in to view your galleries</p>
        <SignInButton
          mode="modal"
        />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <p>You are signed in!</p>
        <p>Welcome {user?.firstName}!</p>
      </SignedIn>
    </>
  );
};

export default Login;
