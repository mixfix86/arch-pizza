import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>☹</span>
        <br />
        Страница не найдена
      </h1>
      <p className={styles.description}>К сожалению такой страницы в нашем интернет-магазине нет</p>
    </div>
  );
};
