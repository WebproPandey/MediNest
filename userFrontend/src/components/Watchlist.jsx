import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFromWatchlist,updateWatchlistQuantity,updateTotalAmount,} from "../redux/action/userCartActions";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Watchlist = () => {
  const dispatch = useDispatch();
  const  navigate  =  useNavigate()
  const { watchlist, totalAmount } = useSelector(
    (state) => state.userWatchlist
  );

  useEffect(() => {
    dispatch(updateTotalAmount());
  }, [watchlist, dispatch]);

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateWatchlistQuantity(id, newQty));
    dispatch(updateTotalAmount());
  };

  // Derived price breakdown
  const gst = totalAmount * 0.18;
  const delivery = totalAmount > 0 ? 0 : 0;
  const finalTotal = totalAmount + gst + delivery;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT - Products */}
          <div className="w-full md:w-2/3">
            <div className="h-[520px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {watchlist.map((product) => (
                  <div
                    key={product._id}
                    className="relative bg-white border rounded-xl p-4 shadow"
                  >
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      onClick={() => dispatch(removeFromWatchlist(product._id))}
                    >
                      <FaTimes />
                    </button>
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-32 object-contain mb-2"
                    />
                    <h3 className="text-sm font-semibold">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {product.subcategoryName}
                    </p>
                    <p className="text-green-600 font-bold text-sm mt-1">
                      ₹{product.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            product.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            product.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Summary */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Price Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total Products</span>
                <span>{watchlist.length}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Total Product Price</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              {/* <div className="flex justify-between mb-2">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div> */}

              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between  font-bold">
                <div className="flex  flex-col text-lg">
                 <span>Total Amount</span>
                 <span>₹{finalTotal.toFixed(2)}</span>
                </div>
                <button
                 onClick={() => navigate("/checkout")}
                className="px-6 bg-orange-100 text-orange-500 rounded-lg">
                  Buy Now
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
