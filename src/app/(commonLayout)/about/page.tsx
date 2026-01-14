import React from "react";

const AboutPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return (
        <div>
            <h1>This is about Page..</h1>
        </div>
    );
};

export default AboutPage;
