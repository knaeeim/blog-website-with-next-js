import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { userServices } from "@/services/user.service";

export default async function Home() {
    const { data } = await userServices.getSession();

    console.log(data);

    return (
        <div className="">
            <Button>Naeeim</Button>
        </div>
    );
}
