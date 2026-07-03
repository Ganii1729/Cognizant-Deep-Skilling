
public class StripeAdapter implements PaymentProcessor {

    @SuppressWarnings("FieldMayBeFinal")
    private StripeGateway stripeGateway;

    public StripeAdapter(StripeGateway stripeGateway) {
        this.stripeGateway = stripeGateway;
    }

    @Override
    public void processPayment(double amount) {
        stripeGateway.payAmount(amount);
    }
}
