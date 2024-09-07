import { TypeProduct } from "@/types/TypesDataBase";
import { useEffect, useState } from "react";

interface Props {
  itensPerPage: number;
  allProducts: TypeProduct[];
}

const usePagination = (props: Props) => {
  const [countPagination, setCountPagination] = useState(
    Math.ceil(props.allProducts.length / props.itensPerPage)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<TypeProduct[]>([]);

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
