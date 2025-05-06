// app/page.tsx
import Slider from "@/components/Slider";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

export default function Home(): JSX.Element {
  return (
    <>
      <Slider />
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";