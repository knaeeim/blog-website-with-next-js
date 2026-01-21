import React from "react";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <h1>This is a Dynamic Page...{id}</h1>
        </div>
    );
};

export default BlogPage;
