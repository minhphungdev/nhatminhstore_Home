import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  // Chỉ ghi log products nếu orders tồn tại và có ít nhất một mục
  if (orders && orders.length > 0) {
    console.log(orders[0].products);
  }

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Đơn hàng của bạn</p>
      {!orders || orders.length === 0 ? (
        <p className="text-body-bold my-5">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {orders.map((order: OrderType) => (
            <div key={order._id} className="flex flex-col gap-8 p-4 hover:bg-grey-1">
              <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                <p className="text-base-bold">Mã đơn hàng: {order._id}</p>
                <p className="text-base-bold">
                  Tổng số tiền: ${order.totalAmount}
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {order.products.map((orderItem: OrderItemType) => (
                  <div key={orderItem.product._id} className="flex gap-4">
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-small-medium">
                        Tiêu đề:{" "}
                        <span className="text-small-bold">
                          {orderItem.product.title}
                        </span>
                      </p>
                      {orderItem.color && (
                        <p className="text-small-medium">
                          Màu sắc:{" "}
                          <span className="text-small-bold">
                            {orderItem.color}
                          </span>
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-medium">
                          Kích thước:{" "}
                          <span className="text-small-bold">
                            {orderItem.size}
                          </span>
                        </p>
                      )}
                      <p className="text-small-medium">
                        Giá đơn vị:{" "}
                        <span className="text-small-bold">{orderItem.product.price}</span>
                      </p>
                      <p className="text-small-medium">
                        Số lượng:{" "}
                        <span className="text-small-bold">{orderItem.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";