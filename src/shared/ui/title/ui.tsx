import * as classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import styles from './styles.module.scss';

export const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
    const classes = classNames(styles.title, className);

    return <h1 className={classes} {...props}>{children}</h1>
}