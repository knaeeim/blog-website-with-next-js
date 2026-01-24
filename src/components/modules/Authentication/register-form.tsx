"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "This field is Required!!"),
    password: z.string().min(8, "Minimum 8 characters required"),
    email: z.email(),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const handleLogin = async () => {
        const toastId = toast.loading("🔵 Starting login...");
        try {
            const res = await authClient.signIn.social({
                provider: "google",
                callbackURL: "http://localhost:3000",
            });

            toast.success("Login successful!", { id: toastId });
        } catch (error) {
            toast.error("Login error: " + (error instanceof Error ? error.message : "Unknown error"), { id: toastId });
        }
    };

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Registering your account...");
            try {
                // sending request to the better auth for registration with user data
                const { data, error } = await authClient.signUp.email(value);
                // If there is an error while registration
                if (error) {
                    // To pass to toastId is important to update the existing toast
                    toast.error("Registration error: " + error.message, { id: toastId });
                    return;
                }
                // If the user register successfully
                toast.success("Registration successful!", { id: toastId });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error("Registration error:" + error.message, { id: toastId });
                }
                toast.error("An unknown error occurred during registration.", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle className="font-bold text-2xl text-center">
                    Create an account
                </CardTitle>
                <CardDescription className="text-center">
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="register-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        {/* name */}
                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* email */}
                        <form.Field
                            name="email"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* password */}
                        <form.Field
                            name="password"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-5 justify-center items-center">
                <Button className="w-full" form="register-form" type="submit">
                    Submit
                </Button>
                <Button className="w-full" onClick={() => handleLogin()} variant="outline" type="button">
                    Continue with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
