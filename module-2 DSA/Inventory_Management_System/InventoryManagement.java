
import java.util.HashMap;

class Product {

    int pid;
    String pname;
    double price;
    int quanitity;

    Product(int pid, String pname, double price, int quanitity) {
        this.pid = pid;
        this.pname = pname;
        this.price = price;
        this.quanitity = quanitity;
    }

    void display() {
        System.out.println("Product ID: " + pid);
        System.out.println("Product Name: " + pname);
        System.out.println("Price: " + price);
        System.out.println("Quantity: " + quanitity);
    }
}

class Inventory {

    HashMap<Integer, Product> products = new HashMap<>();

    void addProduct(Product product) {
        products.put(product.pid, product);
    }

    void updateProduct(int pid, double price, int quantity) {
        if (products.containsKey(pid)) {
            Product product = products.get(pid);
            product.price = price;
            product.quanitity = quantity;
        } else {
            System.out.println("Product not found.");
        }
    }

    void deleteProduct(int pid) {
        if (products.containsKey(pid)) {
            products.remove(pid);
        } else {
            System.out.println("Product not found.");
        }
    }

    void displayProducts() {
        for (Product product : products.values()) {
            product.display();
            System.out.println();
        }
    }
}

public class InventoryManagement {

    public static void main(String[] args) {
        Inventory inventory = new Inventory();

        Product p1 = new Product(1, "Laptop", 999.99, 10);
        Product p2 = new Product(2, "Smartphone", 499.99, 20);

        inventory.addProduct(p1);
        inventory.addProduct(p2);

        System.out.println("Inventory after adding products:");
        inventory.displayProducts();

        inventory.updateProduct(1, 899.99, 15);
        System.out.println("Inventory after updating product:");
        inventory.displayProducts();

        inventory.deleteProduct(2);
        System.out.println("Inventory after deleting product:");
        inventory.displayProducts();
    }
}
