import React from "react";
import Pagination from "react-bootstrap/Pagination";
import uuid from "react-uuid";

function PaginateWriters({writers, onSelectPage}) {
  const currentPage = writers?.current_page;
  const lastPage = writers?.last_page;

  const firstUrl = writers?.first_page_url;
  const prevUrl = writers?.prev_page_url;

  const nextUrl = writers?.next_page_url;
  const lastUrl = writers?.last_page_url;

  const pageLength = writers?.links?.length - 1;
  //const helfPage = Math.round(pageLength / 2);
  console.log("Writers paginate", writers);
  const paginator = writers?.links.map((link, idx) => {
    if (idx > 0 && idx < pageLength)
      return (
        <React.Fragment key={uuid()}>
          {" "}
          <Pagination.Item
            onClick={(e) => onSelectPage(e, link)}
            href={link.url}
            active={link.active}
          >
            {link.label}
          </Pagination.Item>
        </React.Fragment>
      );
  });

  return (
    <Pagination className="d-flex justify-content-center">
      {prevUrl && currentPage > 1 && (
        <>
          <Pagination.First
            onClick={(e) =>
              onSelectPage(e, {label: "1", url: firstUrl})
            }
            href={firstUrl}
          />
          <Pagination.Prev
            onClick={(e) =>
              onSelectPage(e, {
                label: currentPage - 1,
                url: prevUrl,
              })
            }
            href={prevUrl}
          />
        </>
      )}

      {paginator}
      {nextUrl && currentPage < lastPage && (
        <>
          <Pagination.Next
            onClick={(e) =>
              onSelectPage(e, {
                label: currentPage + 1,
                url: firstUrl,
              })
            }
            href={nextUrl}
          />
          <Pagination.Last
            onClick={(e) =>
              onSelectPage(e, {label: lastPage, url: lastUrl})
            }
            href={lastUrl}
          />
        </>
      )}
    </Pagination>
  );
}
export default PaginateWriters;
