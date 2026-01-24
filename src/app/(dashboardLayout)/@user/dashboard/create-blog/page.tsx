import CreateBlogFormClient from "@/components/modules/user/CreateBlogForm/CreateBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/CreateBlogForm/CreateBlogFormServer";
import { blogServices } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Heading1 } from "lucide-react";
import React from "react";

const CreateBlogPage = async () => {
    const { data } = await blogServices.getBlogPosts();
    return (
        <div>
            {/* <CreateBlogFormServer /> */}
            <CreateBlogFormClient />

            {/* to see that caching is properly handled or not!! */}
            {/* <div>
                {data.data.map((post : BlogPost) => <h1 key={post.id}>{post.title}</h1>)}
            </div> */}
        </div>
    );
};

export default CreateBlogPage;
