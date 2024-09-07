import TPrice from "./TPrice";

type TProduct = {
  id: string;
  categoryID: number;
  subcategoryID: number;
  tags: string;
  title: string;
  link: string;
  imgLink: string;
  Price: TPrice[];
};

export default TProduct;
