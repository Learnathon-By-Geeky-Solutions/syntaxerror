"use client";

import ProductPageContent from "@/components/product/ProductPageContent";
import { Suspense } from "react";

export default function Index() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductPageContent />
    </Suspense>
  );
}