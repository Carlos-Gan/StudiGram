import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignUpForm = () => {

  const { checkAuthUser, isLoading:isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const {mutateAsync: createUserAccount, 
    isPending : isCreatingUser} = useCreateUserAccount();

  const {mutateAsync: signInAccount, 
    isPending:isSigningIn} = useSignInAccount(); 


  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignUpValidation>) {
    //crear Usuario
    const newUser = await createUserAccount(data);
    if(!newUser){
       toast( "Error",{
        description: "No se pudo crear la cuenta. Intente nuevamente",
        duration: 2000, });
        return;
    }
       const session = await signInAccount({
        email: data.email,
        password: data.password,
       })

       if(!session) return toast.error("Error",{
        description: "No se pudo iniciar sesión. Intente nuevamente",
        duration: 2000,
      })
      const isLoggedIn = await checkAuthUser();

      if(isLoggedIn){
        form.reset();
        navigate("/");
      }else{
        toast.error("Error",{
          description: "No se pudo iniciar sesión. Intente nuevamente",
          duration: 2000,
        });
      }

    



  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center px-4">
        {<img src="public\assets\images\logo.svg" alt="logo" className="mb-4 w-24 sm:w-32"/>}

        <h2 className="font-bold text-2xl sm:text-3xl text-center pt-5">Crear cuenta nueva</h2>
        <p className="text-gray-500 text-light text-center pt-5">
          Para usar StudiGram ingrese los datos de la cuenta
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full max-w-md mx-auto mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pt-5">
                <FormLabel className="text-sm sm:text-base">Nombre</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="pt-5">
                <FormLabel className="text-sm sm:text-base">Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pt-5">
                <FormLabel className="text-sm sm:text-base">Correo</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pt-5 pb-7">
                <FormLabel className="text-sm sm:text-base">Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full py-10 sm:py-3 sm:text-lg">
            {isCreatingUser ? (
              <div className="flex items-center gap-2 flex-row">
                <Loader/> Cargando ...
              </div>
            ):"Crear cuenta"
            }
          </Button>
          <p className="text-regular text-light-2 text-center mt-2 py-3">
            Ya tienes una cuenta?   
            <Link to="/sign-in" className="text-blue-500 font-semibold">   Iniciar Sesión</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
