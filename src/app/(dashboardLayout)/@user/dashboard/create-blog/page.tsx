import CreateBlogFormClient from "@/components/modules/user/CreateBlogForm/CreateBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/CreateBlogForm/CreateBlogFormServer";
import React from "react";

const CreateBlogPage = () => {
    return (
        <div>
            {/* <CreateBlogFormServer /> */}
            <CreateBlogFormClient />
        </div>
    );
};

export default CreateBlogPage;
