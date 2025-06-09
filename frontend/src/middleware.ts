import {NextRequest , NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    const profileMatch = pathname.match(/^\/profiles\/(\d+)\/?$/);
    if (profileMatch) {
        const id = profileMatch[1];
        return NextResponse.redirect(new URL(`/profiles/${id}/projects`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profiles/:id'],
};
