import Page from "../../components/Page";
import { getCategoryProducts } from "../../components/GetCategoryProducts";

export default async function Home() {
  const bestSellers = await getCategoryProducts("Best Sellers");
  return (
    <>
      <Page products={bestSellers} />
    </>
  );
}
