import React, { useCallback, useContext, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { getData } from "../axios";
import Card from "../components/Card";
import { AuthContext } from "../contexts/MainContext";

const Dashboard = () => {
  const [logged, setLogged, getToken] = useContext(AuthContext);
  const { data, isError, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(["users"], ({ pageParam = 1 }) => getData(pageParam), {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
    });
  if (isError) {
    if (error.response.status === 401) {
      getToken();
      if (data?.pages.length < data?.pages[0].data.last_page) fetchNextPage();
    }
  }
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  });
  return (
    <div className="dashboard">
      {!isLoading && !isError && (
        <div className="card-container">
          {data.pages.map((page, pageIndex) =>
            page.data.data.map((d, i) => (
              <>
                {data.pages.length === pageIndex + 1 &&
                page.data.data.length === i + 1 &&
                data.pages.length + 1 < page.data.last_page ? (
                  <Card refer={lastElementRef} values={page} d={d} key={i} />
                ) : (
                  <Card d={d} refer={null} key={i} />
                )}
              </>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
