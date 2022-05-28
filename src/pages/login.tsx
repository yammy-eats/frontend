import React from "react";
import {useForm} from "react-hook-form";
import {FormError} from "../components/form-error";
import {gql, useMutation} from "@apollo/client";
import {loginMutation, loginMutationVariables} from "../__generated__/loginMutation";
import nuberLogo from "../images/logo.svg"
import {Button} from "../components/button";
import {Link} from "react-router-dom";

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
    const {register, getValues, formState: {errors, isValid}, handleSubmit} = useForm<ILoginForm>( {mode:"onChange"});

    const onCompleted = (data: loginMutation) => {
        const {login: {ok, token}} = data;
        if (ok) {
            console.log(token);
        }
    }

    const [loginMutation, {
        data: loginMutationResult,
        loading
    }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
    })
    const onSubmit = () => {
        if (!loading) {
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
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={nuberLogo} className="w-52 mb-10"/>
                <h4 className="w-full text-3xl mb-5">Welcome back</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-3 mt-5 mb-5">
                    <input {...register("email", {
                        required: "Email을 입력해주세요",
                        pattern: /^[A-Za-z0-9._%+-]+@+[a-z.+]+\.+[a-z]+$/,
                    })}
                           required
                           placeholder="Email" className="input"/>
                    {errors.email?.type === "pattern" && (<FormError errorMessage="Email 형식이 아닙니다."/>)}
                    {errors.email?.message && (<FormError errorMessage={errors.email?.message}/>)}
                    <input {...register("password", {
                        required: "Password is required", minLength: 8
                    })}
                           required
                           placeholder="Password" className="input"/>
                    {errors.password?.type === "minLength" && (<FormError errorMessage="비밀번호는 8자이상 입력해주세요"/>)}

                    <Button canClick={isValid} loading={loading} actionText="Log In"/>
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error}/>}
                </form>
                <div>
                    New to Yammy? <Link to={"/create-account"} className="text-lime-600 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    )
}