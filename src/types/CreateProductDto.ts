type CreateProductDto = {
  title: string;
  link: string;
  categoryID: number;
  subcategoryID: number;
  tags: string;
  value: number;
  imgLink: string;
};

export default CreateProductDto;
