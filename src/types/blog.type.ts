enum BlogPostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCIVED = 'ARCIVED'
}

export interface BlogPost {
    id : string | number;
    title : string;
    content : string;
    thumbnail? : string | null;
    isFeatured? : boolean;
    status : BlogPostStatus;
    tags? : string[];
    views : number;
    authorId : string | number;
    createdAt : string;
    updatedAt : string;
    _count? : {
        comments : number;
    };
}

export interface BlogData {
    title: string;
    content: string;
    tags: string[];
}