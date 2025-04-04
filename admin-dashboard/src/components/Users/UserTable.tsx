import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/types";
import { formatDate } from "@/utils";
import Image from "next/image";
import UserDelete from "./UserDelete";


interface ProductTableProps {
  users: IUser[];
  isLoading: boolean;
  searchTerm: string;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}


const UserTable: React.FC<ProductTableProps> = ({
  users,
  isLoading,
  searchTerm,
  setUsers
}) => {
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border border-zinc-800 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400">Joining Date</TableHead>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-zinc-400">Email</TableHead>
            <TableHead className="text-zinc-400">Role</TableHead>
            <TableHead className="text-zinc-400">Provider</TableHead>
            <TableHead className="text-zinc-400">isBlocked</TableHead>
            <TableHead className="text-zinc-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white py-8">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user._id} className="border-zinc-800">
                <TableCell className="text-white">
                  {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center space-x-3">
                    <Image
                      width={40}
                      height={40}
                      src={user.image ? user.image : "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"}
                      alt={user.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {user.email}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === "Consumer"
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : "bg-red-500/20 text-red-400 ring-red-500/20"
                    } ring-1 ring-inset`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.provider === "local"
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : "bg-red-500/20 text-red-400 ring-red-500/20"
                    } ring-1 ring-inset`}
                  >
                    {user.provider}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.isBlocked === false
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : "bg-red-500/20 text-red-400 ring-red-500/20"
                    } ring-1 ring-inset`}
                  >
                    {user.isBlocked === false ? "No" : "Yes"}
                  </span>
                </TableCell>
                <TableCell>
                  <UserDelete user={user} setUsers={setUsers}></UserDelete>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;

