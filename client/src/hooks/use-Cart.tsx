import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCart = () => {
  const { data, refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
          { withCredentials: true }
        );
        console.log("Cart API Response:", res.data.data.products);

        return res.data.data.products ?? []; 
      } catch (error) {
        console.error("Error fetching cart:", error);
        return []; 
      }
    },
    staleTime: 1000 * 60 * 5, 
  });

  return { cartItems: data ?? [], refetch};
};

export default useCart;
