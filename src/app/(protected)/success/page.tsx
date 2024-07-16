"use client";

import { Suspense, useEffect, useState } from "react";

import Success from "@/components/dashboard/components/success";

const success = () => {
  return (
    <Suspense>
      <Success />
    </Suspense>
  );
};

export default success;
