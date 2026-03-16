import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Customers
export const getCustomers = () => api.get('/customers');
export const getCustomer = (id) => api.get(`/customers/${id}`);
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getProductPages = (id) => api.get(`/products/${id}/pages`);
export const addProductPage = (id, data) => api.post(`/products/${id}/pages`, data);
export const deleteProductPage = (id) => api.delete(`/products/pages/${id}`);

// Company Settings
export const getCompanySettings = () => api.get('/settings');
export const updateCompanySettings = (data) => api.put('/settings', data);

// CMS - Services
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// CMS - Team
export const getTeam = () => api.get('/team');
export const createTeamMember = (data) => api.post('/team', data);
export const updateTeamMember = (id, data) => api.put(`/team/${id}`, data);
export const deleteTeamMember = (id) => api.delete(`/team/${id}`);

// CMS - Testimonials
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// CMS - FAQs
export const getFaqs = () => api.get('/faqs');
export const createFaq = (data) => api.post('/faqs', data);
export const updateFaq = (id, data) => api.put(`/faqs/${id}`, data);
export const deleteFaq = (id) => api.delete(`/faqs/${id}`);

// CMS - Inquiries
export const getInquiries = () => api.get('/inquiries');
export const createInquiry = (data) => api.post('/inquiries', data);
export const markInquiryRead = (id) => api.put(`/inquiries/${id}/read`);

export default api;
