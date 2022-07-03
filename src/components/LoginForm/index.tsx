import { Input, Button } from '@chakra-ui/react'
import { useFormik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useLogin, { iLoginResponse } from '../../logic/useLogin';

import { iLoginFormFields } from './interface'
import { Form } from './styles';

const LoginForm = () => {
    const { isReady: routerIsReady, query: routerQuery } = useRouter();
    const [returnUrl, setReturnUrl] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const {
        login,
        isLoading,
    } = useLogin();

    // Set returnUrl based on query params
    useEffect(() => {
        if (!routerIsReady) return;
        const { p } = routerQuery;
        
        if (p) setReturnUrl(`${p}`)
    }, [routerIsReady, routerQuery])

    // Check text to render in submit button
    const buttonText = useMemo(() => showPassword ? 'Entrar' : 'Continuar', [showPassword])

    // Submit for form
    const handleSubmit = useCallback(async (values: iLoginFormFields, formikHelpers: FormikHelpers<iLoginFormFields>) => {
        if (!showPassword) {
            setShowPassword(true)
            return;
        }

        const success = (data: iLoginResponse) => {
            const { tibasToken } = data
            window.location.href = `${returnUrl}?tt=${tibasToken}`
        }
        
        const error = (error: unknown) => {
            console.log('error', error)

            formikHelpers.resetForm()
            setShowPassword(false)
        }

        await login(values.login, values.password, success, error)

    }, [showPassword, returnUrl, login])

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: handleSubmit,
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            {!showPassword && (
                <Input
                    {...formik.getFieldProps('login')}
                    placeholder="Seu login..."
                    type="text"
                    variant="flushed"
                    size='lg'
                    autoComplete='off'
                    autoFocus
                />
            )}

            {showPassword && (
                <Input
                    {...formik.getFieldProps('password')}
                    placeholder="Insira sua senha"
                    type="password"
                    variant="flushed"
                    size='lg'
                    autoComplete='off'
                    autoFocus
                />
            )}

            <Button type="submit" size="lg" isLoading={isLoading}> {buttonText} </Button>
        </Form>
    )
}

export default LoginForm