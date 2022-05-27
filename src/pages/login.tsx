import React from "react";
import {useForm} from "react-hook-form";
import {FormError} from "../components/form-error";
import {ApolloError, gql, useMutation} from "@apollo/client";
import {loginMutation, loginMutationVariables} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;


interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {register, getValues , formState : {errors}, handleSubmit} = useForm<ILoginForm>();

    const onCompleted = (data: loginMutation) => {
        const {login : {ok, token}} = data;
        if(ok) {
            console.log(token);
        }
    }

    const [loginMutation, {data: loginMutationResult, loading}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
    })
    const onSubmit = () => {
      if(!loading){
          const {email, password} = getValues();
          loginMutation({
              variables: {
                  loginInput: {
                      email,
                      password
                  }
              }
          }).then(r => {
              console.log("_________")
              console.log(r.data?.login.token)
          })
      }
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
                <h3 className="text-2xl text-gray-800">Log In</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
                    <input {...register("email", {
                        required : "Email을 입력해주세요",
                        pattern: /^[A-Za-z0-9._%+-]+@+[a-z.+]+\.+[a-z]+$/,
                    })}
                        required
                        placeholder="Email" className="input"/>
                    {errors.email?.type === "pattern" && (<FormError errorMessage="Email 형식이 아닙니다." />)}
                    {errors.email?.message && (<FormError errorMessage={errors.email?.message} />)}
                    <input {...register("password", {
                        required : "Password is required", minLength : 8
                    })}
                           required
                           placeholder="Password" className="input"/>
                    {errors.password?.type ==="minLength" && (<FormError errorMessage="비밀번호는 8자이상 입력해주세요" />)}

                    <button className="btn mt-4">
                        {loading? "Loding..." : "Log In"}
                </button>
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error} />}
                </form>
            </div>
        </div>
    )
}