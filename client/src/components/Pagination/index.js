import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = () => (

  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={""}
    pageRangeDisplayed={2}
    pageCount={3}
    forcePage={"currentPage - 1"}
  />
);

