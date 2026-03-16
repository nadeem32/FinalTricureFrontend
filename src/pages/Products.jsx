import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct, getProductPages, addProductPage, deleteProductPage } from '../services/api';
import { TrashIcon, PlusIcon, TagIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', category: '', status: 'Active', price: '', imageUrl: '' });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Demo Pages State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [demoPages, setDemoPages] = useState([]);
    const [newDemoPage, setNewDemoPage] = useState({ imageUrl: '', caption: '', sortOrder: 0 });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setNewProduct({ name: '', description: '', category: '', status: 'Active', price: '', imageUrl: '' });
            setShowForm(false);
            loadProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Demo Page Handlers
    const handleManageDemo = async (product) => {
        setSelectedProduct(product);
        try {
            const res = await getProductPages(product.id);
            setDemoPages(res.data);
        } catch (error) {
            console.error('Error loading demo pages:', error);
        }
    };

    const handleAddDemoPage = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;
        try {
            await addProductPage(selectedProduct.id, newDemoPage);
            setNewDemoPage({ imageUrl: '', caption: '', sortOrder: demoPages.length + 1 });
            const res = await getProductPages(selectedProduct.id);
            setDemoPages(res.data);
        } catch (error) {
            console.error('Error adding demo page:', error);
        }
    };

    const handleDeleteDemoPage = async (pageId) => {
        if (window.confirm('Delete this demo page?')) {
            try {
                await deleteProductPage(pageId);
                const res = await getProductPages(selectedProduct.id);
                setDemoPages(res.data);
            } catch (error) {
                console.error('Error deleting demo page:', error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Product Catalog</h1>
                    <p className="text-slate-500 mt-1">Manage your medical solutions</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/30"
                >
                    {showForm ? 'Cancel' : <><PlusIcon className="w-5 h-5 mr-2" /> Add Product</>}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel rounded-2xl p-8 mb-8 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6 text-slate-800">New Product Details</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                            <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                            <input type="number" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent">
                                <option>Active</option>
                                <option>Discontinued</option>
                                <option>In Development</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input type="text" placeholder="https://example.com/image.jpg" value={newProduct.imageUrl || ''} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows={3} className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent" />
                        </div>
                        <div className="sm:col-span-2 pt-4">
                            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-accent to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                                Save Product
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
                        <div className="h-40 bg-slate-100 relative overflow-hidden group">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                    <TagIcon className="w-12 h-12 text-slate-300" />
                                </div>
                            )}
                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10 ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                {product.status}
                            </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                                <span className="text-lg font-bold text-accent">${product.price}</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-4 flex-1">{product.description}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                <button onClick={() => handleManageDemo(product)} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                    <PhotoIcon className="w-4 h-4 mr-1" /> Manage Demo
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 transition-colors text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Demo Pages Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-slate-900">Demo Pages: {selectedProduct.name}</h2>
                            <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            {/* Add New Page Form */}
                            <form onSubmit={handleAddDemoPage} className="mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <h3 className="font-semibold text-slate-700 mb-4">Add New Page</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            required
                                            value={newDemoPage.imageUrl}
                                            onChange={(e) => setNewDemoPage({ ...newDemoPage, imageUrl: e.target.value })}
                                            className="w-full rounded-lg border-slate-300 text-sm"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Caption (Optional)"
                                        value={newDemoPage.caption}
                                        onChange={(e) => setNewDemoPage({ ...newDemoPage, caption: e.target.value })}
                                        className="w-full rounded-lg border-slate-300 text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Sort Order"
                                        value={newDemoPage.sortOrder}
                                        onChange={(e) => setNewDemoPage({ ...newDemoPage, sortOrder: parseInt(e.target.value) })}
                                        className="w-full rounded-lg border-slate-300 text-sm"
                                    />
                                </div>
                                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                    Add Page
                                </button>
                            </form>

                            {/* Existing Pages List */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {demoPages.map((page) => (
                                    <div key={page.id} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white">
                                        <div className="aspect-video bg-slate-100">
                                            <img src={page.imageUrl} alt={page.caption} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-2 text-xs text-slate-600 truncate border-t border-slate-100">
                                            {page.caption || 'No caption'}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteDemoPage(page.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-full">
                                            #{page.sortOrder}
                                        </div>
                                    </div>
                                ))}
                                {demoPages.length === 0 && (
                                    <div className="col-span-full text-center py-8 text-slate-400 text-sm">
                                        No demo pages added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg">No products found. Add your first medical solution!</p>
                </div>
            )}
        </div>
    );
};

export default Products;
