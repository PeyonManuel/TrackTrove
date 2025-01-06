import React from "react";

export const TopManga = () => {
  const [page, setPage] = React.useState(1);
  const [searched, setSearched] = React.useState(false);
  const loadNextPage = () => {
    handleFetch(page + 1, searched);
    setPage(page + 1);
  };
  return <div>TopManga</div>;
};
