"use client";
import clsx from "clsx";
import useConversations from "../hooks/useConversations";
import EmptyState from "../components/EmptyState";

import React from "react";

const Home = () => {
  const { isOpen } = useConversations();
  return (
    <div
      className={clsx("lg:pl-80 lg:block h-full", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
