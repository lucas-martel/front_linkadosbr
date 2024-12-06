import TProduct from "@/types/TProduct";
import TUrlProductParams from "@/types/TUrlProductParams";
import { useEffect, useState } from "react";

interface Props {
  itensPerPage: number;
  allProducts: TProduct[];
}

const usePagination = (props: Props) => {
  const [countPagination, setCountPagination] = useState(
    Math.ceil(props.allProducts.length / props.itensPerPage)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    console.log(
      "produtos renderizados na primeira interacao: ",
      props.allProducts
    );
  }, []);

  useEffect(() => {
    setCountPagination(
      Math.ceil(props.allProducts.length / props.itensPerPage)
    );
    setCurrentPage(1);
    onChangeCurrentPage(null, 1);
  }, [props.allProducts, props.itensPerPage]);

  const onChangeCurrentPage = (event: any, page: number) => {
    if (!products) {
      return;
    }
    setCurrentPage(page);
    const startIndex = (page - 1) * props.itensPerPage;
    const endIndex = startIndex + props.itensPerPage;
    setProducts(props.allProducts.slice(startIndex, endIndex));
  };

  return {
    countPagination,
    currentPage,
    products,
    onChangeCurrentPage,
  };
};

export default usePagination;
