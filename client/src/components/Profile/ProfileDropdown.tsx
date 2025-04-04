import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, LogOut, Package, Settings, User } from "lucide-react";

interface ProfileDropdownProps {
  userImage?: string;
  userName?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onOrdersClick?: () => void;
  onPasswordClick?: () => void;
  onEditProfileClick?: () => void;
}

export function ProfileDropdown({
  userImage = "/default-avatar.png",
  userName = "User",
  onLogout,
  onProfileClick,
  onOrdersClick,
  onPasswordClick,
  onEditProfileClick,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-9 w-9 cursor-pointer transition-opacity hover:opacity-80">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel><h2>My Account</h2>
        <p className="font-light">{userName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onOrdersClick} className="cursor-pointer">
          <Package className="mr-2 h-4 w-4" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPasswordClick} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditProfileClick} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}