import {AnchorHTMLAttributes, MouseEvent} from "react";
import {navigate} from "./router";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({to, onClick, ...rest}: LinkProps) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
    };
    return <a href={to} onClick={handleClick} {...rest}/>;
}
