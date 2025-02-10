export default async function page({ params }: { params: any }) {
    const { productid } = await params;
  return <div>{productid}</div>;
}
