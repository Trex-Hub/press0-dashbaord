const DashboardCardsPage = () => {
  return (
    <div className='flex flex-row gap-2 flex-wrap w-full'>
      {[...new Array(4)].map((i, idx) => (
        <div
          key={'first-array-demo-1' + idx}
          className='h-20 md:h-32 xl:h-56 flex-1 min-w-164 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center'>
          Chart {idx + 1}
        </div>
      ))}
    </div>
  );
};

export default DashboardCardsPage;
