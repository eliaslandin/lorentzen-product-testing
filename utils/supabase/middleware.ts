import { Database } from "@/lib/database.types";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // Protected routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (user.error) {
        return NextResponse.redirect(new URL("/logga-in", request.url));
      }

      const { data: userRoles } = await supabase
        .schema("api")
        .from("role_user_relations")
        .select("role")
        .eq("user_id", user.data.user.id);

      if (
        !userRoles ||
        !userRoles.some(
          (role) => role.role === "admin" || role.role === "moderator",
        )
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (
      user.error &&
      (request.nextUrl.pathname.startsWith("/protected") ||
        request.nextUrl.pathname.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/logga-in", request.url));
    }

    if (
      user.error &&
      request.nextUrl.pathname.startsWith("/invanta-bekraftning")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect for logged in users
    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
