import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

// import { useRouter } from "next/navigation";
export default function ProtectedLayout({ children }) {
  // const router = useRouter();
  return (
    // <ClerkProvider>
    <>
      {children}
      {/* <SignedIn>{children}</SignedIn> */}
      {/* <SignedOut>{router.push("/")}</SignedOut> */}
      {/* <SignedOut>
        <RedirectToSignIn />
      </SignedOut> */}
      {/* </ClerkProvider> */}
    </>
  );
}
