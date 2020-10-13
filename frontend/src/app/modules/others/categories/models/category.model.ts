export interface Category {
    id: number;
    name: string;    
}

export function createEmptyCategory(): Category {
    return {
        id: 0,
        name: ""
    } as Category;
}