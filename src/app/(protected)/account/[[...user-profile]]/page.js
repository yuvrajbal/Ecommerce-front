import {
  UserProfile,
  SignOutButton,
  SignedOut,
  RedirectToSignIn,
  SignedIn,
  SignIn,
  SignUp,
  SignUpButton,
} from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import CustomSignOutButton from "../../../../../components/CustomSignOutButton";
import Link from "next/link";

async function getUser() {
  // const { userId } = auth();
  const user = await currentUser();
  // console.log(user);
  if (!user) {
    return null;
  }

  return user;
}

export default async function UserProfilePage() {
  const user = await getUser();
  console.log("user using currentuser", user);
  const userId = user?.id;
  console.log(userId);
  return (
    <>
      <SignedIn>
        <UserProfile />
        <CustomSignOutButton />
      </SignedIn>
      <SignedOut>
        <h1>Already a user ? Sign in </h1>
        <Link href={"/signin"}>Sign in</Link>
        <h1>New customer?</h1>
        <Link href={"/signup"}>Sign up</Link>
        {/* <SignUp /> */}
      </SignedOut>

      {userId && (
        <div>
          <h1>User Profile</h1>
          <p>User ID: {user.emailAddresses[0].emailAddress}</p>
        </div>
      )}
    </>
  );
}
