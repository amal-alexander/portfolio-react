import { useState, useRef } from "react";

const blogs = [
    { id: 1, title: "How to Improve SEO Rankings", category: "SEO", description: "Learn the best strategies to rank higher on Google.", image: "/images/seo-blog.jpg" },
    { id: 2, title: "React vs Next.js: Which One to Choose?", category: "Development", description: "A detailed comparison of React and Next.js for web apps.", image: "/images/react-next.jpg" },
    { id: 3, title: "10 Tips for Web Performance Optimization", category: "Performance", description: "Speed up your website with these performance tricks.", image: "/images/performance-tips.jpg" }
];

const categories = ["All", "SEO", "Development", "Performance"];

function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const blogContainerRef = useRef(null); // Ref for blog grid

    const filteredBlogs = selectedCategory === "All"
        ? blogs
        : blogs.filter((blog) => blog.category === selectedCategory);

    // Scroll left
    const scrollLeft = () => {
        if (blogContainerRef.current) {
            blogContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll right
    const scrollRight = () => {
        if (blogContainerRef.current) {
            blogContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8 relative">
            <h1 className="text-4xl font-bold text-center mb-6">Blog Posts</h1>
            
            {/* Category Filters */}
            <div className="flex justify-center gap-4 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded font-semibold transition ${
                            selectedCategory === category 
                                ? "bg-purple-600 text-white shadow-lg scale-105" 
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Arrows */}
            <button 
                onClick={scrollLeft} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition"
            >
                ←
            </button>

            {/* Blog Grid with Scroll */}
            <div 
                ref={blogContainerRef} 
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-2"
                style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
            >
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div 
                            key={blog.id} 
                            className="bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl cursor-pointer min-w-[300px]"
                            onClick={() => window.location.href = `/blog/${blog.id}`}
                        >
                            <img loading="lazy" src={blog.image} alt={blog.title} className="rounded-md mb-4" />
                            <h2 className="text-2xl font-semibold">{blog.title}</h2>
                            <p className="text-gray-400 mt-2">{blog.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-6">No blogs found in this category.</p>
                )}
            </div>

            {/* Right Arrow */}
            <button 
                onClick={scrollRight} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition"
            >
                →
            </button>
        </div>
    );
}

export default BlogPage;
