"use client";

import { ServerWithMembersWithProfiles } from "@/types/type";
import { MemberRole } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LucideLogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center w-full h-12 px-3 font-semibold transition border-b-2 outline-none text-md border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="relative w-5 h-5 ml-auto mr-8 md:ml-auto md:mr-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-0.5 text-xs font-medium text-black dark:text-neutral-400 ">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="flex px-3 py-2 text-sm text-indigo-600 rounded outline-none cursor-pointer dark:text-indigo-400 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
          >
            Invite People
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="flex px-3 py-2 text-sm rounded outline-none cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
          >
            Server Settings
            <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="flex px-3 py-2 text-sm rounded outline-none cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
          >
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", { server })}
            className="flex px-3 py-2 text-sm rounded outline-none cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
          >
            Create Channel
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="flex px-3 py-2 text-sm rounded outline-none cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 text-rose-500"
          >
            Delete server
            <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="flex px-3 py-2 text-sm rounded outline-none cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 text-rose-500"
          >
            Leave server
            <LucideLogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
