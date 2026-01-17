"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const handleLogin = async () => {
        try {
            console.log("🔵 Starting login...");
            console.log("🔵 Auth client baseURL:", "http://localhost:8000");

            const res = await authClient.signIn.social({
                provider: "google",
                callbackURL: "http://localhost:3000",
            });

            console.log("✅ Login response:", res);
        } catch (error) {
            console.error("❌ Login error:", error);
        }
    };

    const session = authClient.getSession();
    console.log(session);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                                <Button
                                    onClick={() => handleLogin()}
                                    variant="outline"
                                    type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center flex justify-center gap-2">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
