# OpsCare CMMS-style original application blueprint

The public `/demo/` page uses fictional records and browser-local storage.

## Primary entities
`Organization`, `Site`, `Asset`, `AssetHierarchy`, `WorkRequest`, `WorkOrder`, `WorkOrderEvent`, `PreventivePlan`, `ConditionReading`, `ServiceVendor`, `StaffCredential`, `Part`, `InventoryTransaction`, `PurchaseRequest`, `FacilityInspection`, `Vehicle`, `DriverQualificationReference`, `Shipment`, `ShipmentLeg`, `ShipmentEvent`, `DocumentReference`, `Exception`, `AuditEvent`.

## Example workflow
Intake (requester / site) → qualified triage (supervisor) → safety and permit check → approve (owner) → assign (qualified worker/vendor) → perform with evidence → independent QA acceptance → close → review KPIs.

## Role model
Tenant administrator, maintenance manager, authorized technician, safety reviewer, supplier portal user, customer shipment viewer. All authorization must be enforced on the backend, not merely hidden in UI.

## Design constraints
Tenant isolation, OIDC/SSO, versioned audit trails, object storage with signed URLs, data retention, encryption, RTO/RPO, backups, event source authentication, vendor legal qualifications, safe offline reconciliation, PII and sensitive infrastructure information protection.

## Delivery roadmap
- P0: current fictional UI demo, no backend; user testing only.
- P1: authenticated asset and work-order CRUD, tenant isolation and audit records; Postgres; vulnerability testing.
- P2: PM scheduler, checklists, mobile field view, inspection signoff and vendor access.
- P3: parts inventory, service procurement, cross-site reports and analytics.
- P4: TradeFlow shipment events, validated partner feeds and corridor intelligence.
- P5: licensed/partner-authorized operational integrations and regulated services where applicable.

## KPI definitions require validation
PM completion rate, reactive work ratio, mean time to repair, backlog age, asset downtime, parts stockouts and incident follow-up time. No fictional performance promises.
