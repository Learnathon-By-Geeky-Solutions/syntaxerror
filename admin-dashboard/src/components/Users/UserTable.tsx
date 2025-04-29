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
    || user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border border-zinc-800 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400 hidden md:table-cell">Joining Date</TableHead>
            <TableHead className="text-zinc-400 min-w-[200px]">User</TableHead>
            <TableHead className="text-zinc-400 hidden sm:table-cell">Email</TableHead>
            <TableHead className="text-zinc-400">Role</TableHead>
            <TableHead className="text-zinc-400 hidden lg:table-cell">Provider</TableHead>
            <TableHead className="text-zinc-400 hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-zinc-400 w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-white py-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-white py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user._id} className="border-zinc-800">
                <TableCell className="text-white hidden md:table-cell text-sm">
                  {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center space-x-3">
                    <Image
                      width={40}
                      height={40}
                      src={user.image || "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"}
                      alt={user.name}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-md object-cover"
                    />
                    <div className="space-y-1">
                      <div className="font-medium text-sm sm:text-base">{user.name}</div>
                      {/* Show email on mobile */}
                      <div className="text-xs text-zinc-400 sm:hidden">
                        {user.email}
                      </div>
                      {/* Show joining date on mobile */}
                      <div className="text-xs text-zinc-400 md:hidden">
                        {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white hidden sm:table-cell text-sm">
                  {user.email}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === "Consumer"
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : "bg-blue-500/20 text-blue-400 ring-blue-500/20"
                    } ring-1 ring-inset`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.provider === "local"
                        ? "bg-purple-500/20 text-purple-400 ring-purple-500/20"
                        : "bg-orange-500/20 text-orange-400 ring-orange-500/20"
                    } ring-1 ring-inset`}
                  >
                    {user.provider}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      !user.isBlocked
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : "bg-red-500/20 text-red-400 ring-red-500/20"
                    } ring-1 ring-inset`}
                  >
                    {!user.isBlocked ? "Active" : "Blocked"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center sm:justify-start">
                    <UserDelete user={user} setUsers={setUsers} />
                  </div>
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

