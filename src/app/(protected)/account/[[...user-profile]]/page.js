import {
  UserProfile,
  SignOutButton,
  SignedOut,
  RedirectToSignIn,
  SignedIn,
  SignIn,
} from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import CustomSignOutButton from "../../../../../components/CustomSignOutButton";

async function getUser() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  return userId;
}

export default async function UserProfilePage() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUser();
  //     setUser(user);
  //   };
  //   fetchUser();
  // }, []);

  const user = await getUser();

  return (
    <>
      <SignedIn>
        {/* <UserProfile /> */}
        <CustomSignOutButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
        <p>Sign in to view your profile page</p>
      </SignedOut>

      {user && (
        <div>
          <h1>User Profile</h1>
          <p>User ID: {user}</p>
        </div>
      )}
    </>
  );
}
