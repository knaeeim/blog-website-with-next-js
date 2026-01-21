import { env } from "@/env";
import { cookies } from "next/headers";


const AUTH_URL = env.AUTH_URL;

export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();

            const session = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache : 'no-store',
            });

            if(session === null){
                return { data : null, error : { message : 'No session found' } };
            }

            const res = await session.json();
            return { data: res, error: null };
        } catch (err: unknown) {
            if(err instanceof Error){
                console.log(err.message);
                return { data: null, error: { message: err.message } }
            }
            return { data: null, error: { message: 'An unknown error occurred' }}; 
        }
    }
}