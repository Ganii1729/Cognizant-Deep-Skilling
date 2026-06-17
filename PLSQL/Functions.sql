-- -EXERCISE 1
CREATE OR REPLACE FUNCTION CalculateAge(
    p_dob IN DATE
)
RETURN NUMBER
IS
    v_age NUMBER;
BEGIN
    v_age := FLOOR(
                MONTHS_BETWEEN(
                    SYSDATE,
                    p_dob
                ) / 12
             );

    RETURN v_age;
END;
/

SELECT CustomerID,
       Name,
       CalculateAge(DOB) AS Age
FROM Customers;

-- EXERCISE 2
CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(
    p_loan_amount IN NUMBER,
    p_interest_rate IN NUMBER,
    p_years IN NUMBER
)
RETURN NUMBER
IS
    v_interest NUMBER;
    v_total NUMBER;
    v_monthly NUMBER;
BEGIN
    v_interest :=
        p_loan_amount *
        p_interest_rate *
        p_years / 100;

    v_total :=
        p_loan_amount +
        v_interest;

    v_monthly :=
        v_total /
        (12 * p_years);

    RETURN v_monthly;
END;
/

SELECT CalculateMonthlyInstallment(
           120000,
           10,
           2
       ) AS EMI
FROM dual;

SET SERVEROUTPUT ON;

DECLARE
    v_emi NUMBER;
BEGIN
    v_emi :=
        CalculateMonthlyInstallment(
            120000,
            10,
            2
        );

    DBMS_OUTPUT.PUT_LINE(
        'Monthly Installment = ' ||
        v_emi
    );
END;
/

-- EXERCISE 3
CREATE OR REPLACE FUNCTION HasSufficientBalance(
    p_accountid IN NUMBER,
    p_amount IN NUMBER
)
RETURN BOOLEAN
IS
    v_balance NUMBER;
BEGIN
    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_accountid;

    IF v_balance >= p_amount THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
END;
/

SET SERVEROUTPUT ON;

DECLARE
    v_result BOOLEAN;
BEGIN
    v_result :=
        HasSufficientBalance(
            101,
            500
        );

    IF v_result THEN
        DBMS_OUTPUT.PUT_LINE(
            'Sufficient Balance'
        );
    ELSE
        DBMS_OUTPUT.PUT_LINE(
            'Insufficient Balance'
        );
    END IF;
END;
/