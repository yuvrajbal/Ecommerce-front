import { getCategoryProducts } from "../../../../components/GetCategoryProducts";
import CategoryProducts from "../../../../components/CategoryProducts";
import { Category } from "../../../../models/category";

export default async function Page({ params }) {
  console.log(params);
  const { category } = params;
  const products = await getCategoryProducts(category);
  const categoryName = await Category.findById(category);
  console.log(categoryName);
  return (
    <div>
      <CategoryProducts products={products} categoryName={categoryName.name} />
    </div>
  );
}
