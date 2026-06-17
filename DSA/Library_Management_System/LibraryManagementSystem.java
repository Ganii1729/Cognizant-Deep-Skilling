
class Book {

    int bookId;
    String title;
    String author;

    Book(int bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

    void display() {
        System.out.println(
                "Book ID: " + bookId
                + ", Title: " + title
                + ", Author: " + author
        );
    }
}

public class LibraryManagementSystem {

    static int linearSearch(Book[] books, String title) {
        for (int i = 0; i < books.length; i++) {
            if (books[i].title.equalsIgnoreCase(title)) {
                return i;
            }
        }
        return -1;
    }

    static int binarySearch(Book[] books, String title) {
        int low = 0;
        int high = books.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            int result
                    = books[mid].title.compareToIgnoreCase(title);

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

        Book[] books = {
            new Book(1, "C Programming", "Dennis Ritchie"),
            new Book(2, "Data Structures", "Mark Allen"),
            new Book(3, "Java Programming", "James Gosling"),
            new Book(4, "Python Programming", "Guido van Rossum")
        };

        int index1
                = linearSearch(books, "Java Programming");

        System.out.println("Linear Search:");
        if (index1 != -1) {
            books[index1].display();
        } else {
            System.out.println("Book Not Found");
        }

        int index2
                = binarySearch(books, "Python Programming");

        System.out.println("\nBinary Search:");
        if (index2 != -1) {
            books[index2].display();
        } else {
            System.out.println("Book Not Found");
        }
    }
}
