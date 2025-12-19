import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Shop by Category</h2>

        <div className="row g-4">
          {categories.map((c) => (
            <div className="col-lg-4 col-md-6" key={c._id}>
              <div className="card shadow-sm border-0 h-100 category-card">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <Link
                    to={`/category/${c.slug}`}
                    className="btn btn-outline-primary px-4 py-2 fw-semibold"
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
