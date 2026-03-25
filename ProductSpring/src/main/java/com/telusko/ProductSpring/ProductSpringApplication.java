package com.telusko.ProductSpring;

import com.telusko.ProductSpring.entity.Product;
import com.telusko.ProductSpring.service.ProductService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class ProductSpringApplication {

    public static void main(String[] args) {

        ApplicationContext context = SpringApplication.run(ProductSpringApplication.class, args);

        ProductService service = context.getBean(ProductService.class);

        List<Product> products = service.getAllProducts();
        for (Product p : products) {
            System.out.println(p);
        }
    }
}

