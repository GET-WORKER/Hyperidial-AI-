import React from "react";
import { Pagination as RPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    let items = [];

    if (totalPages <= 5) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <RPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </RPagination.Item>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let number = 1; number <= 5; number++) {
          items.push(
            <RPagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </RPagination.Item>
          );
        }
      } else if (currentPage >= totalPages - 2) {
        for (let number = totalPages - 4; number <= totalPages; number++) {
          items.push(
            <RPagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </RPagination.Item>
          );
        }
      } else {
        for (
          let number = currentPage - 2;
          number <= currentPage + 2;
          number++
        ) {
          items.push(
            <RPagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </RPagination.Item>
          );
        }
      }
    }
    return items;
  };

  return (
    <RPagination className="mt-2 mb-2">
      <RPagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <RPagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {renderPaginationItems()}
      <RPagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <RPagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </RPagination>
  );
};

export default Pagination;
