import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="min-h-screen container mx-auto px-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
