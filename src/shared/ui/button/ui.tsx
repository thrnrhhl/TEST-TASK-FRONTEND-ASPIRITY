import * as classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import styles from './styles.module.scss';


interface Props extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'outline' | 'danger';
}

export const Button: FC<Props> = ({ className, children, variant = "outline", ...props }) => {

    const classes = classNames(styles.button, {
        [styles.button__outline]: variant === 'outline',
        [styles.button__primary]: variant === 'primary',
        [styles.button__danger]: variant === 'danger',
    }, className)

    return (
        <button className={classes} {...props}>{children}</button>
    );
};