import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { PRIVATE_URL, PUBLIC_URL } from "./config/url.config";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
    const isAuthPage = request.url.includes(PUBLIC_URL.auth());

    if (isAuthPage) {
        if (accessToken) {
            return NextResponse.redirect(
                new URL(PRIVATE_URL.home(""), request.url)
            );
        } else return NextResponse.next();
    }

    // if (!accessToken) {
    //     return NextResponse.redirect(
    //         new URL(PUBLIC_URL.auth("signIn"), request.url)
    //     );
    // }
}

export const config = {
    matcher: ["/auth/:path*", "/desk/:path*"],
};
