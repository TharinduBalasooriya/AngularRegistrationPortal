export interface LoginResponse{
    token: string;
    userId: number;
    error ?: string;
}