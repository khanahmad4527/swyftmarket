import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { Button, Flex, Square } from "@chakra-ui/react";

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Flex
      gap="10px"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Button
        color="sm.sparkle"
        colorScheme="yellow"
        isDisabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      {paginationRange.map((pageNumber: number | string) => {
        if (pageNumber === DOTS) {
          return (
            <Square key={`${pageNumber}${Math.random()}${Date.now()}`}>
              &#8230;
            </Square>
          );
        }

        return (
          <Square
            key={`${pageNumber}${Math.random()}${Date.now()}`}
            padding="5px 15px"
            cursor="pointer"
            bgColor={currentPage === pageNumber ? "yellow.500" : "white"}
            color={currentPage === pageNumber ? "white" : "yellow.500"}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </Square>
        );
      })}
      <Button
        color="sm.sparkle"
        colorScheme="yellow"
        isDisabled={currentPage === lastPage}
        onClick={onNext}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
