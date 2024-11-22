import React, { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-2xl text-white font-bold">{children}</h1>;
};

export default Title;
