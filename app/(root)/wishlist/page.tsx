"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { use, useEffect, useState } from "react"

const Wishlist = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log('User data:', data); // Debug dữ liệu user
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getWishlistProducts = async () => {
    setLoading(true);
  
    if (!signedInUser || !signedInUser.wishlist?.length) {
      setWishlist([]);
      setLoading(false);
      return;
    }
  
    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        console.log('Processing productId:', productId); // Debug productId
        const res = await getProductDetails(productId);
        return res; // res có thể là null nếu fetch lỗi
      })
    );
  
    // Lọc bỏ các sản phẩm null (do lỗi fetch)
    const validProducts = wishlistProducts.filter((product) => product !== null);
    setWishlist(validProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }


  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Sản phẩm bạn thích</p>
      {wishlist.length === 0 && (
        <p>Không có sản phẩm nào trong này</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Wishlist