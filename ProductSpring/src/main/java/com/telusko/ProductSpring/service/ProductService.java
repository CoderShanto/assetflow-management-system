package com.telusko.ProductSpring.service;

import com.telusko.ProductSpring.entity.Product;
import com.telusko.ProductSpring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product addProduct(Product product) {
        return repository.save(product);
    }

    public Product updateProduct(int id, Product updatedProduct) {
        return repository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setType(updatedProduct.getType());
            product.setPlace(updatedProduct.getPlace());
            product.setWarranty(updatedProduct.getWarranty());
            return repository.save(product);
        }).orElse(null);
    }

    public boolean deleteProduct(int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}