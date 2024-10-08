export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  mainCategory: string; // ID of the main category
  category: string;     // ID of the category
  subCategory: string;  // ID of the subcategory
  // Add any other fields you need
};