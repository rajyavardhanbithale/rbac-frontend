export interface Author {
    _id: string;
    name: string;
    email: string;
}

export interface Post {
    _id: string;
    title: string;
    content: string;
    authorID: Author;
    createdAt: string;
    updatedAt: string;
}


export interface Comment {
    _id: string;
    content: string;
    userId: {
        _id: string;
        name: string;
    };
}

export interface Post {
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

export interface UserInfo {
    name: string;
    email: string;
}

export interface userData {
    userInfo: UserInfo;
    role: string;
    permissions: string[];
}

export interface StatsUser {
    role: string;
    count: number;
}

export interface DashboardData {
    userData: userData;
    filteredStatsUser: StatsUser[];
    postCount: number;
    commentsCount: number;
    role?: string;
    post?: Post[];
}
