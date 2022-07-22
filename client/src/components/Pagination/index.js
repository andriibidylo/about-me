import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({currentPage, onClickPage, totalPages}) => (

  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={event => onClickPage(event.selected + 1)}
    pageRangeDisplayed={2}
    pageCount={totalPages}
    forcePage={currentPage - 1}
  />
);

