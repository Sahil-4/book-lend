"use client";

import { PropsWithChildren } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface Props extends PropsWithChildren {
  callback: () => void;
  className?: string;
  styles?: object;
}

const List = (props: Props) => {
  const { children, callback, className, styles } = props;
  const { eRef } = useInfiniteScroll(callback);

  return (
    <div className={className} style={styles} ref={eRef}>
      {children}
    </div>
  );
};

export default List;
