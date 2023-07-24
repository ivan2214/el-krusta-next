import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";

export const revalidate = 120;

interface HomePageProps {
  searchParams: {
    name?: string;
  };
}

const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  const products = await getProducts({ name: searchParams.name });
  const billboard = await getBillboard("dfbf091b-0892-4645-a4dd-7a6154518adf");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
