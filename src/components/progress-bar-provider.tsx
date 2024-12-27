"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#1d4ed8"
        options={{ showSpinner: true }}
        shallowRouting={true}
      />
    </>
  );
};

export default ProgressBarProvider;
