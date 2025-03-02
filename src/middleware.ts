import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define as rotas públicas (não exigem autenticação)
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const authResult = await auth();

    // Se a rota NÃO for pública e o usuário não estiver autenticado, redireciona para o login
    if (!isPublicRoute(req) && !authResult.userId) {
      console.warn("Usuário não autenticado tentou acessar:", req.nextUrl.pathname);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro no middleware Clerk:", error);
    return new NextResponse("Erro interno no middleware Clerk", { status: 500 });
  }
});

// Configuração do matcher para evitar erros no Vercel
export const config = {
  matcher: ["/((?!_next|_static|favicon.ico).*)", "/(api|trpc)(.*)"],
};
