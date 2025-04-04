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
import { IUser } from "@/types/types";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
  
  export default function UserDelete({
    user,
    setUsers
  }: {
    user: IUser;
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  }) {
    const handleDelete = async() => {
        const res = await axios.delete(`http://localhost:5000/api/user/${user._id}`);
          console.log(res.data.data);
          setUsers(prevUser => 
            prevUser.filter((p) => p._id !== user._id)
          );
          toast.success("User deleted successfully");
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-red-600"><Trash2 /></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  