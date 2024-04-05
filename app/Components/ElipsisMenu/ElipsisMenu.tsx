"use client";
import React, { ComponentPropsWithoutRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ElipsisMenu.module.css";

const cx = classNames.bind(styles);

type ElipsisMenuProps = ComponentPropsWithoutRef<"div">;

export function ElipsisMenu({ children }: ElipsisMenuProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openCloseSubMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <>
      <svg
        width="5"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        className={cx("button")}
        onClick={openCloseSubMenu}
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      <div>
        <div className={cx("subMenuContainer", { hide: !menuIsOpen })}>
          {children}
        </div>
      </div>
    </>
  );
}

type ItemProps = {
  type?: string;
} & ComponentPropsWithoutRef<"div">;

export function Item({ children, type = "standard", ...props }: ItemProps) {
  return (
    <div className={cx("link", type)} {...props}>
      {children}
    </div>
  );
}