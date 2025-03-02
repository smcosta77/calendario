import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  // Aguarda a resposta da função assíncrona auth()
  const authResult = await auth();

  // Extrai os valores após a resolução da Promise
  const { userId } = authResult;
  const redirectToSignIn = authResult.redirectToSignIn;

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (!userId) {
    return redirectToSignIn();
  }

  // Obtém os eventos do usuário autenticado
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">Eventos</h1>
        <Button asChild className="bg-blue-600 text-white">
          <Link href={"/events/new"}>
            <CalendarPlus className="mr-4 size-6 " />
            Novo Evento
          </Link>
        </Button>
      </div>

      {events.length > 0 ? (<h1>events</h1>) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-6 mx-auto" />
          Você ainda não fez nenhum evento. Crie seu primeiro evento para começar.
          <Button size={"lg"} asChild className="bg-blue-600 text-white text-lg hover:bg-emerald-600">
            <Link href={"/events/new"}>
              <CalendarPlus className="mr-4 size-6 " />
              Novo Evento
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
