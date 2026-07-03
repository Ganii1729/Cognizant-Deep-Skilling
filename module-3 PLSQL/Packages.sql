-- EXERCISE 1
CREATE OR REPLACE PACKAGE CustomerManagement AS

    PROCEDURE AddCustomer(
        p_customerid NUMBER,
        p_name VARCHAR2
    );

    PROCEDURE UpdateCustomer(
        p_customerid NUMBER,
        p_name VARCHAR2
    );

    FUNCTION GetCustomerBalance(
        p_customerid NUMBER
    ) RETURN NUMBER;

END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS

    PROCEDURE AddCustomer(
        p_customerid NUMBER,
        p_name VARCHAR2
    )
    IS
    BEGIN
        INSERT INTO Customers(CustomerID, NAME)
        VALUES (p_customerid, p_name);
    END;

    PROCEDURE UpdateCustomer(
        p_customerid NUMBER,
        p_name VARCHAR2
    )
    IS
    BEGIN
        UPDATE Customers
        SET NAME = p_name,
            LastModified = SYSDATE
        WHERE CustomerID = p_customerid;
    END;

    FUNCTION GetCustomerBalance(
        p_customerid NUMBER
    ) RETURN NUMBER
    IS
        v_balance NUMBER := 0;
    BEGIN
        SELECT BALANCE
        INTO v_balance
        FROM Customers
        WHERE CustomerID = p_customerid;

        RETURN v_balance;
    END;

END CustomerManagement;
/

BEGIN
    CustomerManagement.AddCustomer(18, 'John');
END;
/

select * from Customers;

-- EXERCISE 2
CREATE OR REPLACE PACKAGE EmployeeManagement AS

    PROCEDURE HireEmployee(
        p_empid NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_dept VARCHAR2
    );

    PROCEDURE UpdateEmployee(
        p_empid NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_dept VARCHAR2
    );

    FUNCTION GetAnnualSalary(
        p_empid NUMBER
    ) RETURN NUMBER;

END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS

    -- Hire Employee
    PROCEDURE HireEmployee(
        p_empid NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_dept VARCHAR2
    )
    IS
    BEGIN
        INSERT INTO Employees(EmployeeID, Name, Salary, Department)
        VALUES (p_empid, p_name, p_salary, p_dept);
    END;

    -- Update Employee
    PROCEDURE UpdateEmployee(
        p_empid NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_dept VARCHAR2
    )
    IS
    BEGIN
        UPDATE Employees
        SET Name = p_name,
            Salary = p_salary,
            Department = p_dept
        WHERE EmployeeID = p_empid;
    END;

    -- Annual Salary Function
    FUNCTION GetAnnualSalary(
        p_empid NUMBER
    ) RETURN NUMBER
    IS
        v_salary NUMBER := 0;
    BEGIN
        SELECT Salary
        INTO v_salary
        FROM Employees
        WHERE EmployeeID = p_empid;

        RETURN v_salary * 12;
    END;

END EmployeeManagement;
/

BEGIN
    EmployeeManagement.HireEmployee(15, 'Alice', 50000, 'IT');
END;
/

-- EXERCISE 3
CREATE OR REPLACE PACKAGE AccountOperations AS

    PROCEDURE OpenAccount(
        p_accountid NUMBER,
        p_customerid NUMBER,
        p_type VARCHAR2,
        p_balance NUMBER
    );

    PROCEDURE CloseAccount(
        p_accountid NUMBER
    );

    FUNCTION GetTotalBalance(
        p_customerid NUMBER
    ) RETURN NUMBER;

END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS

    PROCEDURE OpenAccount(
        p_accountid NUMBER,
        p_customerid NUMBER,
        p_type VARCHAR2,
        p_balance NUMBER
    )
    IS
    BEGIN
        INSERT INTO Accounts(AccountID, CustomerID, AccountType, Balance, LastModified)
        VALUES (p_accountid, p_customerid, p_type, p_balance, SYSDATE);
    END;

    PROCEDURE CloseAccount(
        p_accountid NUMBER
    )
    IS
    BEGIN
        DELETE FROM Accounts
        WHERE AccountID = p_accountid;
    END;

    FUNCTION GetTotalBalance(
        p_customerid NUMBER
    ) RETURN NUMBER
    IS
        v_total NUMBER := 0;
    BEGIN
        SELECT SUM(Balance)
        INTO v_total
        FROM Accounts
        WHERE CustomerID = p_customerid;

        RETURN NVL(v_total, 0);
    END;

END AccountOperations;
/

BEGIN
    AccountOperations.OpenAccount(155, 1, 'SAVINGS', 5000);
END;
/

SELECT AccountOperations.GetTotalBalance(1)
FROM dual;