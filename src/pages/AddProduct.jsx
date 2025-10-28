import ProductForm from "../components/ProductForm";

export default function AddProduct({ addProduct }) {
  async function handleCreate(product) {
    const res = await fetch("http://localhost:3000/farmProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to save product");
    const saved = await res.json();
    addProduct(saved);
    return saved;
  }

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Farm Product</h1>
      <ProductForm onSubmit={handleCreate} submitLabel="Add Product" />
    </div>
  );
}
