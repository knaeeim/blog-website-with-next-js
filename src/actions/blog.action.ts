"use server";
import { blogServices } from "@/services/blog.service";
import { BlogData } from "@/types";
import { updateTag } from "next/cache";

export const createBlogPost = async (data: BlogData) => {
    const res = await blogServices.createBlogPost(data);
    updateTag('blogPosts')
    return res;
}
