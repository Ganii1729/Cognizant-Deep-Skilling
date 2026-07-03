-- EXERCISE 1
CREATE OR REPLACE TRIGGER UpdateCustomerLastModified
BEFORE UPDATE ON Customers
FOR EACH ROW
BEGIN
    :NEW.LastModified := SYSDATE;
END;
/

SELECT * FROM Customers;

UPDATE Customers
SET Name = 'New Name'
WHERE CustomerID = 1;

commit;

SELECT CustomerID, Name, LastModified
FROM Customers
WHERE CustomerID = 1;

-- EXERCISE 2
CREATE OR REPLACE TRIGGER LogTransaction
AFTER INSERT ON Transactions
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (LogID, TransactionID, Action, LogDate)
    VALUES (AuditLog_SEQ.NEXTVAL, :NEW.TransactionID, 'INSERT', SYSDATE);
END;
/

INSERT INTO Transactions (TransactionID, ACCOUNTID,TransactionDate, Amount, TransactionType)
VALUES (12, 101,SYSDATE, 5000, 'Deposit');
commit;

SELECT * FROM Transactions;

SELECT * FROM AuditLog;

-- EXERCISE 3
CREATE OR REPLACE TRIGGER CheckTransactionRules
BEFORE INSERT ON Transactions
FOR EACH ROW
DECLARE
    v_balance NUMBER;
BEGIN
    -- Get account balance
    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = :NEW.AccountID;

    IF UPPER(:NEW.TransactionType) = 'DEPOSIT' THEN
        IF :NEW.Amount <= 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Deposit must be greater than 0');
        END IF;
    END IF;

    IF UPPER(:NEW.TransactionType) = 'WITHDRAW' THEN
        IF :NEW.Amount > v_balance THEN
            RAISE_APPLICATION_ERROR(-20002, 'Insufficient balance');
        END IF;
    END IF;

END;
/

INSERT INTO Transactions
VALUES (14, 101, SYSDATE, 500, 'DEPOSIT');