import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function Topbar() {
  const { user } = useAuthenticator();
  console.log("Authenticated user:", user);

  return (
    <header className="flex h-16 w-full flex-none items-center border-b border-muted bg-white/80 px-8 backdrop-blur justify-between">
      <div />

      <div className="ml-6 flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-muted bg-white px-3 py-1.5 shadow-sm">
          <Avatar className="size-8">
            <AvatarImage src="https://i.pravata" alt="Alex Moore" />
            <AvatarFallback className="text-white bg-primary !text-xs">
              {user.signInDetails?.loginId
                ? user.signInDetails.loginId.slice(0, 2).toUpperCase()
                : "A"}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-xs font-semibold text-foreground">
              {user.signInDetails?.loginId || "Admin User"}
            </p>
            <p className="text-[0.65rem] text-muted-foreground">Admin</p>
          </div>
        </div>
        <SignOut />
      </div>
    </header>
  );
}

const SignOut = () => {
  const { signOut } = useAuthenticator();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <IoLogInOutline className="size-10" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out confirmation.</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSignOut}>
            {loading && <Spinner className="size-4 mr-2" />}
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
