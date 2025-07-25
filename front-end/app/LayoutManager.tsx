"use client";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import LoaderRHM from "@/components/common/LoaderRHM";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Sidebar from "@/components/Sidebar";

import { Providers } from "./provider";

import "react-toastify/dist/ReactToastify.css";

export default function LayoutManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const pathNamer = usePathname();

  const noLayout = ["/login"];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Providers>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <ToastContainer />
        {loading ? (
          <LoaderRHM opacity={100} position="fixed" />
        ) : (
          <>
            {noLayout.includes(pathNamer) ? (
              <>{children}</>
            ) : (
              <PrivateRoute>
                <div className="flex overflow-hidden">
                  {/* <!-- ===== Sidebar Start ===== --> */}
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Sidebar End ===== --> */}

                  {/* <!-- ===== Content Area Start ===== --> */}
                  <div className="flex flex-1 flex-col overflow-hidden mb-7">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main className="pt-16">
                      <div className="p-3 md:p-3 2xl:p-4 overflow-hidden">
                        {children}
                      </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                  </div>
                  {/* <!-- ===== Content Area End ===== --> */}
                </div>
              </PrivateRoute>
            )}
          </>
        )}
      </div>
    </Providers>
  );
}
