import Link from 'next/link'

export default function PageNumber({
  pageNo,
  hasNextPage,
  next,
  prev,
}: {
  pageNo: number
  next: string
  prev?: string
  hasNextPage?: boolean
}) {
  return (
    <nav className="pagination" aria-label="pagination">
      <div className="pagination-slot">
        {pageNo !== 1 && prev && (
          <Link href={prev} className="pagination-link">
            <span aria-hidden="true">←</span>
            <span>Page {pageNo - 1}</span>
          </Link>
        )}
      </div>
      <div className="pagination-slot end">
        {hasNextPage && (
          <Link href={next} className="pagination-link">
            <span>Page {pageNo + 1}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
