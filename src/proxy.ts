import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    let isAuthenticated = false;
    let isAdmin = false;
    const pathName = request.nextUrl.pathname;
    const { data } = await userServices.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin
    }

    // user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // user is authenticated as admin but trying to access user route
    if (isAdmin && pathName.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }

    // user is authenticated as user but trying to access admin route
    if (!isAdmin && pathName.startsWith('/admin-dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// matcher is for macting the specific routes which routes we want to apply this middleware
export const config = {
    matcher: ['/dashboard/:path*', '/dashboard', "/admin-dashboard/:path*", "/admin-dashboard"],
}