interface Author {
    _id: string;
    name: string;
    email: string;
}

interface Post {
    _id: string;
    title: string;
    content: string;
    authorID: Author;
    createdAt: string;
    updatedAt: string;
}


interface Comment {
    _id: string;
    content: string;
    userId: {
        _id: string;
        name: string;
    };
}

interface Post {
    _id: string;
    title: string;
    content: string;
    authorID: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}