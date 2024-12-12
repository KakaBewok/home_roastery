import StoreHeading from "@/components/StoreHeading";
import ProductListings from "@/components/ProductListings";
import { getAllProductsInCollection } from "@/lib/shopify";

function IndexPage({ products }) {
    return (
        // <div className="max-w-6xl mx-auto">
        //   <StoreHeading />
        //   <ProductListings products={products} />
        // </div>
        <h1>Test Front-End</h1>
    );
}

// export async function getStaticProps() {
//   const products = await getAllProductsInCollection()

//   return {
//     props: {
//       products
//     },
//   }
// }

export default IndexPage;
