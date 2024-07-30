'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationControls = ({ hasNextPage, hasPrevPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('per_page') ?? '5';

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${perPage}`);
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(perPage))}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${perPage}`);
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;