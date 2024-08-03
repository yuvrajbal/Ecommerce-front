import {
  UserProfile,
  SignOutButton,
  SignedOut,
  RedirectToSignIn,
  SignedIn,
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
  const user = await getUser();
  console.log(user);

  return (
    <>
      <SignedIn>
        <UserProfile path="/account" />
        {/* <SignOutButton /> */}
        <CustomSignOutButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
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
