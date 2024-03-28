'use client';

import styles from './page.module.scss';
import {Box, Card, Heading, Image} from '@wix/design-system';
import {LoginForm} from '@/app/components/forms/LoginForm/LoginForm';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';
import {AuthenticationContext} from '@/app/context/authentication.context';

export default function Login() {
    const {login} = useContext(AuthenticationContext);
    const router = useRouter();

    const handleLogin = (username: string) => {
        login(username);
        router.push('/tasks');
    };

    return (
        <Box verticalAlign='middle' align='center' className={styles.container}>
            <Card className={styles.welcomeCard} showShadow={true} stretchVertically={false}>
                <Box align='center' direction='vertical' gap='40px'>
                    <Image src='/images/logo.png' transparent={true} width='25%' alt='logo-image'/>

                    <Box align='center' direction='vertical' gap='10px'>
                        <Heading>Welcome to 2Do</Heading>
                        <Heading size='tiny'>Enter your details to login</Heading>
                    </Box>

                    <LoginForm onSubmit={handleLogin} className={styles.loginForm}/>
                </Box>
            </Card>
        </Box>
    );
}
