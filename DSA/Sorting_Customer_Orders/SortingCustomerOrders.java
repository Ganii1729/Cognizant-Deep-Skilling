
class Order {

    int oid;
    String custName;
    double totalPrice;

    Order(int oid, String custName, double totalPrice) {
        this.oid = oid;
        this.custName = custName;
        this.totalPrice = totalPrice;
    }

    void display() {
        System.out.println("Order ID " + oid + " customeer Name " + custName + " totalPrice " + totalPrice);
    }
}

public class SortingCustomerOrders {

    static void bubbleSort(Order[] orders) {
        int n = orders.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n - i - 1; j++) {
                if (orders[j].totalPrice > orders[j + 1].totalPrice) {
                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;
                }
            }
        }
    }

    static int partition(Order[] orders, int low, int high) {
        double pivot = orders[high].totalPrice;
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (orders[j].totalPrice < pivot) {
                i++;

                Order temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }

        Order temp = orders[i + 1];
        orders[i + 1] = orders[high];
        orders[high] = temp;

        return i + 1;
    }

    static void quickSort(Order[] orders, int low, int high) {
        if (low < high) {
            int pi = partition(orders, low, high);

            quickSort(orders, low, pi - 1);
            quickSort(orders, pi + 1, high);
        }
    }

    static void display(Order[] orders) {
        for (Order order : orders) {
            order.display();
        }
    }

    public static void main(String[] args) {
        Order[] orders = {new Order(1, "One", 5000), new Order(2, "Two", 10000), new Order(3, "Three", 15000), new Order(2, "Four", 2500)};
        System.out.println("Before Sorting:");
        display(orders);
        quickSort(orders, 0, orders.length - 1);
        System.out.println("Afer:");
        display(orders);
        bubbleSort(orders);
    }
}
