import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCatgories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      setCategories(res.data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatgories();
  }, []);

  return categories;
}
