"use client";
import { Conversation, User } from "@prisma/client";
import { Fragment, useCallback, useMemo } from "react";
import useChatterName from "../hooks/useChatterName";
import { format } from "date-fns/format";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  Dialog as CustomDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useConversation from "../hooks/useConversations";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

function ProfileDrawer({ isOpen, onClose, data }: ProfileDrawerProps) {
  const otherUser = useChatterName(data);
  const userJoinDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const Status = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  const router = useRouter();
  const { conversationId } = useConversation();
  const handleDelete = useCallback(() => {
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("something went wrong !"));
  }, [conversationId, router]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40"></div>
        </Transition>
        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition
                show={isOpen}
                as={Fragment}
                enterFrom="translate-x-full"
                enter="transform transition ease-in-out duration-500"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <Avatar user={otherUser} />
                        </div>
                        <div>{title}</div>
                        <div className="text-sm text-gray-500">{Status}</div>
                        <div className="flex gap-10 my-8">
                          <CustomDialog>
                            <DialogTrigger asChild>
                              <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                  <IoTrash size={20} />
                                </div>
                                <div className="text-sm font-light text-neutral-600">
                                  Delete this conversation
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this Conversation and
                                  remove it&apos;s data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Close
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </CustomDialog>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {data.isGroup && (
                              <div>
                                <dt
                                  className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                >
                                  Emails
                                </dt>
                                <dd
                                  className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                >
                                  {data.users
                                    .map((user) => user.email)
                                    .join(", ")}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <div>
                                <dt
                                  className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                >
                                  Email
                                </dt>
                                <dd
                                  className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                >
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt
                                    className="
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                  >
                                    Joined
                                  </dt>
                                  <dd
                                    className="
                                    mt-1 
                                    text-sm 
                                    text-gray-900 
                                    sm:col-span-2
                                  "
                                  >
                                    <time dateTime={userJoinDate}>
                                      {userJoinDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProfileDrawer;
