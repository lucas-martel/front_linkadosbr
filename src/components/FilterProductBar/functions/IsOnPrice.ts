const IsOnPrice = (prices: number[], price: number): boolean => {
  return prices[0] < price && price < prices[1];
};

export default IsOnPrice;
