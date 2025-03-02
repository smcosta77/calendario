import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Rota pública para ignorar a proteção
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth(); // Espera a resolução da Promise

  // Verifica se a rota não é pública
  if (!isPublicRoute(req)) {
    // Se não for pública e o usuário não estiver autenticado, redireciona para o login
    if (!authResult.userId) {
      return authResult.redirectToSignIn(); // Redireciona para a página de login
    }
  }
});

export const config = {
  matcher: [
    // Ignora as rotas internas do Next.js e arquivos estáticos, a menos que encontrados nos parâmetros de pesquisa
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre roda para rotas da API
    '/(api|trpc)(.*)',
  ],
};
