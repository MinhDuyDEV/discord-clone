import React from "react";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className="fixed inset-y-0 z-30 flex-col hidden h-full md:flex w-[72px]">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default layout;
