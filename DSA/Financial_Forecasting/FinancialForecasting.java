
public class FinancialForecasting {

    static double predictValue(double currentValue,
            double growthRate,
            int years) {

        if (years == 0) {
            return currentValue;
        }

        return predictValue(
                currentValue,
                growthRate,
                years - 1
        ) * (1 + growthRate);
    }

    public static void main(String[] args) {

        double currentValue = 10000;
        double growthRate = 0.10;
        int years = 5;

        double futureValue
                = predictValue(currentValue,
                        growthRate,
                        years);

        System.out.printf(
                "Predicted value after %d years = %.2f",
                years,
                futureValue
        );
    }
}
