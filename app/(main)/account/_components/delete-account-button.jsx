"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteAccount } from "@/actions/account";

export function DeleteAccountButton({ accountId, accountName }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    loading,
    fn: deleteFn,
    data,
    error,
  } = useFetch(deleteAccount);

  const handleDelete = async () => {
    await deleteFn(accountId);
  };

  useEffect(() => {
    if (data?.success) {
      toast.success(`Account "${accountName}" deleted successfully.`);
      setOpen(false);
      router.push("/dashboard");
    }
    if (error) {
      toast.error(error);
      setOpen(false);
    }
  }, [data, error, router, accountName]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account{" "}
            <span className="font-medium text-foreground">
              {accountName}
            </span>{" "}
            and all of its associated transactions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Yes, delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}