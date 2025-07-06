import React, { useState, useEffect } from "react";
import { getCategories } from "../../api/categories";
import { CategoryList } from "../../models/category.model";
import "./Sidebar.css";

interface SidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}: SidebarProps) {
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange?.(categoryName);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="search-section">
          <h3>Search Books</h3>
          <input
            type="text"
            placeholder="Search by title, author..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="categories-section">
          <h3>Categories</h3>
          {isLoading ? (
            <div className="loading">Loading categories...</div>
          ) : (
            <div className="category-list">
              <button
                className={`category-item ${!selectedCategory ? "active" : ""}`}
                onClick={() => handleCategoryClick("")}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-item ${
                    selectedCategory === category.name ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filters-section">
          <h3>Filters</h3>
          <div className="filter-group">
            <label className="filter-label">
              <input type="checkbox" className="filter-checkbox" />
              New Books (Last Month)
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
