# Database migrations

A **migration** is a SQL file in `supabase/migrations/` that changes the database (create a table, add a column, add a security rule). Every database change goes through a migration in git, so local, dev and prod stay identical and can be rebuilt from scratch.

## Rules

1. **Never change the hosted database by clicking in the Supabase dashboard.** Tables, columns, policies and functions are changed only by migrations.
2. **One migration per logical change**, with a clear name: `create_spaces`, `add_rls_transactions`.
3. **Never edit a migration that's already been pushed.** Write a new one that makes the change instead.
4. **Test locally with `npx supabase db reset` before pushing.**
5. **Prod gets migrations only through CI with approval** (CL-70). Never run `db push` against prod by hand.

## Workflow

```bash
npx supabase migration new <name>   # creates supabase/migrations/<timestamp>_<name>.sql
# write the SQL in that file
npx supabase db reset               # rebuild the local DB from all migrations + seed
npx supabase db push                # apply new migrations to the linked dev project
```

- `db reset` **deletes all local data**. That's intended; seed data refills it.
- Migrations run in filename (timestamp) order.
- `db push` lists the migrations it will run and asks for confirmation.

## Changed something in the dashboard by mistake?

Turn the difference into a migration file, check it, and commit it:

```bash
npx supabase db diff -f fix_name            # change made in local Studio
npx supabase db diff --linked -f fix_name   # change made on the hosted dev project
```

Without `--linked`, `db diff` compares the **local** database with the migrations, so it won't see a change made on the hosted project.
