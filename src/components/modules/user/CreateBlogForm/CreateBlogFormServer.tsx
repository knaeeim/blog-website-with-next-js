import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Divide } from "lucide-react";

export default function CreateBlogFormServer() {
    const createBlog = async (formData: FormData) => {
        "use server";
        console.log(formData.get("title"));
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create Blog</CardTitle>
                <CardDescription className="text-center">
                    Fill Up the Necessary Details and Submit the Form
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="blog-form" action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Blog Title"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Content</FieldLabel>
                            <Textarea
                                name="content"
                                id="content"
                                placeholder="Blog Content"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Tags (Comma Separated)</FieldLabel>
                            <Input
                                type="text"
                                name="tags"
                                id="tags"
                                placeholder="nextjs, web, typescript"
                                required
                            />
                        </Field>
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
