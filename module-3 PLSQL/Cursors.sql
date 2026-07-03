-- EXERCISE 1
DECLARE
    CURSOR c_stmt IS
        SELECT 
            a.AccountID,
            a.CustomerID,
            t.TransactionID,
            t.TransactionDate,
            t.Amount,
            t.TransactionType
        FROM Accounts a
        JOIN Transactions t ON a.AccountID = t.AccountID
        WHERE TO_CHAR(t.TransactionDate, 'MM-YYYY') = TO_CHAR(SYSDATE, 'MM-YYYY')
        ORDER BY a.AccountID;

BEGIN
    FOR rec IN c_stmt LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Account: ' || rec.AccountID ||
            ' | Customer: ' || rec.CustomerID ||
            ' | TxnID: ' || rec.TransactionID ||
            ' | Type: ' || rec.TransactionType ||
            ' | Amount: ' || rec.Amount ||
            ' | Date: ' || rec.TransactionDate
        );
    END LOOP;
END;
/

INSERT INTO Transactions VALUES (100000, 101, SYSDATE, 500, 'DEPOSIT');

-- EXERCISE 2
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_accounts IS
        SELECT AccountID, Balance
        FROM Accounts;

    v_fee NUMBER := 500;
BEGIN
    FOR rec IN c_accounts LOOP
        UPDATE Accounts
        SET Balance = Balance - v_fee,
            LastModified = SYSDATE
        WHERE AccountID = rec.AccountID;

        DBMS_OUTPUT.PUT_LINE(
            'Annual fee deducted from Account '
            || rec.AccountID
            || '. New Balance = '
            || (rec.Balance - v_fee)
        );
    END LOOP;

    COMMIT;
END;
/

-- EXERCISE 3
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_loans IS
        SELECT LoanID, LoanAmount
        FROM Loans;

    v_new_rate NUMBER;
BEGIN
    FOR rec IN c_loans LOOP

        -- Decide new interest rate
        IF rec.LoanAmount < 100000 THEN
            v_new_rate := 8;

        ELSIF rec.LoanAmount BETWEEN 100000 AND 500000 THEN
            v_new_rate := 10;

        ELSE
            v_new_rate := 12;
        END IF;

        -- Update loan table
        UPDATE Loans
        SET InterestRate = v_new_rate
        WHERE LoanID = rec.LoanID;

        DBMS_OUTPUT.PUT_LINE(
            'Loan ' || rec.LoanID ||
            ' updated to ' || v_new_rate || '%'
        );

    END LOOP;

    COMMIT;
END;
/