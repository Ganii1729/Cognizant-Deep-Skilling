
public class LightOffCommand implements Command {

    @SuppressWarnings("FieldMayBeFinal")
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}
