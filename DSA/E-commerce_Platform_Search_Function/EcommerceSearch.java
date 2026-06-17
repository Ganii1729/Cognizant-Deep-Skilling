
class Product {

    int productId;
    String productName;
    String category;

    Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    void display() {
        System.out.println(
                productId + " " + productName + " " + category
        );
    }
}

public class EcommerceSearch {

    static int linearSearch(Product[] products, String name) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productName.equalsIgnoreCase(name)) {
                return i;
            }
        }
        return -1;
    }

    static int binarySearch(Product[] products, String name) {
        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            int result
                    = products[mid].productName.compareToIgnoreCase(name);

            if (result == 0) {
                return mid;
            } else if (result < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {

        Product[] products = {
            new Product(1, "Keyboard", "Electronics"),
            new Product(2, "Laptop", "Electronics"),
            new Product(3, "Mouse", "Electronics"),
            new Product(4, "Phone", "Electronics")
        };

        int index1 = linearSearch(products, "Mouse");

        if (index1 != -1) {
            products[index1].display();
        } else {
            System.out.println("Product not found");
        }

        int index2 = binarySearch(products, "Phone");

        if (index2 != -1) {
            products[index2].display();
        } else {
            System.out.println("Product not found");
        }
    }
}
