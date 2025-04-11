import Offer from "@/components/Banner/Offer";
import WhyChooseUs from "@/components/Banner/WhyChooseUs";
import PopularCategories from "@/components/Category/Category";
import Hero from "@/components/Header/Hero";
import LatestProducts from "@/components/LatestProduct/LatestProduct";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <WhyChooseUs></WhyChooseUs>
      <PopularCategories></PopularCategories>
      <LatestProducts></LatestProducts>
      <Offer></Offer>
    </div>
  );
}
