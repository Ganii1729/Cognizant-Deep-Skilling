
public class PayPalAdapter implements PaymentProcessor {

    @SuppressWarnings("FieldMayBeFinal")
    private PayPalGateway payPalGateway;

    public PayPalAdapter(PayPalGateway payPalGateway) {
        this.payPalGateway = payPalGateway;
    }

    @Override
    public void processPayment(double amount) {
        payPalGateway.makePayment(amount);
    }
}
