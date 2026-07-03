-- EXERCISE 1
declare
    v_age number;
begin
    for c in (select CustomerID, DOB
                from Customers)
    loop
        v_age := floor(
                        months_between(
                            SYSDATE,
                            c.DOB
                        )/12
        );
        if v_age > 60 then
            update Loans
            set InterestRate  = InterestRate  - 1
            where CustomerID = c.CustomerID;
        end if;
    end loop;

    commit;
end;
/

SELECT *
FROM Loans;

-- EXERCISE 2

ALTER TABLE Customers
ADD IsVIP VARCHAR2(5);

declare
begin
    for c in (select CustomerID, Balance
                From Customers)
    Loop
        if c.Balance > 10000 then
            update Customers
            set IsVIP = 'True'
            where CustomerID = c.CustomerID;
        else
            update Customers
            set IsVIP = 'False'
            where CustomerID = c.CustomerID;
        end if;
    end loop;

    commit;
end;
/

SELECT CustomerID,
       Name,
       Balance,
       IsVIP
FROM Customers;

-- EXERCISE 3
UPDATE Loans
SET EndDate = SYSDATE + 10
WHERE LoanID = 1;

UPDATE Loans
SET EndDate = SYSDATE + 20
WHERE LoanID = 2;

UPDATE Loans
SET EndDate = SYSDATE + 40
WHERE LoanID = 3;

COMMIT;

set serveroutput on;
begin
    for c in (
        select c.Name,
                l.loanID,
                l.EndDate
        from Customers c
        join loans l
        on c.CustomerID = l.CustomerID
        where l.EndDate <= SYSDATE+30
    )
    loop
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Dear '
            || c.Name
            || ', your Loan ID '
            || c.LoanID
            || ' is due on '
            || TO_CHAR(c.EndDate,'DD-MON-YYYY')
        );
    end loop;
end;
/