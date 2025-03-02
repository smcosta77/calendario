import { ReactNode } from "react";


export default function PrivateLayut({ children }: { children: ReactNode }) {

  return (
    <>
      <header className="flex py-2 border-b bg-card">
        <nav className="font-medium flex items-center text-sm gap-6 container mx-auto">
          <div></div>
        </nav>
      </header>
      <main className="container my-6 mx-auto">
        {children}
      </main>
    </>
  );
}