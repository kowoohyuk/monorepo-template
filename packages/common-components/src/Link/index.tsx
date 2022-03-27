import { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react';

import { css } from '@emotion/react';
import {
  LinkProps as RouterLinkProps,
  Link as RouterLink,
  NavLinkProps,
  NavLink,
} from 'react-router-dom';

type LinkComponentProp = 'a' | 'link' | 'navLink';

interface ComponentProps {
  a: AnchorHTMLAttributes<HTMLAnchorElement>;
  link: Omit<RouterLinkProps, 'component'>;
  navLink: Omit<NavLinkProps, 'component'>;
}

const LinkComponent = {
  a: 'a',
  link: RouterLink,
  navLink: NavLink,
};

export type LinkProps<C extends LinkComponentProp = LinkComponentProp> =
  ComponentProps[C] & {
    component?: C;
    underline?: 'none' | 'hover' | 'always';
    disabled?: boolean;
    children: ReactNode;
  };

const Link = ({
  component = 'a',
  underline = 'none',
  disabled = false,
  ...props
}: LinkProps) => {
  const Component = LinkComponent[
    component
  ] as unknown as ComponentType<LinkProps>;

  const linkStyle = css`
    color: inherit;
    cursor: ${disabled ? 'default' : 'pointer'};
    text-decoration: ${underline === 'always' ? 'underline' : 'none'};
    &:hover {
      text-decoration: ${underline === 'none' ? 'none' : 'underline'};
    }
    ${disabled && 'pointer-events: none;'}
  `;

  return <Component css={linkStyle} {...props} />;
};

export default Link;
