import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    console.log("🔍 Middleware rodando para:", req.nextUrl.pathname);
    console.log("📌 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

    const authResult = await auth();
    console.log("👤 Auth result:", authResult);

    if (!isPublicRoute(req) && !authResult.userId) {
      console.warn("🚨 Usuário não autenticado! Redirecionando...");
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    console.log("✅ Acesso permitido");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ ERRO NO MIDDLEWARE:", error);
    return new NextResponse("Erro no middleware Clerk", { status: 500 });
  }
});

export const config = {
  matcher: ["/((?!_next|_static|favicon.ico).*)", "/(api|trpc)(.*)"],
};
