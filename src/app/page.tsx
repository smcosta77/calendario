import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth(); // Espera a Promise resolver
  if (session.userId) redirect("/events");

  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Fancy Home Page</h1>
      <div className="flex gap-2 justify-center">
        <Button asChild className="bg-blue-500">
          <SignInButton />
        </Button>
        <Button asChild className="bg-blue-500">
          <SignUpButton />
        </Button>
        <UserButton />
      </div>
    </div>
  )
}