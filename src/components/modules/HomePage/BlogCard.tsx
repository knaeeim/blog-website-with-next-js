import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/types";
import { Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Card className="relative mx-auto w-full max-w-md pt-0 overflow-hidden">
            <div className="relative h-56 w-full overflow-hidden">
                {post.thumbnail ? (
                    <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.content}</CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                        </span>

                        <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post._count?.comments || 0}
                        </span>

                        {post.isFeatured && (
                            <Badge
                                variant="default"
                                className="bg-yellow-500 hover:bg-yellow-600">
                                Featured
                            </Badge>
                        )}
                    </div>

                    <div>
                        <Link
                            href={`/blogs/${post.id}`}
                            className="text-sm font-semibold text-primary group-hover:underline">
                            <Button>Read More</Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
