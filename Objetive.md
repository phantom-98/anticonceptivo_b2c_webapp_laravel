TABLES

ContactMessage
-   Context: Customer
-   Store: DynamicField
-   Relation: Customer & ContactIssue
-   Incong

ContactIssue
-   Context: Tipo & Section
-   Can: Target only one context (2 context, public & customer)

Contacts
-   Context: Public
-   Store: ContactIssue (hard)
-   Without: Selectable ContactIssue

Campaign ? 

------------------ TARGET ------------------

Contacts
-   Context: Public & Customer
-   Store: Nested Fields with DynamicFields
-   Relation: ¿Customer nullable? & ContactIssue By Context
-   Selectables: By Context

------------------ TARGET ------------------

Incong:

-   Table: NestedFields: section: campania = customer/contacto

Explain: 

-   section: campania: target customer?
-   section: contact: target public

Solution:

-   NestedFields: section: customer_service/contact


------------------ WORKING ------------------
-   ContactController.php
-   Context: API - Public
-   Now Get: ContactIssue
-   Now Post: contact_issue_id
-   Missing: React connection
------------------ WORKING ------------------


CUSTOMER SERVICE
NESTED_FIELDS => CONTACT_ISSUE $ VAR IF SECTION => SERVICIO AL CLIENTE => CAMPAÑA

PUBLIC
NESTED_FIELDS => CONTACT_ISSUE NULL => X SECTION & X TYPE => CAN'T SHOW BY FILTERS