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

------------------ TARGET ------------------

Contacts
-   Context: Public & Customer
-   Store: Nested Fields with DynamicFields
-   Relation: ¿Customer nullable? & ContactIssue By Context
-   Selectables: By Context

------------------ TARGET ------------------