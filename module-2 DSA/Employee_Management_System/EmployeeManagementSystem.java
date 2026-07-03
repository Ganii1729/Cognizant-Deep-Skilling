
class Employee {

    int employeeId;
    String name;
    String position;
    double salary;

    Employee(int employeeId, String name,
            String position, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    void display() {
        System.out.println(
                "ID: " + employeeId
                + ", Name: " + name
                + ", Position: " + position
                + ", Salary: " + salary
        );
    }
}

public class EmployeeManagementSystem {

    static Employee[] employees = new Employee[10];
    static int count = 0;

    static void addEmployee(Employee emp) {
        if (count < employees.length) {
            employees[count++] = emp;
            System.out.println("Employee Added");
        } else {
            System.out.println("Array is Full");
        }
    }

    static void searchEmployee(int id) {
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == id) {
                System.out.println("Employee Found:");
                employees[i].display();
                return;
            }
        }
        System.out.println("Employee Not Found");
    }

    static void displayEmployees() {
        for (int i = 0; i < count; i++) {
            employees[i].display();
        }
    }

    static void deleteEmployee(int id) {
        int index = -1;

        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == id) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            System.out.println("Employee Not Found");
            return;
        }

        for (int i = index; i < count - 1; i++) {
            employees[i] = employees[i + 1];
        }

        employees[count - 1] = null;
        count--;

        System.out.println("Employee Deleted");
    }

    public static void main(String[] args) {

        addEmployee(new Employee(1, "Rahul", "Manager", 60000));
        addEmployee(new Employee(2, "Priya", "Developer", 50000));
        addEmployee(new Employee(3, "Amit", "Tester", 40000));

        System.out.println("\nAll Employees:");
        displayEmployees();

        System.out.println("\nSearching Employee ID 2:");
        searchEmployee(2);

        System.out.println("\nDeleting Employee ID 2:");
        deleteEmployee(2);

        System.out.println("\nEmployees After Deletion:");
        displayEmployees();
    }
}
