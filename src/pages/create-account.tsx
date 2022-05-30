import React from "react";
import {useForm} from "react-hook-form";
import {FormError} from "../components/form-error";
import {gql, useMutation} from "@apollo/client";
import nuberLogo from "../images/logo.svg"
import {Button} from "../components/button";
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {UserRole} from "../__generated__/globalTypes";
import {createAccountMutation, createAccountMutationVariables} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;


interface ICreateForm {
    email: string;
    password: string;
    role: UserRole;
}

export const CreateAccount = () => {
    const {register, getValues, formState: {errors, isValid}, handleSubmit} = useForm<ICreateForm>({
        mode: "onChange",
        defaultValues: {role: UserRole.Client}
    });

    const navigate = useNavigate();
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: {ok}
        } = data;
        if (ok) {
            alert("회원가입에 성공하셨습니다! 로그인 페이지로 이동합니다")
            navigate("/login");
        }
    }


    const [createAccountMutation, {
        loading,
        data: createAccountMutationResult
    }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {onCompleted})
    const onSubmit = () => {
        if (!loading) {
            const {email, password, role} = getValues()
            createAccountMutation({
                variables: {
                    createAccountInput: {email, password, role}
                }
            })
        }
    }
    return (
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <Helmet>
                <title>Create Account | Yammy Eats</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={nuberLogo} className="w-52 mb-10"/>
                <h4 className="w-full text-3xl mb-5">Let's get started</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-3 mt-5 mb-5">
                    <input {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "이메일 형식이 아닙니다"
                        },
                    })}
                           required
                           placeholder="Email" className="input"/>
                    {errors.email?.message && (<FormError errorMessage={errors.email?.message}/>)}
                    <input {...register("password", {
                        required: "Password is required", minLength: 8
                    })}
                           required
                           placeholder="Password" className="input"/>
                    {errors.password?.type === "minLength" && (<FormError errorMessage="비밀번호는 8자이상 입력해주세요"/>)}

                    <select {...register("role", {
                        required: true
                    })}
                            className="input">
                        {Object.keys(UserRole).map((role, index) => <option key={index}>{role}</option>)}
                    </select>
                    <Button canClick={isValid} loading={false} actionText="Creat Account"/>
                    {createAccountMutationResult?.createAccount.error &&
                        <FormError errorMessage={createAccountMutationResult.createAccount.error}/>}
                </form>
                <div>
                    Already have an account?{" "} <Link to={"/login"} className="text-lime-600 hover:underline">Log In
                    Now</Link>
                </div>
            </div>
        </div>
    )
}