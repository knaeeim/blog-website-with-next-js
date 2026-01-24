"use client";
import { createBlogPost } from "@/actions/blog.action";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const PostFormSchema = z.object({
    title: z.string().min(1, "Title is Required").max(100, "Title is too long"),
    content: z
        .string()
        .min(10, "Content should be at least 100 Characters")
        .max(5000, "Content is too long"),
    tags: z.string(),
});

export default function CreateBlogFormClient() {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        onSubmit: async ({ value }) => {
            const tags = value.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");

            const blogData = {
                ...value,
                tags,
            };

            const res = await createBlogPost(blogData);

            if(res.error){
                toast.error(`Error: ${res.error.message}`);
                return;
            }
            toast.success("Blog Post Created Successfully!");
        },
        validators: {
            onChange: PostFormSchema,
        },
    });

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create Blog</CardTitle>
                <CardDescription className="text-center">
                    Fill Up the Necessary Details and Submit the Form
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Blog Title"
                                            required
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Content</FieldLabel>
                                        <Textarea
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Blog Content"
                                            required
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Tags (Comma Separated)</FieldLabel>
                                        <Input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Blog Tags"
                                            required
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
            <CardFooter>
                <Button form="blog-form" type="submit" className="w-full">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
