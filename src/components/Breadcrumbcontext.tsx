// src/context/BreadcrumbContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

interface BreadcrumbContextType {
  breadcrumbPath: string;
  setBreadcrumbPath: (path: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbPath: "",
  setBreadcrumbPath: () => {},
});

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbPath, setBreadcrumbPath] = useState("");

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbPath, setBreadcrumbPath }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}