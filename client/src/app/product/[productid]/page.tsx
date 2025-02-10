

export default async function Page({ params }:{
  params: Promise<{ productid: string }>
}) {
    const { productid } = await params;
  return <div>{productid}</div>;
}
