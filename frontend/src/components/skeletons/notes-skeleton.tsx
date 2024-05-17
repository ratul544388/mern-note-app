import { Skeleton } from "@mui/material";

export const NotesSkeleton = () => {
  return (
    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white relative flex flex-col p-3 pt-4 shadow-md rounded-md border"
        >
          <Skeleton
            animation="wave"
            width={30}
            height={30}
            variant="circular"
            className="!absolute !right-2 !top-1"
          />
          <Skeleton animation="wave" className="w-[calc(100%_-_40px)]" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      ))}
    </div>
  );
};
