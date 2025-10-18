import { useMutations } from "@/lib/useMutations";
import type React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Spinner } from "./spinner";

const DeleteItem: React.FC<{
  itemKey: { PK: string; SK: string };
  trigger: React.ReactNode;
}> = ({ itemKey, trigger }) => {
  const { deleteData, deleting } = useMutations();

  const handleDelete = async () => {
    const res = await deleteData([itemKey]);
    return res;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={deleting}>
            {deleting && <Spinner className="mr-2" />}
            {deleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItem;
