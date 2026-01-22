import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogServices } from "@/services/blog.service";
import {
    CalendarDays,
    Eye,
    MessageSquare,
    ChevronLeft,
    User,
    Share2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    // Fetching data using your service
    const result = await blogServices.getBlogById(id);
    const {data : post} = result?.data;

    console.log(post);
    // Handle 404 if post doesn't exist
    if (!post) {
        return notFound();
    }

    // Helper to format date
    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-background pb-20 pt-10">
            <div className="container max-w-4xl mx-auto px-4">
                {/* 1. Back Navigation */}
                <div className="mb-8">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="pl-0 text-muted-foreground hover:text-primary">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>

                {/* 2. Article Header */}
                <header className="mb-10 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Status Badge */}
                        <Badge
                            variant={
                                post.status === "PUBLISHED"
                                    ? "default"
                                    : "secondary"
                            }>
                            {post.status}
                        </Badge>

                        {/* Featured Badge */}
                        {post.isFeatured && (
                            <Badge
                                variant="outline"
                                className="border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20">
                                Featured Post
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
                        {post.title}
                    </h1>

                    {/* Meta Information Bar */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {/* Author (Placeholder since interface only has authorId) */}
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">
                                Author ID: {post.authorId}
                            </span>
                        </div>

                        <Separator
                            orientation="vertical"
                            className="h-4 hidden sm:block"
                        />

                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            <span>{formattedDate}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            <span>{post.views} views</span>
                        </div>
                    </div>
                </header>

                {/* 3. Hero Image */}
                {post.thumbnail && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 shadow-md border bg-muted">
                        <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* 4. Main Content */}
                <article className="prose prose-stone dark:prose-invert md:prose-lg max-w-none">
                    {/* NOTE: If 'post.content' is HTML, use dangerouslySetInnerHTML.
                      If it's Markdown, use a markdown parser. 
                      If it's plain text with line breaks, the below works nicely. 
                    */}
                    <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                        {post.content}
                    </div>
                </article>

                <Separator className="my-12" />

                {/* 5. Footer: Tags and Interactions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Tags List */}
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Related Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags && post.tags.length > 0 ? (
                                post.tags.map((tag : string, index : number) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="hover:bg-secondary/80 px-3 py-1">
                                        #{tag}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground italic">
                                    No tags
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {post._count?.comments || 0} Comments
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
