-- EXERCISE 1
create or replace procedure SafeTransferFunds(
    p_from_acc in number,
    p_to_acc in number,
    p_amount in number
)
is 
    v_balance number;
begin
    select balance
    into v_balance
    from accounts
    where AccountID = p_from_acc;

    if v_balance < p_amount then
        RAISE_APPLICATION_ERROR(
            -20001,
            'Balance no Sufficient'
        );
    end if;

    UPDATE Accounts
    SET Balance = Balance - p_amount
    WHERE AccountID = p_from_acc;

    UPDATE Accounts
    SET Balance = Balance + p_amount
    WHERE AccountID = p_to_acc;

    commit;

    dbms_output.put_line('Sucess');
exception
    when others then    
        rollback;
        dbms_output.put_line('Error: ' || SQLERRM
        );
end;
/

SELECT AccountID, Balance
FROM Accounts
WHERE AccountID IN (105,106);

begin
    SafeTransferFunds(105,106,25000);
end;
/

-- EXERCISE 2
create or replace procedure UpdateSalary(
    p_empid in number,
    p_salary in number
)
is
    v_empid number;
begin
    select EmployeeID
    into v_empid
    from Employees
    where EmployeeID = p_empid;

    update Employees
    set Salary = p_salary
    where EmployeeID = p_empid;

    commit;

    dbms_output.put_line(
        'Salary Update Sucess'
    );
exception
    when NO_DATA_FOUND then
        dbms_output.put_line('Employee Not there');
    when others then
        dbms_output.put_line('Error' || SQLERRM);
end;
/

BEGIN
    UpdateSalary(2,70000);
END;
/

BEGIN
    UpdateSalary(100,70000);
END;
/

SELECT EmployeeID,
       Name,
       Salary
FROM Employees
WHERE EmployeeID = 2;

-- EXERCISE 3
CREATE OR REPLACE PROCEDURE AddNewCustomer(
    p_customerid IN NUMBER,
    p_name IN VARCHAR2,
    p_dob IN DATE,
    p_balance IN NUMBER
)
IS
BEGIN
    INSERT INTO Customers
    VALUES(
        p_customerid,
        p_name,
        p_dob,
        p_balance,
        SYSDATE,
        NULL
    );

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Customer Added Successfully'
    );

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE(
            'Customer ID already exists.'
        );

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE(
            'Error: ' || SQLERRM
        );
END;
/

BEGIN
    AddNewCustomer(
        11,
        'Rahul',
        TO_DATE('2000-05-10','YYYY-MM-DD'),
        5000
    );
END;
/

SELECT *
FROM Customers
WHERE CustomerID = 11;

BEGIN
    AddNewCustomer(
        1,
        'ABC',
        TO_DATE('2000-01-01','YYYY-MM-DD'),
        5000
    );
END;
/