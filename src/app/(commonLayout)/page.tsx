import { BlogCard } from "@/components/modules/HomePage/BlogCard";
import { blogServices } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
    const { data, error } = await blogServices.getBlogPosts(
        { search: "" },
        {
            cache: "no-store",
        },
    );

    if (error || !data) {
        return (
            <div className="my-20">
                <p className="text-center text-red-600">
                    Failed to load blog posts. {error?.message}
                </p>
            </div>
        );
    }

    return (
        <div className="my-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.data.map((post: BlogPost) => (
                    <BlogCard key={post.id} post={post}></BlogCard>
                ))}
            </div>
        </div>
    );
}
