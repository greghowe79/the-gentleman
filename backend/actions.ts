import type { SellerAmountMap } from './types/types';

const calculateTotalAmountBySeller = (originalArray: any[]): { seller_id: string; total_amount: number }[] => {
  const sellerAmountMap: SellerAmountMap = {};

  originalArray.forEach((item) => {
    if (sellerAmountMap[item.seller_id]) {
      sellerAmountMap[item.seller_id] += item.amount;
    } else {
      sellerAmountMap[item.seller_id] = item.amount;
    }
  });

  const newArray = Object.keys(sellerAmountMap).map((sellerId) => ({
    seller_id: sellerId,
    total_amount: sellerAmountMap[sellerId],
  }));

  return newArray;
};

export { calculateTotalAmountBySeller };
