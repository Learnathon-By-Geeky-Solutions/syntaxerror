"use client";
import PaginationComponent from "@/components/Products/PaginationComponent";
import SearchBar from "@/components/Products/SearchBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddUserForm from "@/components/Users/AddUserForm";
import UserTable from "@/components/Users/UserTable";
import { IUser, PaginationInfo } from "@/types/types";
import { Package2, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function Page() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        let url = `http://localhost:5000/api/user?page=${page}&limit=10`;

        if (selectedRole && selectedRole !== "all") {
          url += `&role=${selectedRole}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setUsers(data.data);
          setPaginationInfo(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedRole]
  );

  // useEffect(() => {
  //   // Fetch categories
  //   fetch("http://localhost:5000/api/category")
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data.data));
  // }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, selectedRole, fetchUsers]);

  // Debounce search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="lg:min-w-[75vw] lg:p-8 p-4">
      <Card className="mx-auto bg-zinc-950 border-zinc-800 max-w-7xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-white" />
            <CardTitle className="text-white">User</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Manage users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger>
                <div className="flex justify-end items-center mb-4 gap-2 px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-sm">
                  <Plus size={20} strokeWidth={2.75} />
                  Add User
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                  <DialogDescription>
                    Add a new user
                  </DialogDescription>
                </DialogHeader>
                <AddUserForm
                  onSuccess={() => {
                    fetchUsers(currentPage);
                    const dialogClose = document.querySelector(
                      '[data-state="open"]'
                    );
                    if (dialogClose instanceof HTMLElement) {
                      dialogClose.click();
                    }
                  }}
                  onCancel={() => {
                    const dialogClose = document.querySelector(
                      '[data-state="open"]'
                    );
                    if (dialogClose instanceof HTMLElement) {
                      dialogClose.click();
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[200px] bg-zinc-900 border-zinc-800 text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all" className="text-white">
                  All Roles
                </SelectItem>
                <SelectItem value="Admin" className="text-white">
                  Admin
                </SelectItem>
                <SelectItem value="Consumer" className="text-white">
                  Consumer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <UserTable
            users={users}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setUsers={setUsers}
          />

          {paginationInfo.totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
