-- EXERCISE 1
SELECT AccountID,
       AccountType,
       Balance
FROM Accounts;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType = 'Savings';

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Monthly interest processed successfully.');
END;
/

BEGIN
    ProcessMonthlyInterest;
END;
/

-- EXERCISE 2
DESC Employees;

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_percent IN NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_percent / 100)
    WHERE Department = p_department;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Bonus Updated Successfully'
    );
END;
/

BEGIN
    UpdateEmployeeBonus('IT',10);
END;
/

SELECT EmployeeID, Name, Department, Salary
FROM Employees;

-- EXERCISE 3
CREATE OR REPLACE PROCEDURE TransferEmployee(
    p_empid IN NUMBER,
    p_newdept IN VARCHAR2
)
IS
    v_empid NUMBER;
BEGIN
    SELECT EmployeeID
    INTO v_empid
    FROM Employees
    WHERE EmployeeID = p_empid;

    UPDATE Employees
    SET Department = p_newdept
    WHERE EmployeeID = p_empid;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Employee transferred successfully.'
    );

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE(
            'Employee does not exist.'
        );

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE(
            'Error: ' || SQLERRM
        );
END;
/

SELECT EmployeeID,
       Name,
       Department
FROM Employees;

BEGIN
    TransferEmployee(1,'NOOO');
END;
/

BEGIN
    TransferEmployee(100,'HR');
END;
/