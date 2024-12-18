export type User ={
    id:number
    email:string,
    password:string,
}

export type LoginResponse = {
    name: string | null;
    accessToken:string
};
  
export type ChatResponse = {
    results:string[]
};  