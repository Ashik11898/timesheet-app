export type User ={
    id:number
    email:string,
    password:string,
}

export type LoginResponse ={
    accessToken: string;
    user: {
      name: string;
      email: string;
    };
  }
  