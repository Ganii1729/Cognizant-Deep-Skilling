
public class BuilderTest {

    public static void main(String[] args) {

        Computer gamingPC = new Computer.Builder()
                .setCpu("Intel i9")
                .setRam(32)
                .setStorage(1000)
                .build();

        gamingPC.display();

        System.out.println();

        Computer officePC = new Computer.Builder()
                .setCpu("Intel i5")
                .setRam(16)
                .setStorage(512)
                .build();

        officePC.display();
    }
}
