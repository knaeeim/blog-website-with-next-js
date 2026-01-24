"use server";
import { blogServices } from "@/services/blog.service";
import { BlogData } from "@/types";

export const createBlogPost = async (data: BlogData) => {
    const res = await blogServices.createBlogPost(data);
    return res;
}
