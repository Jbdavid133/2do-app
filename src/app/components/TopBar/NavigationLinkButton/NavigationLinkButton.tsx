import React from 'react';
import styles from './NavigationLinkButton.module.scss';
import {Box, Heading} from '@wix/design-system';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import classNames from 'classnames';

interface NavigationLinkButtonProps {
    label: string;
    href: string;
    className: string;
    icon: React.ReactNode;
    activeClassName?: string;
}

export const NavigationLinkButton = (props: NavigationLinkButtonProps) => {
    const currentPathname = usePathname();
    const isActive = currentPathname === props.href;

    return (
        <Link href={props.href}
              className={classNames(styles.link, props.className, {[`${props.activeClassName}`]: isActive})}>
            <Box className={styles.linkBox} gap='10px' align='center' verticalAlign='middle'>
                {props.icon}
                <Heading size='small'>{props.label}</Heading>
            </Box>
        </Link>
    );
};
