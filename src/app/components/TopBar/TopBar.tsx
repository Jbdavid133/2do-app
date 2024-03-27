import React, {useContext} from 'react';
import styles from './TopBar.module.scss';
import {Avatar, Box, Cell, Heading, Image, Layout} from '@wix/design-system';
import {Add, Checklist, Exit} from '@wix/wix-ui-icons-common';
import {NavigationLinkButton} from '@/app/components/TopBar/NavigationLinkButton/NavigationLinkButton';
import {AuthenticationContext} from '@/app/context/authentication.context';
import classNames from 'classnames';

export const TopBar = () => {
    const {username} = useContext(AuthenticationContext);

    return (
        <Box className={styles.topBar}>
            <Layout alignItems='stretch' rowHeight='50px' className={styles.layout}>
                <Cell span={2}>
                    <Box verticalAlign='middle' gap='20px' className={styles.box}>
                        <Image src='/images/logo.png' alt='App logo' transparent/>
                        <Heading>2Do</Heading>
                    </Box>
                </Cell>
                <Cell span={8}>
                    <Box align='center' verticalAlign='middle'
                         className={classNames(styles.box, styles.navigationLinks)}>
                        <NavigationLinkButton className={styles.navigationLink} activeClassName={styles.active}
                                              label='All' href='/tasks'
                                              icon={<Checklist/>}/>
                        <NavigationLinkButton className={styles.navigationLink} activeClassName={styles.active}
                                              label='Create' href='/tasks/create'
                                              icon={<Add/>}/>
                        <NavigationLinkButton className={styles.navigationLink} activeClassName={styles.active}
                                              label='Logout' href='/' icon={<Exit/>}/>
                    </Box>
                </Cell>
                <Cell span={2}>
                    <Box align='right' verticalAlign='middle' className={styles.box}>
                        <Avatar name={username ?? ''} color='A1' size='size36' shape='square'></Avatar>
                    </Box>
                </Cell>
            </Layout>
        </Box>
    );
};