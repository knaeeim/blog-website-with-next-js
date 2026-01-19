import { cookies } from "next/headers";

export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();

            const session = await fetch("http://localhost:8000/api/auth/get-session", {
                headers: {
                    Cookie: cookieStore.toString(),
                },
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