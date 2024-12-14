import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { fetchPackages } from "../services/api";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [title, setTitle] = useState(""); 

  useEffect(() => {
    const fetchPackagesDetails = async () => {
      try {
        const { data } = await fetchPackages();
        setPackages(data);
        setFilteredPackages(data);
      } catch (err) {
        console.error("Error fetching packages", err);
      }
    };
    fetchPackagesDetails();
  }, []);

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const filterPackages = () => {
    let filtered = packages;

    if (priceRange) {
      filtered = filtered.filter((pkg) => {
        const price = pkg.price;
        if (priceRange === "low") return price < 1000;
        if (priceRange === "medium") return price >= 1000 && price <= 5000;
        if (priceRange === "high") return price > 5000;
        return true;
      });
    }

    if (title) {
      filtered = filtered.filter((pkg) => {
      
        const pkgTitle = pkg.title ? pkg.title : "";
        return pkgTitle.toLowerCase().includes(title.toLowerCase());
      });
    }

    setFilteredPackages(filtered);
  };

  useEffect(() => {
    filterPackages(); 
  }, [priceRange, title]);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Explore Our Amazing Packages
      </h1>

      {/* Filter UI */}
      <div className="flex justify-between gap-6 mb-6">
        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={handlePriceChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="low">Under $1000</option>
            <option value="medium">$1000 - $5000</option>
            <option value="high">Above $5000</option>
          </select>
        </div>

        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Search by title"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg._id} packageData={pkg} />
        ))}
      </div>
    </div>
  );
};

export default Home;
