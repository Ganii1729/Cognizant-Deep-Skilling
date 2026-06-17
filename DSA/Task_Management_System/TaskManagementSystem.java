
class Task {

    int taskId;
    String taskName;
    String status;

    Task(int taskId, String taskName, String status) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.status = status;
    }
}

class Node {

    Task task;
    Node next;

    Node(Task task) {
        this.task = task;
        this.next = null;
    }
}

class TaskLinkedList {

    Node head;

    void addTask(Task task) {
        Node newNode = new Node(task);

        if (head == null) {
            head = newNode;
            return;
        }

        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }

        temp.next = newNode;
    }

    void searchTask(int id) {
        Node temp = head;

        while (temp != null) {
            if (temp.task.taskId == id) {
                System.out.println("Task Found");
                System.out.println("ID: " + temp.task.taskId);
                System.out.println("Name: " + temp.task.taskName);
                System.out.println("Status: " + temp.task.status);
                return;
            }
            temp = temp.next;
        }

        System.out.println("Task Not Found");
    }

    void displayTasks() {
        Node temp = head;

        while (temp != null) {
            System.out.println(
                    "ID: " + temp.task.taskId
                    + ", Name: " + temp.task.taskName
                    + ", Status: " + temp.task.status
            );
            temp = temp.next;
        }
    }

    void deleteTask(int id) {

        if (head == null) {
            return;
        }

        if (head.task.taskId == id) {
            head = head.next;
            System.out.println("Task Deleted");
            return;
        }

        Node temp = head;

        while (temp.next != null
                && temp.next.task.taskId != id) {
            temp = temp.next;
        }

        if (temp.next == null) {
            System.out.println("Task Not Found");
        } else {
            temp.next = temp.next.next;
            System.out.println("Task Deleted");
        }
    }
}

public class TaskManagementSystem {

    public static void main(String[] args) {

        TaskLinkedList list = new TaskLinkedList();

        list.addTask(new Task(1, "Coding", "Pending"));
        list.addTask(new Task(2, "Testing", "Completed"));
        list.addTask(new Task(3, "Documentation", "Pending"));

        System.out.println("All Tasks:");
        list.displayTasks();

        System.out.println("\nSearching Task ID 2:");
        list.searchTask(2);

        System.out.println("\nDeleting Task ID 2:");
        list.deleteTask(2);

        System.out.println("\nTasks After Deletion:");
        list.displayTasks();
    }
}
