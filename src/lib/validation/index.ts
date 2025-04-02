import  * as z from 'zod';

export const SignUpValidation = z.object({
    name: z.string().min(2,{message:'Nombre muy corto'}),
    username: z.string().min(3, {message:'Nombre de Usuario muy corto'}),
    email: z.string().email({message:'Email no valido'}),
    password: z.string().min(7, {message:'Contraseña muy corta, debe tener al menos 7 caracteres'}),
  });

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(7, { message: "La constraseña debe de tener al menos 7 caracteres" }),
  });

  export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "El nombre debe de tener al menos 2 caracteres" }),
    username: z.string().min(2, { message: "El ususario debe de tener al menos 2 caracteres" }),
    email: z.string().email(),
    bio: z.string(),
  });

  export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimo 5 caracteres" }).max(2200, { message: "Maximo 2,200 caracteres" }),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "Rellenar el campo" }).max(1000, { message: "Maximo 1000 caracteres." }),
    tags: z.string(),
  });