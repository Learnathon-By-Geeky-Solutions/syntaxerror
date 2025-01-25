import Categories from "@/components/Category/Category";
import Hero from "@/components/Header/Hero";
import LatestProducts from "@/components/LatestProduct/LatestProduct";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Categories></Categories>
      <LatestProducts></LatestProducts>
    </div>
  );
}
