"use client";

import { PropsWithChildren } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface Props extends PropsWithChildren {
  callback: () => void;
}

const List = (props: Props) => {
  const { children, callback } = props;
  const { eRef } = useInfiniteScroll(callback);

  return <div ref={eRef}>{children}</div>;
};

export default List;
