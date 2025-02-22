import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="text-white hover:bg-zinc-800"
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <span className="px-4 text-zinc-400">...</span>
          </PaginationItem>
        );
      }
    }

    // Add pages
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            className={`text-white hover:bg-zinc-800 ${
              currentPage === page ? "bg-zinc-800" : ""
            }`}
            onClick={() => setCurrentPage(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <span className="px-4 text-zinc-400">...</span>
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="text-white hover:bg-zinc-800"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-white hover:bg-zinc-800"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            isActive={currentPage > 1}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            className="text-white hover:bg-zinc-800"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;