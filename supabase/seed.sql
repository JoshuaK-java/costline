-- Local/dev seed data. Runs on `supabase db reset`. NEVER contains real personal data.
-- Sections are added as tables are created:
--   1. plans, features, plan_features   (Sprint 02/03, ENT-4)
--   2. templates + template_categories  (Sprint 03, starter template)
--   3. test users / test space          (Sprint 02, AUTH-3)
--   4. sample project + ~50 receipts    (Sprint 03+)

-- Test users: inserted here into auth.users + auth.identities (AUTH-3, Sprint 02),
-- with fixed UUIDs and made-up emails (owner@example.test, editor@example.test,
-- viewer@example.test) so they survive every db reset and RLS tests can use them.
-- Not by signing up in the app: CostLine only has Google/Apple sign-in.
select 1;